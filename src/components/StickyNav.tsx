import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Map, Lightbulb, PlaneLanding, Utensils, Landmark, PlaneTakeoff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  bgColor: string;
  activeColor: string;
  activeBg: string;
  activeBorder: string;
}

const navItems: NavItem[] = [
  { 
    id: 'tips', 
    label: 'Tips',
    icon: Lightbulb,
    bgColor: 'bg-violet-50',
    activeColor: 'text-violet-600',
    activeBg: 'bg-violet-100',
    activeBorder: 'border-violet-300'
  },
  { 
    id: 'day1', 
    label: 'D1',
    icon: PlaneLanding,
    bgColor: 'bg-blue-50',
    activeColor: 'text-blue-600',
    activeBg: 'bg-blue-100',
    activeBorder: 'border-blue-300'
  },
  { 
    id: 'day2', 
    label: 'D2',
    icon: Utensils,
    bgColor: 'bg-amber-50',
    activeColor: 'text-amber-600',
    activeBg: 'bg-amber-100',
    activeBorder: 'border-amber-300'
  },
  { 
    id: 'day3', 
    label: 'D3',
    icon: Landmark,
    bgColor: 'bg-emerald-50',
    activeColor: 'text-emerald-600',
    activeBg: 'bg-emerald-100',
    activeBorder: 'border-emerald-300'
  },
  { 
    id: 'day4', 
    label: 'D4',
    icon: PlaneTakeoff,
    bgColor: 'bg-slate-100',
    activeColor: 'text-slate-700',
    activeBg: 'bg-slate-200',
    activeBorder: 'border-slate-400'
  },
];

const StickyNav = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 120;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn(
      "sticky-nav safe-area-top transition-all duration-300",
      isScrolled ? "shadow-lg" : "shadow-md"
    )}>
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 min-w-0 px-0.5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                'flex items-center gap-1 transition-all duration-200 text-xs font-semibold whitespace-nowrap rounded-full border-2 px-2.5 py-1.5',
                'active:scale-95',
                isActive 
                  ? `${item.activeColor} ${item.activeBg} ${item.activeBorder} shadow-sm` 
                  : `text-slate-500 ${item.bgColor} border-transparent hover:border-slate-200`
              )}
            >
              <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center flex-shrink-0 ml-1 pr-0.5">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Map className="w-3.5 h-3.5" />
          <span>Map</span>
        </button>
      </div>
    </nav>
  );
};

export default StickyNav;
