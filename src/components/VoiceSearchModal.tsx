import React, { useState, useEffect, useRef } from 'react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (query: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onResult
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLang, setSelectedLang] = useState<'en-IN' | 'hi-IN' | 'mr-IN'>('en-IN');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Common field search voice samples for Indian farmers
  const SUGGESTED_VOICE_QUERIES = [
    { label: 'Amistar Top', category: 'Fungicide' },
    { label: 'Tomato Early Blight', category: 'Disease' },
    { label: 'Cotton Bollworm', category: 'Pest' },
    { label: 'Dhanzyme Gold', category: 'Growth Stimulant' },
    { label: 'Soluble NPK Fertilizer', category: 'Nutrition' },
    { label: 'Coragen FMC', category: 'Insecticide' },
    { label: 'Onion Thrips Spray', category: 'Disease' },
    { label: 'Organic Bio-Pesticide', category: 'Bio-Input' }
  ];

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setTranscript('');
      setErrorMessage(null);
      return;
    }

    startListening();

    return () => {
      stopListening();
    };
  }, [isOpen, selectedLang]);

  const startListening = () => {
    setErrorMessage(null);
    setTranscript('');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition is not supported in this browser. You can tap a common crop voice query below.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLang;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions or tap a query below.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No voice detected. Please speak closer to your device microphone.');
        } else {
          setErrorMessage(`Voice capture: ${event.error}. You can retry or tap a sample below.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err: any) {
      console.error('Error initiating speech recognition:', err);
      setErrorMessage('Could not initialize microphone. Please check permissions.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleApplyQuery = (query: string) => {
    stopListening();
    onResult(query);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-md flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">mic</span>
            <div>
              <h3 className="font-bold text-base text-on-surface">Kisan Voice Search</h3>
              <p className="text-xs text-on-surface-variant">
                Search products &amp; crop diseases in your language
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Language selector tabs */}
        <div className="px-4 pt-3 flex items-center justify-center gap-2">
          {[
            { id: 'en-IN', label: 'English (IN)' },
            { id: 'hi-IN', label: 'हिंदी' },
            { id: 'mr-IN', label: 'मराठी' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedLang === lang.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Main Microphone Interaction Zone */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="relative flex items-center justify-center">
            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <div className="absolute w-28 h-28 rounded-full bg-primary/20 animate-ping" />
                <div className="absolute w-24 h-24 rounded-full bg-primary/30 animate-pulse" />
              </>
            )}

            <button
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-lg ${
                isListening
                  ? 'bg-primary text-on-primary ring-4 ring-primary/40 scale-105'
                  : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[36px]">
                {isListening ? 'mic' : 'mic_none'}
              </span>
            </button>
          </div>

          <div>
            <p className="text-sm font-bold text-on-surface">
              {isListening ? 'Listening... Speak now' : 'Tap microphone to speak'}
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Say product name, brand, or crop symptom (e.g. "Amistar Top", "Tomato Blight")
            </p>
          </div>

          {/* Audio Wave Simulation Animation */}
          {isListening && (
            <div className="flex items-center gap-1 h-8 px-4 py-1">
              {[40, 75, 100, 60, 90, 45, 80, 50, 70, 95, 30].map((height, i) => (
                <span
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          )}

          {/* Transcript Box */}
          {transcript && (
            <div className="w-full bg-surface-container-low p-3.5 rounded-2xl border border-primary/30 shadow-xs">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                Detected Speech:
              </span>
              <p className="text-base font-bold text-on-surface">"{transcript}"</p>
              <button
                onClick={() => handleApplyQuery(transcript)}
                className="mt-3 w-full py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Search for "{transcript}"</span>
              </button>
            </div>
          )}

          {/* Error / Permission Guidance */}
          {errorMessage && (
            <div className="w-full p-2.5 rounded-xl bg-error-container/20 border border-error/30 text-error text-xs flex items-start gap-2 text-left">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">info</span>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Quick Voice Suggestions for Farmers */}
        <div className="px-4 pb-4 pt-1 bg-surface-container-low/50 border-t border-surface-container-high/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              Popular Field Inquiries
            </span>
            <span className="text-[10px] text-primary font-semibold">1-Tap Voice Search</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
            {SUGGESTED_VOICE_QUERIES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyQuery(item.label)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high/80 text-xs text-on-surface hover:border-primary hover:text-primary transition-all text-left group"
              >
                <span className="material-symbols-outlined text-[14px] text-primary group-hover:scale-110 transition-transform">
                  volume_up
                </span>
                <span className="font-semibold">{item.label}</span>
                <span className="text-[9px] text-on-surface-variant bg-surface-container px-1 py-0.2 rounded">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex justify-between items-center">
          <span className="text-[11px] text-on-surface-variant">
            AI-powered phonetic agro-matching
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-container-highest text-on-surface font-semibold text-xs hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
