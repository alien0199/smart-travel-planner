import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  activeClass: string;
}

const navItems: NavItem[] = [
  { id: 'tips', label: 'Trip Tips', activeClass: 'text-indigo-500 bg-indigo-100 border-indigo-300' },
  { id: 'day1', label: 'Day 1: Arrival', activeClass: 'active-day1' },
  { id: 'day2', label: 'Day 2: The Loop', activeClass: 'active-day2' },
  { id: 'day3', label: 'Day 3: Jiufen', activeClass: 'active-day3' },
  { id: 'day4', label: 'Day 4: Departure', activeClass: 'active-day4' },
];

const StickyNav = () => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn('nav-btn', item.activeClass)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default StickyNav;
