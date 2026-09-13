import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import { Product, QrScanResult } from '../types';
import { PRODUCTS, SAMPLE_QR_LABELS, SampleQrLabel } from '../data/agriData';
import { verifyProductQr, playScanSuccessSound, generateQrDataUrl } from '../utils/qrVerifier';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, packSize?: string) => void;
  onOpenCallExpert?: () => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  onOpenCallExpert
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'samples'>('camera');
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanResult, setScanResult] = useState<QrScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [sampleQrImages, setSampleQrImages] = useState<{ [key: string]: string }>({});
  const [actionSuccessText, setActionSuccessText] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Pre-generate QR code images for the sample labels
  useEffect(() => {
    let isMounted = true;
    async function loadSampleQrs() {
      const urls: { [key: string]: string } = {};
      for (const sample of SAMPLE_QR_LABELS) {
        try {
          const url = await generateQrDataUrl(sample.qrCodeString);
          if (url) urls[sample.productId] = url;
        } catch {
          // ignore
        }
      }
      if (isMounted) setSampleQrImages(urls);
    }
    loadSampleQrs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle modal open / close camera lifecycle
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setScanResult(null);
      setIsScanning(true);
      setCameraError(null);
      setActionSuccessText(null);
      return;
    }

    if (isScanning && activeTab === 'camera') {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, cameraFacing, activeTab, isScanning]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API is not supported in this browser. Please use photo upload or sample labels.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setIsCameraActive(true);

        // Check if torch/flashlight is supported
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          const capabilities = (videoTrack.getCapabilities && videoTrack.getCapabilities()) as any;
          if (capabilities && 'torch' in capabilities) {
            setTorchSupported(true);
          }
        }

        // Start scanning loop
        startDecodingLoop();
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in browser settings or upload a label photo.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera found on this device. You can upload an image or test with sample labels.');
      } else {
        setCameraError('Could not start camera feed. Please tap a sample label below or upload a photo.');
      }
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
    setTorchEnabled(false);
  };

  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) return;

    try {
      const nextTorch = !torchEnabled;
      await (track.applyConstraints as any)({
        advanced: [{ torch: nextTorch }]
      });
      setTorchEnabled(nextTorch);
    } catch (err) {
      console.warn('Failed to toggle torch:', err);
    }
  };

  const toggleCameraFacing = () => {
    setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Continuous frame processing loop
  const startDecodingLoop = () => {
    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !isScanning) {
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const width = video.videoWidth;
        const height = video.videoHeight;

        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });

          if (ctx) {
            ctx.drawImage(video, 0, 0, width, height);

            // 1. Try native BarcodeDetector if available (fastest on mobile Chrome/Edge)
            let detectedString: string | null = null;
            if ('BarcodeDetector' in window) {
              try {
                const barcodeDetector = new (window as any).BarcodeDetector({
                  formats: ['qr_code', 'code_128', 'ean_13', 'data_matrix']
                });
                const barcodes = await barcodeDetector.detect(canvas);
                if (barcodes && barcodes.length > 0) {
                  detectedString = barcodes[0].rawValue;
                }
              } catch {
                // Fallback to jsQR below
              }
            }

            // 2. Fallback to jsQR
            if (!detectedString) {
              const imageData = ctx.getImageData(0, 0, width, height);
              const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'attemptBoth'
              });
              if (qrCode && qrCode.data) {
                detectedString = qrCode.data;
              }
            }

            if (detectedString) {
              handleSuccessfulScan(detectedString);
              return;
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    animationFrameRef.current = requestAnimationFrame(processFrame);
  };

  const handleSuccessfulScan = (qrData: string) => {
    stopCamera();
    setIsScanning(false);
    playScanSuccessSound();
    const result = verifyProductQr(qrData, PRODUCTS);
    setScanResult(result);
  };

  // Handle manual photo upload from gallery or file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'attemptBoth'
          });
          if (code && code.data) {
            handleSuccessfulScan(code.data);
          } else {
            // Check if user uploaded something that contains a product name in filename
            const filename = file.name.toLowerCase();
            const fallbackProd = PRODUCTS.find((p) => filename.includes(p.id) || filename.includes(p.brand.toLowerCase()));
            if (fallbackProd) {
              handleSuccessfulScan(fallbackProd.qrPayload || fallbackProd.id);
            } else {
              setCameraError('No clear QR code detected in this photo. Please try a closer, well-lit picture of the label.');
            }
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle instant test with one of the sample labels
  const handleSelectSample = (sample: SampleQrLabel) => {
    handleSuccessfulScan(sample.qrCodeString);
  };

  const handleResetScan = () => {
    setScanResult(null);
    setIsScanning(true);
    setActionSuccessText(null);
    setActiveTab('camera');
  };

  const handleViewProduct = () => {
    if (scanResult?.product) {
      onSelectProduct(scanResult.product);
      onClose();
    }
  };

  const handleAddToCartClick = () => {
    if (scanResult?.product) {
      const pack = scanResult.product.packSizes?.[0]?.size || scanResult.product.packs?.[0]?.size || 'Standard';
      onAddToCart(scanResult.product, pack);
      setActionSuccessText(`Added ${scanResult.product.name} to farm cart!`);
      setTimeout(() => setActionSuccessText(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-lg shadow-2xl border border-surface-container-high overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in-95 max-h-[92vh]">
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-on-surface leading-tight">
                Agri-Input QR Scanner &amp; Authentication
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Instant hologram authentication, batch check &amp; product loading
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            title="Close scanner"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Mode Switch Tabs (Camera Scan vs Scannable Samples) */}
        {!scanResult && (
          <div className="px-4 pt-3 flex items-center justify-between border-b border-surface-container-high/50 pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('camera');
                  setIsScanning(true);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'camera'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">videocam</span>
                <span>Live Scanner</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('samples');
                  stopCamera();
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'samples'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">qr_code</span>
                <span>Sample Labels ({SAMPLE_QR_LABELS.length})</span>
              </button>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Upload Label</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* Modal Body: Active Scanner vs Verification Result */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* ===================== VIEW 1: LIVE SCANNING VIEW ===================== */}
          {!scanResult && activeTab === 'camera' && (
            <div className="space-y-4">
              {/* Camera Frame Container */}
              <div className="relative w-full aspect-square max-h-[340px] bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-2 border-surface-container-high">
                {/* Hidden canvas used for processing */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Live Video Feed */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />

                {/* Laser Scanning Reticle Overlay */}
                {isCameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
                    {/* Targeting Frame Box */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 border-2 border-primary/50 rounded-2xl">
                      {/* 4 High-contrast green corner brackets */}
                      <span className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></span>
                      <span className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></span>
                      <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></span>
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></span>

                      {/* Moving laser scan line */}
                      <div className="absolute left-1 right-1 h-0.5 bg-primary shadow-[0_0_12px_#34d399] animate-[bounce_2s_infinite]" />
                    </div>

                    <div className="mt-4 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] text-white/90 font-medium">
                      Align product QR or bottle hologram in frame
                    </div>
                  </div>
                )}

                {/* Camera Inactive / Loading Placeholder */}
                {!isCameraActive && !cameraError && (
                  <div className="flex flex-col items-center justify-center text-white/80 p-6 text-center">
                    <span className="material-symbols-outlined text-[42px] text-primary animate-spin mb-2">
                      progress_activity
                    </span>
                    <p className="text-sm font-bold">Connecting to camera sensor...</p>
                    <p className="text-xs text-white/60 mt-1">
                      Checking back-facing lens for high-resolution macro focus
                    </p>
                  </div>
                )}

                {/* Camera Error / Permission Fallback */}
                {cameraError && (
                  <div className="flex flex-col items-center justify-center text-white/90 p-6 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-error/20 text-error flex items-center justify-center">
                      <span className="material-symbols-outlined text-[28px]">videocam_off</span>
                    </div>
                    <p className="text-sm font-bold text-error">Camera Unavailable</p>
                    <p className="text-xs text-white/70 max-w-xs">{cameraError}</p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container"
                      >
                        Upload Label Photo
                      </button>
                      <button
                        onClick={() => setActiveTab('samples')}
                        className="px-3.5 py-1.5 rounded-lg bg-white/20 text-white font-bold text-xs hover:bg-white/30"
                      >
                        Try Sample QR
                      </button>
                    </div>
                  </div>
                )}

                {/* Floating Camera Controls Top Bar */}
                {isCameraActive && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    {torchSupported && (
                      <button
                        onClick={toggleTorch}
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                          torchEnabled
                            ? 'bg-tertiary text-on-tertiary'
                            : 'bg-black/50 text-white hover:bg-black/70'
                        }`}
                        title="Toggle Flashlight"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {torchEnabled ? 'flashlight_on' : 'flashlight_off'}
                        </span>
                      </button>
                    )}
                    <button
                      onClick={toggleCameraFacing}
                      className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                      title="Switch Camera (Front / Back)"
                    >
                      <span className="material-symbols-outlined text-[18px]">flip_camera_ios</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Field-Test Chips: 1-Tap Instant Simulator */}
              <div className="bg-surface-container-low p-3 rounded-2xl border border-surface-container-high/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Quick Test: Verified OEM Labels
                  </span>
                  <span className="text-[10px] text-primary font-semibold">Instant 1-Tap Scan</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_QR_LABELS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSample(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-all text-left group ${
                        item.isAuthentic
                          ? 'bg-surface-container-lowest border-surface-container-high hover:border-primary text-on-surface hover:text-primary'
                          : 'bg-error-container/20 border-error/40 text-error hover:bg-error-container/30'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {item.isAuthentic ? 'verified' : 'warning'}
                      </span>
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-surface-container text-on-surface-variant font-mono">
                        {item.batchCode}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 2: SCANNABLE SAMPLE LABELS GRID ===================== */}
          {!scanResult && activeTab === 'samples' && (
            <div className="space-y-3">
              <div className="bg-surface-container-low p-3 rounded-xl text-xs text-on-surface-variant">
                <p className="font-bold text-on-surface mb-0.5">High-Resolution Scannable Product Labels</p>
                <p>
                  You can point a second phone or camera at these certified codes, or tap{' '}
                  <strong className="text-primary">"Simulate Scan"</strong> to immediately verify.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_QR_LABELS.map((item, idx) => {
                  const qrUrl = sampleQrImages[item.productId];
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                        item.isAuthentic
                          ? 'bg-surface-container-lowest border-surface-container-high/80 hover:border-primary'
                          : 'bg-error-container/10 border-error/30'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Real QR Code Graphic */}
                        <div className="w-16 h-16 rounded-xl bg-white p-1 border border-surface-container shrink-0 flex items-center justify-center shadow-xs">
                          {qrUrl ? (
                            <img src={qrUrl} alt={item.title} className="w-full h-full object-contain" />
                          ) : (
                            <span className="material-symbols-outlined text-primary text-[32px]">qr_code</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider inline-block ${
                              item.isAuthentic
                                ? 'bg-primary/10 text-primary'
                                : 'bg-error/15 text-error'
                            }`}
                          >
                            {item.badge}
                          </span>
                          <h4 className="font-bold text-xs text-on-surface mt-1 truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
                            {item.description}
                          </p>
                          <span className="text-[10px] text-outline font-mono block mt-1">
                            Batch: {item.batchCode}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectSample(item)}
                        className={`mt-2.5 w-full py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                          item.isAuthentic
                            ? 'bg-primary/10 text-primary hover:bg-primary hover:text-on-primary'
                            : 'bg-error/10 text-error hover:bg-error hover:text-on-error'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {item.isAuthentic ? 'verified' : 'security'}
                        </span>
                        <span>{item.isAuthentic ? 'Verify & Load Product' : 'Test Fake Alert'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================== VIEW 3: SCAN & AUTHENTICATION RESULT ===================== */}
          {scanResult && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              {/* Authenticity Certificate Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 shadow-xs ${
                  scanResult.isAuthentic
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'bg-error-container/30 border-error/40 text-error'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    scanResult.isAuthentic
                      ? 'bg-primary text-on-primary'
                      : 'bg-error text-on-error'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {scanResult.isAuthentic ? 'verified' : 'warning'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        scanResult.isAuthentic
                          ? 'bg-primary text-on-primary'
                          : 'bg-error text-on-error'
                      }`}
                    >
                      {scanResult.isAuthentic ? '100% Genuine Certified' : 'Spurious / Unregistered'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      {scanResult.scanTimestamp}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-on-surface mt-1 leading-tight">
                    {scanResult.isAuthentic
                      ? 'OEM Authenticity & CIB Registration Confirmed'
                      : 'Security Warning: Counterfeit or Blacklisted Batch'}
                  </h4>

                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {scanResult.securityMessage}
                  </p>
                </div>
              </div>

              {/* Matched Product Preview Card (if product was found) */}
              {scanResult.product && (
                <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container-high/80 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 rounded-xl bg-surface-container-lowest p-1.5 border border-surface-container-high shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={scanResult.product.images[0]}
                        alt={scanResult.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          {scanResult.product.brand}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          {scanResult.product.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-on-surface mt-1 leading-tight line-clamp-1">
                        {scanResult.product.name}
                      </h3>

                      <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                        {scanResult.product.technicalComposition}
                      </p>

                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-base font-bold text-primary">
                          ₹{scanResult.product.price}
                        </span>
                        <span className="text-xs text-outline line-through">
                          ₹{scanResult.product.mrp}
                        </span>
                        <span className="text-[10px] font-bold text-secondary bg-secondary-fixed/40 px-1.5 py-0.2 rounded-full">
                          {scanResult.product.discountPercent}% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Product Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-surface-container-high/60">
                    <button
                      onClick={handleViewProduct}
                      className="py-2 px-3 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container font-bold text-xs border border-surface-container-high flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      <span>Product Details</span>
                    </button>

                    <button
                      onClick={handleAddToCartClick}
                      className="py-2 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>

                  {actionSuccessText && (
                    <div className="p-2 rounded-lg bg-secondary/15 text-secondary text-xs font-bold flex items-center gap-1.5 text-center justify-center animate-in fade-in">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>{actionSuccessText}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Batch & Regulatory Dossier Grid */}
              <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container-high/80 space-y-2.5">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
                  <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                    Official Regulatory &amp; Batch Ledger
                  </span>
                  <span className="text-[11px] text-primary font-bold">
                    {scanResult.isAuthentic ? 'Verified Active' : 'Failed Integrity'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60">
                    <span className="text-[10px] text-outline uppercase font-bold block">Batch Code:</span>
                    <span className="font-mono font-bold text-on-surface">{scanResult.batchCode}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60">
                    <span className="text-[10px] text-outline uppercase font-bold block">Hologram UID:</span>
                    <span className="font-mono font-bold text-on-surface truncate block">
                      {scanResult.hologramId}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60">
                    <span className="text-[10px] text-outline uppercase font-bold block">Mfg Date:</span>
                    <span className="font-semibold text-on-surface">{scanResult.mfgDate}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60">
                    <span className="text-[10px] text-outline uppercase font-bold block">Expiry Date:</span>
                    <span className="font-semibold text-on-surface">{scanResult.expDate}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 col-span-2">
                    <span className="text-[10px] text-outline uppercase font-bold block">Govt Approval / CIR No:</span>
                    <span className="font-semibold text-on-surface">{scanResult.cibCirNumber || 'Approved under Insecticides Act 1968'}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 col-span-2">
                    <span className="text-[10px] text-outline uppercase font-bold block">Manufacturing Plant:</span>
                    <span className="text-on-surface font-medium">{scanResult.mfgPlant}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Scan Next or Contact Expert */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleResetScan}
                  className="flex-1 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  <span>Scan Next Label</span>
                </button>

                {onOpenCallExpert && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCallExpert();
                    }}
                    className="py-2.5 px-3.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-bold text-xs hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    <span>Consult Expert</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex justify-between items-center text-[11px] text-on-surface-variant shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">security</span>
            <span>TerraAgri 100% Anti-Spurious Farmer Guarantee</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-surface-container-highest text-on-surface font-semibold text-xs hover:bg-surface-container transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
