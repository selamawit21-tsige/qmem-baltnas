import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Flame,
  ChefHat,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface KitchenTimerPreset {
  id: string;
  name: { en: string; am: string };
  category: { en: string; am: string };
  durationMinutes: number;
  tip: { en: string; am: string };
}

const ETHIOPIAN_PRESETS: KitchenTimerPreset[] = [
  {
    id: 'doro_onions',
    name: { en: 'Caramelizing Doro Wat Onions', am: 'የዶሮ ወጥ ሽንኩርት ማቁላት' },
    category: { en: 'Doro Wat · Stage 1', am: 'የዶሮ ወጥ · ደረጃ 1' },
    durationMinutes: 45,
    tip: {
      en: 'Cook dry minced red onions over low-medium heat without oil for the first 30 mins to eliminate raw water before adding kibbeh.',
      am: 'ጥሬ ውሃው እንዲተን ቅቤ ሳያደርጉ በመጀመሪያዎቹ 30 ደቂቃዎች በዝግታ እያማሰሉ ያቁላሉት።',
    },
  },
  {
    id: 'doro_simmer',
    name: { en: 'Simmering Doro Wat with Berbere', am: 'ዶሮ ወጥ በበርበሬ ማንተክተክ' },
    category: { en: 'Doro Wat · Stage 2', am: 'የዶሮ ወጥ · ደረጃ 2' },
    durationMinutes: 40,
    tip: {
      en: 'Simmer on low heat until the red niter kibbeh oil rises gracefully to the surface and the chicken is melt-in-the-mouth tender.',
      am: 'ቀዩ ቅቤ ወደ ላይ እስኪንሳፈፍና የስጋው ጣዕም እስኪዋሀድ ድረስ በዝግታ እሳት ያብስሉት።',
    },
  },
  {
    id: 'roast_grains',
    name: { en: 'Roasting Whole Barley / Genfo Grains', am: 'የገብስና ገንፎ እህል መቁላት' },
    category: { en: 'Genfo & Atmit', am: 'ለገንፎና ለአትሚት' },
    durationMinutes: 15,
    tip: {
      en: 'Stir whole barley continuously in a clay or cast iron pan until you hear gentle popping sounds and smell nutty golden aromas.',
      am: 'ጥቁር እንዳይሆን ያለማቋረጥ እያገላበጡ ወርቃማ መዓዛ እስኪያመጣና እስኪፈነዳ ድረስ ይቁሉት።',
    },
  },
  {
    id: 'shiro_tegabino',
    name: { en: 'Clay Pot Shiro Tegabino Simmer', am: 'የተጋቢኖ ሽሮ ማንተክተክ' },
    category: { en: 'Fast Comfort', am: 'ፈጣን ምግብ' },
    durationMinutes: 12,
    tip: {
      en: 'Allow Shiro to bubble gently in the clay pot until the broth thickens into velvety silk. Top with fresh green pepper slices in the last 2 mins.',
      am: 'ሽሮው እስኪወፍር ድረስ በድስት እያንተከተኩ በመጨረሻዎቹ 2 ደቂቃዎች ቃሪያ ይጨምሩበት።',
    },
  },
  {
    id: 'niter_kibbeh',
    name: { en: 'Clarifying Spiced Niter Kibbeh', am: 'የተነጠረ ቅቤ ማፍላት' },
    category: { en: 'Aromatic Butter', am: 'ቅቤ ማንጠር' },
    durationMinutes: 25,
    tip: {
      en: 'Keep flame on low to avoid scorching the milk solids. Add whole korarima, kosseret, turmeric, and garlic as foam clears.',
      am: 'ቅቤው እንዳያር በዝግታ እሳት ኮረሪማ፣ ኮሰረት፣ እርድና ነጭ ሽንኩርት ጨምረው ያንጥሩት።',
    },
  },
  {
    id: 'kitfo_rest',
    name: { en: 'Resting & Infusing Kitfo with Mitmita', am: 'ክትፎን በሚጥሚጣ ማሸት' },
    category: { en: 'Kitfo Delicacy', am: 'የክትፎ ዝግጅት' },
    durationMinutes: 5,
    tip: {
      en: 'Let minced top round rest in lukewarm spiced kibbeh and artisan Mitmita so heat gently blooms through the beef fibers.',
      am: 'የክትፎው ስጋ ከሞቀው ቅቤና ሚጥሚጣ ጋር ጣዕሙ በደንብ እንዲዋሀድ ለ 5 ደቂቃ ያሳርፉት።',
    },
  },
];

interface KitchenHelperWidgetProps {
  language: Language;
}

