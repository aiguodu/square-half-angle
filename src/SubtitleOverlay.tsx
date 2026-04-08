import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ttsService, TTSState } from './ttsService';

export default function SubtitleOverlay() {
  const [ttsState, setTtsState] = useState<TTSState>({ isPlaying: false, isLoading: false, currentText: '' });

  useEffect(() => {
    const unsubscribe = ttsService.subscribe(setTtsState);
    return unsubscribe;
  }, []);

  return (
    <AnimatePresence>
      {(ttsState.isPlaying || ttsState.isLoading || ttsState.currentText) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[500px] z-50"
        >
          <div className="bg-slate-900/75 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {ttsState.isLoading ? (
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                ) : ttsState.isPlaying ? (
                  <div className="flex gap-1 items-end h-4">
                    <motion.div animate={{ height: ["4px", "16px", "4px"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-blue-400 rounded-full" />
                    <motion.div animate={{ height: ["8px", "12px", "8px"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-blue-400 rounded-full" />
                    <motion.div animate={{ height: ["4px", "16px", "4px"] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-1 bg-blue-400 rounded-full" />
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                )}
              </div>
              <div className="flex-1 max-h-[100px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-white/95 text-[15px] leading-relaxed font-medium tracking-wide">
                  {ttsState.currentText}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
