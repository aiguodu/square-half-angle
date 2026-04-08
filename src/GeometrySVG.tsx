import { AnimatePresence, motion } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

export default function GeometrySVG({ step }: GeometrySVGProps) {
  // 基础坐标定义
  const A = { x: 100, y: 100 };
  const B = { x: 100, y: 400 };
  const C = { x: 400, y: 400 };
  const D = { x: 400, y: 100 };
  const E = { x: 250, y: 100 };
  const F = { x: 400, y: 300 };
  const G = { x: 200, y: 200 };
  const H = { x: 325, y: 325 };
  const P = { x: 100, y: 200 };
  const Q = { x: 400, y: 200 };
  const M = { x: 325, y: 200 };

  // 圆 BGCF 的圆心和半径
  const circleCenter = { x: 250, y: 350 };
  const circleRadius = 158.11;

  // 辅助函数：绘制点
  const Point = ({ p, label, offset = { x: 0, y: -15 } }: { p: { x: number, y: number }, label: string, offset?: { x: number, y: number } }) => (
    <g>
      <circle cx={p.x} cy={p.y} r="3" className="fill-slate-800" />
      <text x={p.x + offset.x} y={p.y + offset.y} className="text-lg font-serif italic fill-slate-800 select-none" textAnchor="middle" dominantBaseline="middle">
        {label}
      </text>
    </g>
  );

  return (
    <div className="w-full h-full flex items-start pt-8 justify-center">
      <svg viewBox="0 0 500 550" className="w-full max-w-[450px] h-auto drop-shadow-sm">
        {/* 基础正方形 ABCD */}
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} className="fill-transparent stroke-slate-800 stroke-2" />
        
        {/* 对角线 AC */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} className="stroke-slate-800 stroke-2" />

        {/* 基础连线 BE, BF */}
        <line x1={B.x} y1={B.y} x2={E.x} y2={E.y} className="stroke-slate-800 stroke-2" />
        <line x1={B.x} y1={B.y} x2={F.x} y2={F.y} className="stroke-slate-800 stroke-2" />

        {/* Step 0: 突出显示角 EBF */}
        <AnimatePresence>
          {step === 0 && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              d={`M 145 310 Q 170 350 185 370`}
              className="stroke-amber-500 stroke-2 fill-transparent"
            />
          )}
        </AnimatePresence>

        {/* Step 1 & 2: 四点共圆 */}
        <AnimatePresence>
          {step >= 1 && step <= 2 && (
            <motion.circle
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              cx={circleCenter.x}
              cy={circleCenter.y}
              r={circleRadius}
              className="stroke-blue-400 stroke-[1.5] fill-transparent stroke-dasharray-4"
              strokeDasharray="8 6"
            />
          )}
        </AnimatePresence>

        {/* Step 1: 突出显示角 GBF 和 GCF */}
        <AnimatePresence>
          {step === 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* 角 GBF */}
              <path d="M 145 310 Q 170 350 185 370" className="stroke-blue-500 stroke-2 fill-transparent" />
              {/* 角 GCF */}
              <path d="M 370 370 Q 350 380 370 400" className="stroke-blue-500 stroke-2 fill-transparent" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 2: 突出显示直角 BGF */}
        <AnimatePresence>
          {step === 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <path d="M 185 215 L 200 230 L 215 215" className="stroke-green-500 stroke-2 fill-transparent" />
              <line x1={G.x} y1={G.y} x2={F.x} y2={F.y} className="stroke-green-500 stroke-2" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3: 辅助线 PQ 和 EF */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                x1={P.x} y1={P.y} x2={Q.x} y2={Q.y}
                className="stroke-red-500 stroke-2"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                x1={E.x} y1={E.y} x2={F.x} y2={F.y}
                className="stroke-slate-800 stroke-2"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3: 突出显示 EM 和 MF */}
        <AnimatePresence>
          {step === 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <line x1={E.x} y1={E.y} x2={M.x} y2={M.y} className="stroke-purple-500 stroke-[4]" />
              <line x1={M.x} y1={M.y} x2={F.x} y2={F.y} className="stroke-emerald-500 stroke-[4]" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 4 & 5: 突出显示 AG/AC 和 GH/HC */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line x1={A.x} y1={A.y} x2={G.x} y2={G.y} className="stroke-red-500 stroke-[4]" />
              {step === 5 && (
                <>
                  <line x1={G.x} y1={G.y} x2={H.x} y2={H.y} className="stroke-indigo-500 stroke-[4]" />
                  <line x1={H.x} y1={H.y} x2={C.x} y2={C.y} className="stroke-amber-500 stroke-[4]" />
                </>
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* 绘制所有点 */}
        <Point p={A} label="A" offset={{ x: -15, y: -15 }} />
        <Point p={B} label="B" offset={{ x: -15, y: 15 }} />
        <Point p={C} label="C" offset={{ x: 15, y: 15 }} />
        <Point p={D} label="D" offset={{ x: 15, y: -15 }} />
        <Point p={E} label="E" offset={{ x: 0, y: -20 }} />
        <Point p={F} label="F" offset={{ x: 20, y: 0 }} />
        <Point p={G} label="G" offset={{ x: -10, y: -20 }} />
        
        <AnimatePresence>
          {step >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Point p={P} label="P" offset={{ x: -20, y: 0 }} />
              <Point p={Q} label="Q" offset={{ x: 20, y: 0 }} />
              <Point p={M} label="M" offset={{ x: 10, y: -15 }} />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Point p={H} label="H" offset={{ x: 15, y: 20 }} />
            </motion.g>
          )}
        </AnimatePresence>

      </svg>
    </div>
  );
}
