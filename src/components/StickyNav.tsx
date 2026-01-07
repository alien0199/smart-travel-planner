import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  activeClass: string;
}

const navItems: NavItem[] = [
  { id: 'tips', label: 'Tips', activeClass: 'text-indigo-600 bg-indigo-100 border-indigo-300' },
  { id: 'day1', label: 'Day 1', activeClass: 'active-day1' },
  { id: 'day2', label: 'Day 2', activeClass: 'active-day2' },
  { id: 'day3', label: 'Day 3', activeClass: 'active-day3' },
  { id: 'day4', label: 'Day 4', activeClass: 'active-day4' },
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
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 min-w-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              'nav-btn flex items-center transition-all duration-200 text-xs sm:text-sm px-3 py-1.5 sm:py-2 font-medium whitespace-nowrap',
              activeSection === item.id ? item.activeClass : ''
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center flex-shrink-0 ml-1">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-1 px-3 py-1.5 sm:py-2 rounded-full bg-taiwan-cyan/10 hover:bg-taiwan-cyan/20 text-taiwan-cyan font-semibold text-xs sm:text-sm transition-all border border-taiwan-cyan/30 active:scale-95"
        >
          <Map className="w-4 h-4" />
          <span>Map</span>
        </button>
      </div>
    </nav>
  );
};

export default StickyNav;
