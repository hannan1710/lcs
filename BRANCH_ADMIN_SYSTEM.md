# Branch-Based Admin System

## Overview
The La Coiffure Salon admin panel now supports branch-based access control, allowing different administrators to manage specific branches or all branches based on their assigned permissions.

## Features

### 🔐 Branch-Based Access Control
- **Super Admin**: Can access all branches and manage branch assignments
- **Branch Admin**: Can only access assigned branches
- **Branch Selection**: Easy switching between accessible branches

### 🏢 Branch Management
- **Powai Branch**: Located at Galleria Mall, Powai
- **Thane Branch**: Located at Anand Nagar, Thane
- **Branch-Specific Data**: Appointments, analytics, and reports filtered by branch

### 📊 Branch-Specific Features
- **Appointments**: Filtered by selected branch
- **Analytics**: Revenue and statistics per branch
- **WhatsApp Integration**: Branch-specific notification numbers
- **Data Isolation**: Each branch admin only sees their branch data

## How to Use

### 1. Admin Login
1. Navigate to `/admin`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin`
3. Select branches you want to manage
4. Click "Sign In"

### 2. Branch Selection
- Use the branch selector in the admin header
- Switch between accessible branches
- View branch-specific data and analytics

### 3. Branch-Specific Data
- **Appointments**: Only shows appointments for selected branch
- **Analytics**: Revenue and stats filtered by branch
- **WhatsApp**: Notifications sent to branch-specific numbers

## Technical Implementation

### Branch Context
```javascript
const { 
  currentBranch, 
  getCurrentBranchData, 
  switchBranch,
  canAccessBranch 
} = useBranch();
```

### API Integration
```javascript
// Load appointments for specific branch
const appointments = await appointmentsAPI.getAll(currentBranch);

// Load analytics for specific branch
const stats = await analyticsAPI.getDashboardStats(currentBranch);
```

### Branch Configuration
```javascript
const branches = [
  {
    id: 'powai',
    name: 'Powai Branch',
    location: 'Powai (Galleria)',
    whatsapp: '+917400068615',
    // ... other properties
  },
  {
    id: 'thane', 
    name: 'Thane Branch',
    location: 'Thane (Anand Nagar)',
    whatsapp: '+919967002481',
    // ... other properties
  }
];
```

## Admin Roles

### Super Admin
- Access to all branches
- Can manage branch assignments
- Full system access
- Can create/delete branches

### Branch Admin
- Access to assigned branches only
- Branch-specific data and analytics
- Cannot access other branches
- Limited to their branch operations

## Security Features

- **Branch Isolation**: Data is filtered at API level
- **Permission Checks**: Frontend validates branch access
- **Secure Storage**: Admin permissions stored securely
- **Session Management**: Branch context maintained across sessions

## Future Enhancements

- [ ] Branch-specific settings
- [ ] Cross-branch reporting
- [ ] Branch performance comparison
- [ ] Advanced permission management
- [ ] Branch-specific notifications
- [ ] Multi-branch appointment scheduling

## Demo Credentials

### Super Admin
- Username: `admin`
- Password: `admin`
- Branches: All (Powai + Thane)

### Branch Admin (Powai)
- Username: `powai_admin`
- Password: `admin`
- Branches: Powai only

### Branch Admin (Thane)
- Username: `thane_admin`
- Password: `admin`
- Branches: Thane only

## API Endpoints

### Branch-Filtered Endpoints
- `GET /api/appointments?branch={branchId}`
- `GET /api/analytics/dashboard?branch={branchId}`
- `POST /api/whatsapp/test` (with branch parameter)

### Branch Management
- `GET /api/branches` - List all branches
- `POST /api/branches` - Create new branch
- `PUT /api/branches/{id}` - Update branch
- `DELETE /api/branches/{id}` - Delete branch

This system ensures that each branch operates independently while maintaining centralized management capabilities for super admins.




