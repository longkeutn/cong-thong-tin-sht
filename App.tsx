import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AppCard from './components/AppCard';
import SettingsModal from './components/SettingsModal';
import { getPortalData, saveFavorite } from './services/api'; // Import API service
import { AppItem, Category, User } from './types';
import { Search, Bell, Settings, Menu, ChevronRight } from 'lucide-react';

// Default empty state
const INITIAL_USER: User = {
  email: '',
  fullName: 'Loading...',
  role: 'All',
  avatarUrl: ''
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for data
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [categories, setCategories] = useState<Category[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPortalData();
        setCurrentUser(data.user);
        setCategories(data.categories);
        setApps(data.apps);
        setFavorites(data.favorites);
      } catch (error) {
        console.error("Failed to fetch portal data:", error);
        alert("Failed to load data. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleFavorite = async (appId: string) => {
    // Optimistic UI Update
    setFavorites(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );

    // Call Backend
    try {
      const updatedList = await saveFavorite(appId);
      // If backend returns a list (GAS), sync it. If empty (Dev), ignore.
      if (updatedList && updatedList.length > 0) {
        setFavorites(updatedList);
      }
    } catch (e) {
      console.error("Error saving favorite", e);
      // Revert on failure (optional, simplified here)
    }
  };

  // Filter Apps Logic
  const filteredApps = useMemo(() => {
    let result = apps;

    // Note: Role filtering is already done by the backend/mock API.
    // We only filter by Category and Search here.

    // 1. Category Filter
    if (selectedCategory) {
      result = result.filter(app => app.categoryId === selectedCategory);
    }

    // 2. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(app => 
        app.name.toLowerCase().includes(q) || 
        app.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery, apps]);

  // Group apps by category for the main dashboard view
  const groupedApps = useMemo(() => {
    if (selectedCategory) return null; // Don't group if a specific category is selected
    
    const groups: { category: Category, apps: AppItem[] }[] = [];
    
    categories.forEach(cat => {
      const catApps = filteredApps.filter(app => app.categoryId === cat.id);
      if (catApps.length > 0) {
        groups.push({ category: cat, apps: catApps });
      }
    });
    
    return groups;
  }, [filteredApps, selectedCategory, categories]);

  const favoriteApps = apps.filter(app => favorites.includes(app.id));

  // Determine current category name for breadcrumb
  const currentCategoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : 'Dashboard';

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <Sidebar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-4 flex-1">
             <button 
               className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
               onClick={() => setIsSidebarOpen(true)}
             >
               <Menu />
             </button>
             
             {/* Breadcrumb */}
             <div className="hidden sm:flex items-center text-sm text-gray-500">
                <span className="cursor-pointer hover:text-primary" onClick={() => setSelectedCategory(null)}>Home</span>
                <ChevronRight size={14} className="mx-2" />
                <span className="font-semibold text-gray-800">{currentCategoryName}</span>
             </div>

             {/* Search Bar */}
             <div className="max-w-md w-full ml-4 relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text"
                 placeholder="Tìm kiếm ứng dụng..."
                 className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-lg text-sm transition-all outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2 relative text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              title="Cài đặt hệ thống"
             >
               <Settings size={20} />
             </button>
             <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
             {currentUser.email ? (
               <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
                 {currentUser.avatarUrl ? (
                    <img 
                      src={currentUser.avatarUrl} 
                      alt="User" 
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                 ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {currentUser.fullName.charAt(0)}
                    </div>
                 )}
                 <div className="hidden lg:block text-left">
                   <p className="text-sm font-medium text-gray-700 leading-none">{currentUser.fullName}</p>
                   <p className="text-xs text-gray-400 mt-1 uppercase">{currentUser.role}</p>
                 </div>
               </div>
             ) : (
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
             )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8 pb-10">

             {/* Mobile Search */}
             <div className="md:hidden mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Tìm kiếm ứng dụng..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
             </div>

             {isLoading ? (
               <div className="flex items-center justify-center h-64 text-primary">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
               </div>
             ) : (
               <>
                  {/* Quick Access / Favorites Section */}
                  {(!selectedCategory && !searchQuery) && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          🔥 Ứng dụng hay dùng
                        </h2>
                        <button 
                          onClick={() => setIsSettingsOpen(true)}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          Tùy chỉnh
                        </button>
                      </div>
                      
                      {favoriteApps.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {favoriteApps.map(app => (
                            <AppCard 
                              key={app.id} 
                              app={app} 
                              isFavorite={true} 
                              onToggleFavorite={handleToggleFavorite}
                              variant="compact"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white rounded-xl border-dashed border-2 border-gray-200 p-8 text-center text-gray-400">
                           <p>Chưa có ứng dụng yêu thích. Nhấn vào biểu tượng trái tim để thêm.</p>
                        </div>
                      )}
                    </section>
                  )}

                  {/* Main App Grid */}
                  <div className="space-y-8">
                    
                    {/* View: All Categories Grouped */}
                    {(!selectedCategory && groupedApps) && groupedApps.map((group, idx) => (
                       <section key={group.category.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{animationDelay: `${idx * 100}ms`}}>
                          <div className="flex items-center gap-3 mb-4">
                             <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <Settings size={20} /> 
                             </div>
                             <div>
                               <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{group.category.name}</h2>
                               <p className="text-xs text-gray-500">{group.apps.length} ứng dụng</p>
                             </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {group.apps.map(app => (
                              <AppCard 
                                key={app.id} 
                                app={app} 
                                isFavorite={favorites.includes(app.id)} 
                                onToggleFavorite={handleToggleFavorite}
                              />
                            ))}
                          </div>
                       </section>
                    ))}

                    {/* View: Specific Category Selected or Search Result */}
                    {(selectedCategory || searchQuery) && (
                      <section className="animate-in fade-in zoom-in duration-300">
                         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">
                           {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : currentCategoryName}
                         </h2>
                         
                         {filteredApps.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                              {filteredApps.map(app => (
                                <AppCard 
                                  key={app.id} 
                                  app={app} 
                                  isFavorite={favorites.includes(app.id)} 
                                  onToggleFavorite={handleToggleFavorite}
                                />
                              ))}
                           </div>
                         ) : (
                           <div className="text-center py-20">
                              <p className="text-gray-500 text-lg">Không tìm thấy ứng dụng nào.</p>
                              <button 
                                onClick={() => {setSearchQuery(''); setSelectedCategory(null);}} 
                                className="mt-4 text-primary font-medium hover:underline"
                              >
                                Quay lại Dashboard
                              </button>
                           </div>
                         )}
                      </section>
                    )}
                  </div>
               </>
             )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        apps={apps}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default App;
