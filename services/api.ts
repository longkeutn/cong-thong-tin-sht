import { AppItem, Category, User } from '../types';
import { APPS, CATEGORIES, CURRENT_USER, MOCK_FAVORITES } from '../constants';

export interface PortalData {
  user: User;
  categories: Category[];
  apps: AppItem[];
  favorites: string[];
}

/**
 * Fetches initial data for the portal.
 * In Production: Calls google.script.run.getPortalData()
 * In Development: Returns mock data from constants.ts with role filtering applied.
 */
export const getPortalData = async (): Promise<PortalData> => {
  // Check if running inside Google Apps Script iframe
  if (typeof window !== 'undefined' && (window as any).google?.script?.run) {
    return new Promise((resolve, reject) => {
      (window as any).google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getPortalData();
    });
  }

  // Fallback: Simulate API delay and backend logic for local dev
  console.log("Running in Dev Mode: Using Mock Data");
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate Backend Logic: Filter apps by Role
      const visibleApps = APPS.filter(app => 
         app.isActive && (app.allowedRoles.includes('All') || app.allowedRoles.includes(CURRENT_USER.role))
      );

      resolve({
        user: CURRENT_USER,
        categories: CATEGORIES,
        apps: visibleApps,
        favorites: MOCK_FAVORITES
      });
    }, 800);
  });
};

/**
 * Toggles the favorite status of an app.
 * In Production: Calls google.script.run.toggleAppFavorite()
 * In Development: Returns empty array (State is handled optimistically in UI).
 */
export const saveFavorite = async (appId: string): Promise<string[]> => {
  if (typeof window !== 'undefined' && (window as any).google?.script?.run) {
    return new Promise((resolve, reject) => {
      (window as any).google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .toggleAppFavorite(appId);
    });
  }

  console.log(`[Dev Mode] Toggled favorite for: ${appId}`);
  // In a real app, we'd update the mock store, but here we just return empty
  // The UI updates optimistically anyway.
  return [];
};
