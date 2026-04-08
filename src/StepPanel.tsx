import { AnimatePresence, motion } from 'motion/react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import { StepData } from './stepsData';

interface StepPanelProps {
  step: number;
  data: StepData;
}

export default function StepPanel({ step, data }: StepPanelProps) {
  return (
    <div className="w-full h-full bg-slate-50 p-8 flex flex-col overflow-y-auto border-l border-slate-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
              {data.icon}
            </div>
            <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
              {data.title}
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
              核心思路
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {data.desc}
            </p>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              推导过程
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="font-serif text-slate-800 leading-loose text-[15px]">
                <Markdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                >
                  {data.detail.replace(/\n/g, '\n\n')}
                </Markdown>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
