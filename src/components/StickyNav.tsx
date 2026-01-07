import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  bgColor: string;
  activeColor: string;
  activeBg: string;
  activeBorder: string;
}

const navItems: NavItem[] = [
  { 
    id: 'tips', 
    label: 'Tips',
    bgColor: 'bg-violet-50',
    activeColor: 'text-violet-600',
    activeBg: 'bg-violet-100',
    activeBorder: 'border-violet-300'
  },
  { 
    id: 'day1', 
    label: 'Day 1',
    bgColor: 'bg-blue-50',
    activeColor: 'text-blue-600',
    activeBg: 'bg-blue-100',
    activeBorder: 'border-blue-300'
  },
  { 
    id: 'day2', 
    label: 'Day 2',
    bgColor: 'bg-amber-50',
    activeColor: 'text-amber-600',
    activeBg: 'bg-amber-100',
    activeBorder: 'border-amber-300'
  },
  { 
    id: 'day3', 
    label: 'Day 3',
    bgColor: 'bg-emerald-50',
    activeColor: 'text-emerald-600',
    activeBg: 'bg-emerald-100',
    activeBorder: 'border-emerald-300'
  },
  { 
    id: 'day4', 
    label: 'Day 4',
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
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0 px-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                'flex items-center justify-center transition-all duration-200 text-sm font-semibold whitespace-nowrap rounded-full border-2 px-4 py-2 min-w-fit',
                'active:scale-95',
                isActive 
                  ? `${item.activeColor} ${item.activeBg} ${item.activeBorder} shadow-sm` 
                  : `text-slate-500 ${item.bgColor} border-transparent hover:border-slate-200`
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center flex-shrink-0 ml-2 pr-1">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Map className="w-4 h-4" />
          <span>Map</span>
        </button>
      </div>
    </nav>
  );
};

export default StickyNav;
