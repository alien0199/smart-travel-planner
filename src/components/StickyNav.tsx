import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  emoji: string;
  activeClass: string;
}

const navItems: NavItem[] = [
  { id: 'tips', label: 'Tips', shortLabel: 'Tips', emoji: '🚀', activeClass: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700' },
  { id: 'day1', label: 'Day 1', shortLabel: 'D1', emoji: '🛬', activeClass: 'active-day1' },
  { id: 'day2', label: 'Day 2', shortLabel: 'D2', emoji: '🔄', activeClass: 'active-day2' },
  { id: 'day3', label: 'Day 3', shortLabel: 'D3', emoji: '🏮', activeClass: 'active-day3' },
  { id: 'day4', label: 'Day 4', shortLabel: 'D4', emoji: '✈️', activeClass: 'active-day4' },
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
      <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide flex-1 min-w-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              'nav-btn flex items-center gap-1 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2',
              activeSection === item.id ? item.activeClass : ''
            )}
          >
            <span className="text-sm sm:text-base">{item.emoji}</span>
            <span className="hidden xs:inline sm:hidden">{item.shortLabel}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-1">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-taiwan-cyan/10 hover:bg-taiwan-cyan/20 text-taiwan-cyan font-semibold text-xs sm:text-sm transition-all border border-taiwan-cyan/30 active:scale-95"
        >
          <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Map</span>
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default StickyNav;
