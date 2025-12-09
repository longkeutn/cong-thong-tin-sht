# Google Sheets Database Structure

To power this application, create a Google Spreadsheet with the following 4 tabs.
Update `SPREADSHEET_ID` in `Code.js` with your sheet's ID.

## 1. Sheet "Users"
Maps email addresses to Roles.
**Headers (Row 1):** `Email`, `FullName`, `RoleID`, `AvatarURL`

| Email | FullName | RoleID | AvatarURL |
|---|---|---|---|
| admin@tbsgroup.vn | Quản trị viên TBS | ADMIN | https://ui-avatars.com/api/?name=Admin |
| user@tbsgroup.vn | Nguyễn Văn A | HR | https://ui-avatars.com/api/?name=User |

## 2. Sheet "Categories"
Defines the sidebar menu groups.
**Headers (Row 1):** `CategoryID`, `CategoryName`, `IconClass`, `SortOrder`

| CategoryID | CategoryName | IconClass | SortOrder |
|---|---|---|---|
| cat_admin | HÀNH CHÍNH | Building | 1 |
| cat_hr | NHÂN SỰ | Users | 2 |

## 3. Sheet "Apps"
The list of all available applications and their permissions.
**Headers (Row 1):** `AppID`, `AppName`, `Description`, `AppURL`, `IconURL`, `CategoryID`, `AllowedRoles`, `IsActive`

| AppID | AppName | Description | AppURL | IconURL | CategoryID | AllowedRoles | IsActive |
|---|---|---|---|---|---|---|---|
| app_salary | Phiếu lương | Xem lương | # | | cat_hr | All | TRUE |
| app_recruitment | Tuyển dụng | Quản lý TD | # | | cat_hr | HR,ADMIN | TRUE |

*Note: `AllowedRoles` should be comma-separated values (e.g., "HR,ADMIN") or "All".*

## 4. Sheet "Favorites"
Stores user preferences.
**Headers (Row 1):** `Email`, `FavoriteAppIDs`

| Email | FavoriteAppIDs |
|---|---|
| admin@tbsgroup.vn | ["app_salary", "app_recruitment"] |
