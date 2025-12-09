/**
 * Google Apps Script Backend for Enterprise Portal
 * 
 * SETUP:
 * 1. Create a Google Sheet with tabs: Users, Categories, Apps, Favorites.
 * 2. Copy the SPREADSHEET_ID below.
 * 3. Deploy as Web App.
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // <--- PASTE YOUR SHEET ID

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Enterprise App Portal')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Main API: Fetches User Profile, Categories, Apps, and Favorites in one go.
 */
function getPortalData() {
  const email = Session.getActiveUser().getEmail();
  // Fallback for development if email is empty (e.g. strict privacy settings)
  const userEmail = email || 'admin@tbsgroup.vn'; 
  
  const db = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // 1. Get User Role
  const users = sheetToObjects(db.getSheetByName('Users'));
  const userObj = users.find(u => u.Email === userEmail);
  
  // Default to Guest if not found
  const currentUser = {
    email: userEmail,
    fullName: userObj ? userObj.FullName : 'Guest User',
    role: userObj ? userObj.RoleID : 'GUEST',
    avatarUrl: userObj ? userObj.AvatarURL : ''
  };

  // 2. Get Categories (Sorted)
  let categories = sheetToObjects(db.getSheetByName('Categories'));
  categories.sort((a, b) => a.SortOrder - b.SortOrder);
  
  // Map to frontend interface
  const mappedCategories = categories.map(c => ({
    id: c.CategoryID,
    name: c.CategoryName,
    iconName: c.IconClass,
    sortOrder: c.SortOrder
  }));

  // 3. Get Apps (Filtered by Role)
  const allApps = sheetToObjects(db.getSheetByName('Apps'));
  const userRole = currentUser.role;

  const visibleApps = allApps
    .filter(app => {
      // Check Active
      if (!app.IsActive) return false;
      
      // Check Role
      const allowed = app.AllowedRoles.toString().split(',').map(r => r.trim().toUpperCase());
      if (allowed.includes('ALL')) return true;
      if (allowed.includes(userRole.toUpperCase())) return true;
      
      return false;
    })
    .map(app => ({
      id: app.AppID,
      name: app.AppName,
      description: app.Description,
      url: app.AppURL,
      iconUrl: app.IconURL || '',
      categoryId: app.CategoryID,
      allowedRoles: app.AllowedRoles.split(','),
      isActive: app.IsActive,
      // Assign a random color if no icon (Frontend fallback)
      iconColor: 'bg-blue-600' 
    }));

  // 4. Get Favorites
  const favSheet = db.getSheetByName('Favorites');
  const favData = sheetToObjects(favSheet);
  const userFav = favData.find(f => f.Email === userEmail);
  
  let favoriteIds = [];
  try {
    if (userFav && userFav.FavoriteAppIDs) {
      favoriteIds = JSON.parse(userFav.FavoriteAppIDs);
    }
  } catch (e) {
    console.error('Error parsing favorites', e);
  }

  return {
    user: currentUser,
    categories: mappedCategories,
    apps: visibleApps,
    favorites: favoriteIds
  };
}

/**
 * Toggles a favorite app for the current user.
 * Returns the new list of favorite IDs.
 */
function toggleAppFavorite(appId) {
  const email = Session.getActiveUser().getEmail() || 'admin@tbsgroup.vn';
  const db = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = db.getSheetByName('Favorites');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const emailIndex = headers.indexOf('Email');
  const favIndex = headers.indexOf('FavoriteAppIDs');
  
  let rowIndex = -1;
  let currentFavs = [];
  
  // Find user row
  for (let i = 1; i < data.length; i++) {
    if (data[i][emailIndex] === email) {
      rowIndex = i + 1; // 1-based index
      try {
        currentFavs = JSON.parse(data[i][favIndex]);
      } catch (e) {}
      break;
    }
  }
  
  // Toggle Logic
  if (currentFavs.includes(appId)) {
    currentFavs = currentFavs.filter(id => id !== appId);
  } else {
    currentFavs.push(appId);
  }
  
  const jsonString = JSON.stringify(currentFavs);
  
  if (rowIndex > 0) {
    // Update existing
    sheet.getRange(rowIndex, favIndex + 1).setValue(jsonString);
  } else {
    // Create new
    sheet.appendRow([email, jsonString]);
  }
  
  return currentFavs;
}

/**
 * Helper: Converts Sheet 2D array to Array of Objects
 */
function sheetToObjects(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data[0];
  const results = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const obj = {};
    for (let h = 0; h < headers.length; h++) {
      obj[headers[h]] = row[h];
    }
    results.push(obj);
  }
  return results;
}
