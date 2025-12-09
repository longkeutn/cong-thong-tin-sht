import React from 'react';
import { AppItem } from '../types';
import { ExternalLink, Heart } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  variant?: 'default' | 'compact';
}

const AppCard: React.FC<AppCardProps> = ({ app, isFavorite, onToggleFavorite, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
       <div className="group relative bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer hover:border-primary-light/30">
        <div className={`w-12 h-12 rounded-lg ${app.iconColor || 'bg-gray-500'} flex items-center justify-center text-white mb-3 shadow-inner`}>
           {/* Placeholder for Icon URL or Initials */}
           {app.iconUrl ? (
             <img src={app.iconUrl} alt={app.name} className="w-8 h-8 object-contain" />
           ) : (
             <span className="text-xl font-bold">{app.name.charAt(0)}</span>
           )}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px] leading-tight">
          {app.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{app.description}</p>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(app.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'}`}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    );
  }

  // Default List/Card View (as seen in screenshots for category details)
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${app.iconColor || 'bg-gray-500'} flex items-center justify-center text-white shadow-sm shrink-0`}>
           {app.iconUrl ? (
             <img src={app.iconUrl} alt={app.name} className="w-8 h-8 object-contain" />
           ) : (
             <span className="text-xl font-bold">{app.name.charAt(0)}</span>
           )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 group-hover:text-primary-light transition-colors">{app.name}</h3>
          <p className="text-sm text-gray-500">{app.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
         <button 
          onClick={() => onToggleFavorite(app.id)}
          className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400 hover:bg-gray-50'}`}
          title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <a 
          href={app.url} 
          target="_blank" 
          rel="noreferrer"
          className="p-2 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-full transition-colors"
          title="Mở ứng dụng"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

export default AppCard;