export const KitchenHelperWidget: React.FC<KitchenHelperWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<KitchenTimerPreset>(ETHIOPIAN_PRESETS[0]);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(ETHIOPIAN_PRESETS[0].durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Audio synthesizer tone for completed timer chime
  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.15 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
      });
    } catch {
      // AudioContext fallback
    }
  };

  // Timer interval effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setHasFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, isMuted]);

  const selectPreset = (preset: KitchenTimerPreset) => {
    setActivePreset(preset);
    setSecondsRemaining(preset.durationMinutes * 60);
    setIsRunning(false);
    setHasFinished(false);
  };

  const handleReset = () => {
    setSecondsRemaining(activePreset.durationMinutes * 60);
    setIsRunning(false);
    setHasFinished(false);
  };

  const addMinutes = (mins: number) => {
    setSecondsRemaining((prev) => Math.max(0, prev + mins * 60));
  };

  // Time format helper
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressFraction = 1 - secondsRemaining / (activePreset.durationMinutes * 60);

  return (
    <>
      {/* Desktop/Tablet Floating Launcher Button at Bottom-Left */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-bold text-xs shadow-2xl transition-all duration-300 active:scale-95 border ${
            isRunning
              ? 'bg-[#942F12] border-[#F2871A] ring-2 ring-[#F2871A]/50 animate-pulse'
              : 'bg-[#30120B] border-[#542B1F] hover:bg-[#4E1E12]'
          }`}
          aria-label="Toggle Ethiopian Kitchen Helper Timer"
        >
          <div className="relative">
            <ChefHat className="w-4 h-4 text-[#F2871A]" />
            {isRunning && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#70E000] animate-ping" />
            )}
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-[#FFCDB2] uppercase tracking-wider font-extrabold leading-none">
              Kitchen Helper
            </span>
            <span className="font-mono text-xs font-bold leading-none mt-0.5 block">
              {isRunning ? formatTime(secondsRemaining) : language === 'am' ? 'የኩሽና ሰዓት' : 'Cooking Timers'}
            </span>
          </div>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#E0CEBF]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#E0CEBF]" />}
        </button>
      </div>

      {/* Mobile Floating Button (Hidden if idle to keep screen clean, visible if timer is actively running) */}
      {isRunning && (
        <div className="fixed bottom-5 left-4 z-40 sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#942F12] border border-[#F2871A] text-white font-bold text-xs shadow-xl active:scale-95 animate-pulse"
            aria-label="Toggle Ethiopian Kitchen Helper Timer (Mobile Active)"
          >
            <ChefHat className="w-3.5 h-3.5 text-[#F2871A]" />
            <span className="font-mono text-xs font-bold">{formatTime(secondsRemaining)}</span>
          </button>
        </div>
      )}

      {/* Expanded Kitchen Helper Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-5 z-40 w-96 max-w-[calc(100vw-2rem)] bg-[#FDFBF7] rounded-3xl border border-[#DACBB5] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#30120B] text-[#FFF4E8] p-4 flex items-center justify-between border-b border-[#4A1E13]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#942F12] text-[#F2871A] flex items-center justify-center">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-serif-luxury">
                  {language === 'am' ? 'የሀበሻ ኩሽና አጋዥ' : 'Habesha Kitchen Helper'}
                </h3>
                <span className="text-[10px] text-[#DEC7B8] block">
                  {language === 'am' ? 'ባህላዊ የምግብ ማብሰያ ሰዓቶች' : 'Dedicated Ethiopian Cooking Timers'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-[#DAC5B5] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title={isMuted ? 'Unmute chime' : 'Mute chime'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#DAC5B5] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Active Timer Display Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#EADBCA] shadow-2xs text-center space-y-3 relative overflow-hidden">
              {/* Progress Bar Top Fill */}
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#942F12] to-[#F2871A] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progressFraction * 100))}%` }}
              />

              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#942F12]">
                  {activePreset.category[language]}
                </span>
                <h4 className="font-bold text-sm text-[#30120B]">
                  {activePreset.name[language]}
                </h4>
              </div>

              {/* Big Clock Numerals */}
              <div className="py-1">
                <span className={`text-4xl sm:text-5xl font-mono font-black tabular-nums tracking-tight ${
                  hasFinished
                    ? 'text-[#2E6B34] animate-bounce'
                    : isRunning
                    ? 'text-[#942F12]'
                    : 'text-[#30120B]'
                }`}>
                  {formatTime(secondsRemaining)}
                </span>
                {hasFinished && (
                  <span className="block text-xs font-bold text-[#2E6B34] mt-1">
                    {language === 'am' ? 'ሰዓቱ ደርሷል! ድስቱን ያረጋግጡ።' : 'Time reached! Check your pot.'}
                  </span>
                )}
              </div>

              {/* Controls (Play/Pause, Reset, +Mins) */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                    isRunning
                      ? 'bg-[#522216] text-white hover:bg-[#3D170E]'
                      : 'bg-[#942F12] text-white hover:bg-[#7D240B] shadow-md'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>{language === 'am' ? 'አቁም' : 'Pause'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{language === 'am' ? 'ጀምር' : 'Start'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl border border-[#DACBB5] text-[#554238] hover:bg-[#FAF6EE] transition-colors"
                  title="Reset timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => addMinutes(5)}
                  className="px-2.5 py-2 rounded-xl border border-[#DACBB5] text-xs font-bold text-[#554238] hover:bg-[#FAF6EE] transition-colors"
                  title="Add 5 minutes"
                >
                  +5m
                </button>
              </div>

              {/* Matriarch Secret Tip for this step */}
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EADBCA] text-left text-xs text-[#5D4A3F] space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#942F12] uppercase">
                  <Sparkles className="w-3 h-3 text-[#F2871A]" />
                  <span>{language === 'am' ? 'የእናት ኩሽና ምክር' : 'Matriarch Kitchen Tip'}</span>
                </div>
                <p className="text-[11px] leading-relaxed italic">
                  &ldquo;{activePreset.tip[language]}&rdquo;
                </p>
              </div>
            </div>

            {/* Presets List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#554238] uppercase block">
                {language === 'am' ? 'የምግብ ማብሰያ ሰዓቶች ይምረጡ:' : 'Select Authentic Culinary Timer:'}
              </span>

              <div className="space-y-1.5">
                {ETHIOPIAN_PRESETS.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => selectPreset(preset)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? 'bg-[#FAF1E3] border-[#942F12] text-[#30120B] font-bold ring-1 ring-[#942F12]/30'
                          : 'bg-white border-[#E6D9C3] text-[#554238] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold block">{preset.name[language]}</span>
                        <span className="text-[10px] text-[#8C7667]">{preset.category[language]}</span>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#942F12] px-2 py-1 rounded bg-white/80 border border-[#EADBCA]">
                        {preset.durationMinutes}m
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
