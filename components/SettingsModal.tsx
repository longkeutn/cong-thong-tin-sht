import React, { useState } from 'react';
import { X, Search, Lock, Edit2, Settings, ClipboardCheck } from 'lucide-react';
import { AppItem, User } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

type Tab = 'favorites' | 'myapps' | 'users';

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, apps, favorites, onToggleFavorite }) => {
  const [activeTab, setActiveTab] = useState<Tab>('myapps');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter apps based on search
  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Settings size={22} className="text-primary" />
              Cài đặt hệ thống
            </h2>
            <p className="text-sm text-gray-500 mt-1">Quản lý cấu hình và phân quyền</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'favorites' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            🔥 Ứng dụng hay dùng
          </button>
          <button 
             onClick={() => setActiveTab('myapps')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'myapps' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            📱 My Apps
          </button>
          <button 
             onClick={() => setActiveTab('users')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            👥 Quản lý Users
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          
          {/* Tab: Favorites Config */}
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                 <div>
                    <h3 className="font-semibold text-gray-800">Ứng dụng hay dùng - Cài đặt hiển thị</h3>
                    <p className="text-xs text-gray-500">Quản lý các ứng dụng hiển thị trên dashboard chính (tối đa 6 ứng dụng)</p>
                 </div>
                 <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                    {favorites.length} / 6 đã chọn
                 </div>
              </div>

              {/* Search within modal */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm ứng dụng..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredApps.map(app => {
                  const isFav = favorites.includes(app.id);
                  return (
                    <div 
                      key={app.id}
                      onClick={() => onToggleFavorite(app.id)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-3 relative
                        ${isFav ? 'border-primary bg-primary/5' : 'border-transparent bg-white shadow-sm hover:shadow-md'}
                      `}
                    >
                      {isFav && (
                        <div className="absolute top-2 right-2 text-primary bg-white rounded-full p-0.5">
                          <ClipboardCheck size={16} />
                        </div>
                      )}
                      <div className={`w-10 h-10 rounded-lg ${app.iconColor || 'bg-gray-500'} flex items-center justify-center text-white`}>
                        <span className="font-bold">{app.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-2">{app.name}</h4>
                        <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{app.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab: Users Management (Simulated Table) */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">USER</th>
                      <th className="p-4 font-semibold text-gray-600">ROLE</th>
                      <th className="p-4 font-semibold text-gray-600">TRẠNG THÁI</th>
                      <th className="p-4 font-semibold text-gray-600">MY APPS</th>
                      <th className="p-4 font-semibold text-gray-600 text-right">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">Quản trị viên TBS</div>
                        <div className="text-xs text-gray-500">admin@tbsgroup.vn</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">admin</span>
                      </td>
                      <td className="p-4">
                        <span className="text-green-600 font-medium">Hoạt động</span>
                      </td>
                      <td className="p-4 text-xs text-gray-500 max-w-xs truncate">
                        de_nghi, lich_hop_khach, di_cong_tac...
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"><Edit2 size={14}/></button>
                           <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"><Lock size={14}/></button>
                        </div>
                      </td>
                    </tr>
                     {/* Mock rows */}
                     {[1, 2, 3].map(i => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">Nhân viên {i}</div>
                          <div className="text-xs text-gray-500">user{i}@tbsgroup.vn</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">User</span>
                        </td>
                        <td className="p-4">
                          <span className="text-green-600 font-medium">Hoạt động</span>
                        </td>
                        <td className="p-4 text-xs text-gray-500 max-w-xs truncate">
                          --
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-2 bg-gray-100 text-gray-500 rounded hover:bg-gray-200"><Edit2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                     ))}
                  </tbody>
                </table>
               </div>
            </div>
          )}

          {activeTab === 'myapps' && (
             <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Settings size={48} className="mb-4 opacity-20" />
                <p>Khu vực quản lý ứng dụng cá nhân (Đang phát triển)</p>
             </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
           <button onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">
             Hủy
           </button>
           <button onClick={onClose} className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors shadow-lg shadow-primary/30">
             Lưu thay đổi
           </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;