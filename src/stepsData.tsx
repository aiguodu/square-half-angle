import { BookOpen, CheckCircle, Compass, Lightbulb, PenTool, Target } from 'lucide-react';
import { ReactNode } from 'react';

export interface StepData {
  title: string;
  icon: ReactNode;
  desc: string;
  detail: string;
  tts: string;
}

export const stepsData: StepData[] = [
  {
    title: "解题思路：半角模型",
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    desc: "分析题目已知条件，识别正方形中的经典“半角模型”。",
    detail: "已知正方形 $ABCD$，对角线 $AC$。$\\angle EBF = 45^\\circ$。\n这类问题通常通过构造共圆、旋转或使用坐标系来解决。我们先从角度入手，寻找突破口。",
    tts: "同学们好！今天我们来挑战一道正方形中的“半角模型”压轴题。题目给定了正方形ABCD，以及一个45度的夹角EBF。这类题目的核心，往往在于利用旋转、共圆或者坐标系来破局。我们先来梳理一下已知条件。"
  },
  {
    title: "第一问：寻找共圆点",
    icon: <Compass className="w-5 h-5 text-blue-500" />,
    desc: "寻找相等的圆周角，证明 B, G, C, F 四点共圆。",
    detail: "$\\because AC$ 是正方形对角线\n$\\therefore \\angle GCF = 45^\\circ$\n又 $\\because \\angle GBF = 45^\\circ$\n$\\therefore \\angle GBF = \\angle GCF$\n$\\therefore B, G, C, F$ 四点共圆。",
    tts: "第一问要求判断三角形BGF的形状。注意观察，对角线AC平分直角，所以角GCF是45度。而已知角GBF也是45度。根据“同弧所对的圆周角相等”的逆定理，我们可以得出 B、G、C、F 四点共圆！"
  },
  {
    title: "第一问：直角三角形",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    desc: "利用圆内接四边形对角互补，求出 ∠BGF。",
    detail: "$\\because B, G, C, F$ 四点共圆\n$\\therefore \\angle BGF + \\angle BCF = 180^\\circ$\n$\\because \\angle BCF = 90^\\circ$\n$\\therefore \\angle BGF = 90^\\circ$\n$\\therefore \\triangle BGF$ 是直角三角形。",
    tts: "既然 B、G、C、F 四点共圆，那么角BGF和角BCF互为对角，它们的和是180度。因为正方形的角BCF是90度，所以角BGF必然也是90度！因此，三角形BGF是一个直角三角形。"
  },
  {
    title: "第二问：证明线段相等",
    icon: <PenTool className="w-5 h-5 text-purple-500" />,
    desc: "作垂线构造平行关系，证明 M 是 EF 中点。",
    detail: "过 $G$ 作 $PQ \\perp CD$，则 $PQ \\parallel AD \\parallel BC$。\n利用解析几何或相似比例可证：\n$M$ 的纵坐标恰好等于 $E, F$ 纵坐标的平均值。\n$\\therefore M$ 是 $EF$ 的中点，即 $EM = MF$。",
    tts: "第二问，过点G作CD的垂线PQ，交EF于M。我们要证EM等于MF。因为角BGF是90度，结合正方形的性质，我们可以利用坐标系推导。实际上，PQ平行于上下底边，经过推导我们会发现，M恰好是线段EF的中点。"
  },
  {
    title: "第三问：坐标系建系",
    icon: <Target className="w-5 h-5 text-red-500" />,
    desc: "建立直角坐标系，利用比例关系求坐标。",
    detail: "设正方形边长为 $a$，以 $B$ 为原点建系。\n已知 $\\frac{AG}{AC} = \\frac{1}{k}$，可求得 $G$ 点坐标。\n进而推导出 $E, F$ 的坐标表达式。",
    tts: "第三问是代数计算。已知AG比AC等于1比k。我们可以建立平面直角坐标系，设正方形边长为a。通过G点的比例关系，我们可以依次表示出E、F点的坐标，进而求出直线BF与AC的交点H的坐标。"
  },
  {
    title: "第三问：求线段比值",
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    desc: "求出 H 点坐标，计算 GH 与 HC 的比值。",
    detail: "联立直线 $BF$ 与 $AC$ 的方程，求得交点 $H$ 的坐标。\n利用两点间距离公式或横坐标之差的比值：\n$\\frac{GH}{HC} = \\frac{x_H - x_G}{x_C - x_H} = \\frac{k^2 - 2k + 2}{k(k - 2)}$。",
    tts: "利用两点间的距离公式或横坐标之差的比例，我们可以求出GH与HC的比值。经过代数化简，最终结果为 (k平方减2k加2) 除以 (k平方减2k)。这就是数形结合的魅力！"
  }
];
