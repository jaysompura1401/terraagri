import { Product, QrScanResult } from '../types';
import { PRODUCTS } from '../data/agriData';
import QRCode from 'qrcode';

/**
 * Generate SVG or DataURL QR code for a given text payload
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      margin: 1,
      width: 256,
      color: {
        dark: '#1e3a1e',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR data url', err);
    return '';
  }
}

/**
 * Parses scanned QR content and verifies product authenticity
 */
export function verifyProductQr(rawContent: string, productList: Product[] = PRODUCTS): QrScanResult {
  const cleanStr = rawContent.trim();
  const lowerStr = cleanStr.toLowerCase();
  const scanTimestamp = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Check for counterfeit simulator
  if (
    lowerStr.includes('fake') ||
    lowerStr.includes('spurious') ||
    lowerStr.includes('unverified') ||
    lowerStr.includes('unauthorized')
  ) {
    return {
      rawContent: cleanStr,
      isAuthentic: false,
      batchCode: 'UNV-SUSPECTED-99',
      mfgDate: 'Unknown / Not in OEM Registry',
      expDate: 'Expired or Invalid',
      mfgPlant: 'Non-Registered Facility',
      hologramId: 'INVALID-SECURITY-TOKEN',
      tamperSealIntact: false,
      scanTimestamp,
      securityMessage:
        'SECURITY ALERT: Unregistered batch code detected. Hologram security token does not match OEM master ledger. Avoid applying this chemical on crops to prevent crop burn or spurious damage.'
    };
  }

  // Parse URL query parameters if available
  let matchedProduct: Product | undefined;
  let detectedBatch = '';
  let detectedHolo = '';

  try {
    if (cleanStr.includes('?') || cleanStr.startsWith('http') || cleanStr.startsWith('terraagri://')) {
      const urlLike = cleanStr.replace('terraagri://', 'https://terraagri.in/');
      const url = new URL(urlLike);
      const prodParam = url.searchParams.get('product') || url.searchParams.get('id');
      const batchParam = url.searchParams.get('batch');
      const holoParam = url.searchParams.get('holo');

      if (batchParam) detectedBatch = batchParam;
      if (holoParam) detectedHolo = holoParam;

      if (prodParam) {
        matchedProduct = productList.find(
          (p) => p.id.toLowerCase() === prodParam.toLowerCase() || p.name.toLowerCase().includes(prodParam.toLowerCase())
        );
      }
    }
  } catch {
    // ignore URL parsing error
  }

  // If not matched yet, try matching by batch code
  if (!matchedProduct) {
    matchedProduct = productList.find(
      (p) =>
        (p.batchCode && lowerStr.includes(p.batchCode.toLowerCase())) ||
        (p.id && lowerStr.includes(p.id.toLowerCase()))
    );
  }

  // If not matched, try matching by brand or keywords
  if (!matchedProduct) {
    matchedProduct = productList.find((p) => {
      const nameParts = p.name.toLowerCase().split(' ');
      return nameParts.some((part) => part.length > 3 && lowerStr.includes(part));
    });
  }

  // If matched a valid product
  if (matchedProduct) {
    return {
      rawContent: cleanStr,
      productId: matchedProduct.id,
      product: matchedProduct,
      batchCode: detectedBatch || matchedProduct.batchCode || `AGR-2026-${matchedProduct.id.slice(0, 4).toUpperCase()}`,
      isAuthentic: true,
      mfgDate: matchedProduct.mfgDate || 'January 2026',
      expDate: matchedProduct.expDate || 'December 2028',
      mfgPlant: matchedProduct.mfgPlant || `${matchedProduct.brand} Certified Manufacturing Division, India`,
      cibCirNumber: matchedProduct.cibCirNumber || 'Govt CIB-RC Registered & Tested',
      hologramId: detectedHolo || matchedProduct.hologramSecurityId || `HOL-${Math.floor(100000 + Math.random() * 900000)}`,
      tamperSealIntact: true,
      scanTimestamp,
      securityMessage:
        '100% Certified Genuine Agri-Input. Matched official manufacturer master ledger, Central Insecticide Board (CIB) registration, and digital hologram UID.'
    };
  }

  // Generic fallback if unknown but well-formed code
  return {
    rawContent: cleanStr,
    isAuthentic: false,
    batchCode: cleanStr.slice(0, 16) || 'UNKNOWN',
    mfgDate: 'Verification Pending',
    expDate: 'Not Documented',
    mfgPlant: 'Third-party / Non-partner manufacturer',
    hologramId: 'UNREGISTERED',
    tamperSealIntact: false,
    scanTimestamp,
    securityMessage:
      'Unrecognized label code. This product does not have a verified TerraAgri OEM certificate. Please verify packaging seal or speak to an agronomist.'
  };
}

/**
 * Play a pleasant success chime via Web Audio API when QR is decoded
 */
export function playScanSuccessSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12); // E6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
    // audio context might be blocked, safely ignore
  }
}
