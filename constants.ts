import { AppItem, Category, User } from './types';

export const CURRENT_USER: User = {
  email: 'admin@tbsgroup.vn',
  fullName: 'Quản trị viên TBS',
  role: 'Admin',
  avatarUrl: 'https://ui-avatars.com/api/?name=Admin+TBS&background=044e36&color=fff',
};

export const CATEGORIES: Category[] = [
  { id: 'cat_admin', name: 'HÀNH CHÍNH', iconName: 'Building', sortOrder: 1 },
  { id: 'cat_security', name: 'AN NINH_BẢO VỆ', iconName: 'ShieldCheck', sortOrder: 2 },
  { id: 'cat_hr', name: 'NHÂN SỰ & TUYỂN DỤNG', iconName: 'Users', sortOrder: 3 },
  { id: 'cat_union', name: 'ĐẢNG ĐOÀN VÀ CS NLĐ', iconName: 'HeartHandshake', sortOrder: 4 },
  { id: 'cat_qa', name: 'QLCL', iconName: 'ClipboardCheck', sortOrder: 5 },
  { id: 'cat_rd', name: 'PTSP & CÔNG NGHỆ', iconName: 'Cpu', sortOrder: 6 },
  { id: 'cat_plan', name: 'KẾ HOẠCH', iconName: 'CalendarDays', sortOrder: 7 },
  { id: 'cat_supply', name: 'QTVT & CUNG ỨNG', iconName: 'Truck', sortOrder: 8 },
  { id: 'cat_prod', name: 'THNM SẢN XUẤT', iconName: 'Factory', sortOrder: 9 },
];

// Replicating apps seen in the screenshots + generic ones
export const APPS: AppItem[] = [
  // HÀNH CHÍNH
  { 
    id: 'app_transport', 
    name: 'Quản lý vận chuyển hàng hóa', 
    description: 'Quản lý vận chuyển', 
    url: '#', 
    categoryId: 'cat_admin', 
    allowedRoles: ['All'], 
    isActive: true,
    iconColor: 'bg-blue-600'
  },
  { 
    id: 'app_meeting', 
    name: 'Quản lý lịch hội họp & đón khách', 
    description: 'Lịch hội họp', 
    url: '#', 
    categoryId: 'cat_admin', 
    allowedRoles: ['All'], 
    isActive: true,
    iconColor: 'bg-indigo-600'
  },
  { 
    id: 'app_records', 
    name: 'Quản lý văn thư lưu trữ', 
    description: 'Văn thư lưu trữ', 
    url: '#', 
    categoryId: 'cat_admin', 
    allowedRoles: ['Admin', 'HR'], 
    isActive: true,
    iconColor: 'bg-violet-600'
  },
  { 
    id: 'app_travel', 
    name: 'Quản lý đi công tác', 
    description: 'Quản lý công tác', 
    url: '#', 
    categoryId: 'cat_admin', 
    allowedRoles: ['All'], 
    isActive: true,
    iconColor: 'bg-blue-500'
  },
   { 
    id: 'app_assets', 
    name: 'Quản lý tài sản VPTX', 
    description: 'Quản lý tài sản', 
    url: '#', 
    categoryId: 'cat_admin', 
    allowedRoles: ['Admin'], 
    isActive: true,
    iconColor: 'bg-blue-700'
  },

  // AN NINH
  { 
    id: 'app_gate', 
    name: 'Quản lý ra vào cổng', 
    description: 'Quản lý việc ra vào của nhân viên và khách', 
    url: '#', 
    categoryId: 'cat_security', 
    allowedRoles: ['Admin', 'Factory'], 
    isActive: true,
    iconColor: 'bg-slate-700'
  },

  // NHÂN SỰ
  { 
    id: 'app_salary', 
    name: 'Phiếu lương', 
    description: 'Xem phiếu lương hàng tháng', 
    url: '#', 
    categoryId: 'cat_hr', 
    allowedRoles: ['All'], 
    isActive: true,
    iconColor: 'bg-pink-500'
  },
  { 
    id: 'app_recruitment', 
    name: 'Đăng ký tuyển dụng & TD nội bộ', 
    description: 'Đăng ký tuyển dụng', 
    url: '#', 
    categoryId: 'cat_hr', 
    allowedRoles: ['HR', 'Admin'], 
    isActive: true,
    iconColor: 'bg-pink-600'
  },
   { 
    id: 'app_leave', 
    name: 'Quản lý Công & Phép', 
    description: 'Thời gian làm việc', 
    url: '#', 
    categoryId: 'cat_hr', 
    allowedRoles: ['All'], 
    isActive: true,
    iconColor: 'bg-rose-500'
  },

  // QLCL
  { 
    id: 'app_labtest', 
    name: 'Yêu cầu labtest', 
    description: 'Yêu cầu kiểm tra lab', 
    url: '#', 
    categoryId: 'cat_qa', 
    allowedRoles: ['Factory', 'Admin'], 
    isActive: true,
    iconColor: 'bg-red-500'
  },

  // R&D
  { 
    id: 'app_ie', 
    name: 'Quản lý & Kiểm soát IE', 
    description: 'Industrial Engineering', 
    url: '#', 
    categoryId: 'cat_rd', 
    allowedRoles: ['Factory', 'Admin'], 
    isActive: true,
    iconColor: 'bg-purple-500'
  },

  // KẾ HOẠCH
  { 
    id: 'app_shortship', 
    name: 'Ghi nhận Short Ship_ AIR', 
    description: 'Ghi nhận Short Ship_ AIR', 
    url: '#', 
    categoryId: 'cat_plan', 
    allowedRoles: ['Factory', 'Sales', 'Admin'], 
    isActive: true,
    iconColor: 'bg-cyan-500'
  },

  // QTVT
   { 
    id: 'app_warehouse', 
    name: 'Quản lý kho', 
    description: 'Quản lý kho', 
    url: '#', 
    categoryId: 'cat_supply', 
    allowedRoles: ['Factory', 'Admin'], 
    isActive: true,
    iconColor: 'bg-orange-400'
  },

  // SX
   { 
    id: 'app_machine', 
    name: 'Quản lý máy móc thiết bị', 
    description: 'Bảo trì máy', 
    url: '#', 
    categoryId: 'cat_prod', 
    allowedRoles: ['Factory', 'Admin'], 
    isActive: true,
    iconColor: 'bg-emerald-600'
  },
];

export const MOCK_FAVORITES: string[] = ['app_salary', 'app_travel', 'app_leave'];