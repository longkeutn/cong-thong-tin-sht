export type Role = 'Admin' | 'HR' | 'Factory' | 'Sales' | 'All';

export interface User {
  email: string;
  fullName: string;
  role: Role;
  avatarUrl: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Mapping to Lucide icons
  sortOrder: number;
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  url: string;
  iconUrl?: string; // Optional image icon
  iconColor?: string; // Fallback background color
  categoryId: string;
  allowedRoles: Role[];
  isActive: boolean;
}

export interface FavoriteState {
  [email: string]: string[]; // list of AppIDs
}