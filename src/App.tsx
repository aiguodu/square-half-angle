import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import GeometrySVG from './GeometrySVG';
import StepPanel from './StepPanel';
import SubtitleOverlay from './SubtitleOverlay';
import { stepsData } from './stepsData';
import { ttsService } from './ttsService';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  // 当步骤变化时，自动播放对应的 TTS
  useEffect(() => {
    ttsService.play(stepsData[currentStep].tts);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleReplayTTS = () => {
    ttsService.play(stepsData[currentStep].tts);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
              几何动点
            </span>
            <h1 className="text-lg font-semibold text-slate-800">
              正方形中的半角模型综合探究
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-400">
            步骤 {currentStep + 1} / {stepsData.length}
          </div>
        </header>

        {/* Main Content Area - Fixed Height */}
        <div className="flex flex-col md:flex-row h-[570px] relative">
          
          {/* Left: Visual/Geometry Area */}
          <div className="w-full md:w-[55%] h-full bg-white relative">
            <GeometrySVG step={currentStep} />
            <SubtitleOverlay />
          </div>

          {/* Right: Logic/Explanation Area */}
          <div className="w-full md:w-[45%] h-full">
            <StepPanel step={currentStep} data={stepsData[currentStep]} />
          </div>

        </div>

        {/* Footer / Controls */}
        <footer className="h-20 border-t border-slate-200 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              重新开始
            </button>
            <button
              onClick={handleReplayTTS}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              重播讲解
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === stepsData.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-600/20"
            >
              下一步
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
