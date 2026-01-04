import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';

interface MissionHUDProps {
  total: number;
  checked: number;
}

const getRank = (percent: number) => {
  if (percent >= 100) return { text: "ตำนานเดินดิน 🏆", bg: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff" };
  if (percent >= 80) return { text: "ตัวตึงไทเป 🔥", bg: "#ef4444", color: "#fff" };
  if (percent >= 50) return { text: "สายลุย 👟", bg: "#8b5cf6", color: "#fff" };
  if (percent >= 20) return { text: "นักเดินทาง 🎒", bg: "#3b82f6", color: "#fff" };
  return { text: "เริ่มเที่ยว 🐣", bg: "#e2e8f0", color: "#475569" };
};

const MissionHUD = ({ total, checked }: MissionHUDProps) => {
  const percent = total > 0 ? (checked / total) * 100 : 0;
  const rank = getRank(percent);

  return (
    <div className="mission-hud">
      <div className="flex items-center gap-2 font-bold text-lg">
        <Target className="w-5 h-5 text-day1" />
        <span className="text-day1">{checked}</span>
        <span className="opacity-60 text-xs mx-0.5">/</span>
        <span className="text-sm opacity-90">{total}</span>
      </div>

      <div 
        className="text-xs py-1 px-3 rounded-full font-bold whitespace-nowrap shadow-sm"
        style={{ background: rank.bg, color: rank.color }}
      >
        {rank.text}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-5 right-5 h-1 bg-white/10 overflow-hidden rounded-t">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ 
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #3b82f6, #f43f5e)'
          }}
        />
      </div>
    </div>
  );
};

export default MissionHUD;
