import React from 'react';
import { Category } from '../types';
import { 
  Building, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  ClipboardCheck, 
  Cpu, 
  CalendarDays, 
  Truck, 
  Factory,
  LayoutGrid,
  FileText
} from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

// Icon mapping helper
const getIcon = (iconName: string, size: number = 20) => {
  const icons: any = {
    Building, ShieldCheck, Users, HeartHandshake, ClipboardCheck, Cpu, CalendarDays, Truck, Factory
  };
  const IconComponent = icons[iconName] || LayoutGrid;
  return <IconComponent size={size} />;
};

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory, isOpen, onCloseMobile }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full w-72 
        bg-primary text-white flex flex-col shadow-2xl transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* User / Header Info */}
        <div className="p-6 border-b border-primary-light">
          <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Users size={20} className="text-white" />
             </div>
             <div>
               <h2 className="font-bold text-sm leading-tight">Quản trị viên TBS</h2>
               <p className="text-xs text-primary-light/80">Quản trị viên</p>
             </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <div className="px-4 mb-2 text-xs font-semibold text-primary-light/70 uppercase tracking-wider">
            Dashboard
          </div>
          
          <button
            onClick={() => {
              onSelectCategory(null);
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors border-l-4
              ${selectedCategory === null 
                ? 'bg-primary-light border-white text-white' 
                : 'border-transparent text-gray-300 hover:bg-primary-light/50 hover:text-white'
              }`}
          >
            <LayoutGrid size={20} />
            <span>Dashboard</span>
          </button>
          
           <button
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors border-l-4 border-transparent text-gray-300 hover:bg-primary-light/50 hover:text-white`}
          >
            <FileText size={20} />
            <span>Phê duyệt</span>
          </button>

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-primary-light/70 uppercase tracking-wider">
            Phân hệ
          </div>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors border-l-4 group
                ${selectedCategory === cat.id 
                  ? 'bg-primary-light border-white text-white' 
                  : 'border-transparent text-gray-300 hover:bg-primary-light/50 hover:text-white'
                }`}
            >
              <span className={`${selectedCategory === cat.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                {getIcon(cat.iconName)}
              </span>
              <span className="truncate text-left">{cat.name}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-light text-xs text-center text-primary-light/60">
          © 2024 TBS Group Portal
        </div>
      </aside>
    </>
  );
};

export default Sidebar;