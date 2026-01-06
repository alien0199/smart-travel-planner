import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  emoji: string;
  activeClass: string;
}

const navItems: NavItem[] = [
  { id: 'tips', label: 'Tips', emoji: '🚀', activeClass: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700' },
  { id: 'day1', label: 'Day 1', emoji: '🛬', activeClass: 'active-day1' },
  { id: 'day2', label: 'Day 2', emoji: '🔄', activeClass: 'active-day2' },
  { id: 'day3', label: 'Day 3', emoji: '🏮', activeClass: 'active-day3' },
  { id: 'day4', label: 'Day 4', emoji: '✈️', activeClass: 'active-day4' },
];

const StickyNav = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Find active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
      "sticky-nav transition-all duration-300",
      isScrolled ? "shadow-lg" : "shadow-md"
    )}>
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              'nav-btn flex items-center gap-1.5 transition-all duration-200',
              activeSection === item.id ? item.activeClass : ''
            )}
          >
            <span className="text-base">{item.emoji}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-taiwan-cyan/10 hover:bg-taiwan-cyan/20 text-taiwan-cyan font-semibold text-sm transition-all border border-taiwan-cyan/30"
        >
          <Map className="w-4 h-4" />
          <span className="hidden sm:inline">Map</span>
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default StickyNav;
