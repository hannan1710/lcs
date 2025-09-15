# Admin System Guide - Branch-Based Access Control

## 🎯 Overview
The La Coiffure Salon admin system now supports hierarchical access control where super admins can create and manage other admins with specific branch access permissions.

## 👥 Admin Roles

### **Super Admin**
- **Access**: All branches (Powai + Thane)
- **Permissions**: 
  - Create, edit, and delete other admins
  - Assign branch access to admins
  - Access all system features
  - Manage branch assignments
- **Default Credentials**: `superadmin` / `admin`

### **Branch Admin**
- **Access**: Only assigned branches
- **Permissions**:
  - View and manage data for assigned branches only
  - Cannot create or manage other admins
  - Limited to their branch operations
- **Credentials**: Created by super admin

## 🚀 Getting Started

### **1. First Login (Super Admin)**
1. Navigate to `/admin`
2. Login with super admin credentials:
   - **Username**: `superadmin`
   - **Password**: `admin`
3. You'll have access to all branches and admin management

### **2. Creating Branch Admins**
1. Go to **Admin** tab in the admin panel
2. Click **"Add Admin"** button
3. Fill in admin details:
   - Username (unique identifier)
   - Email address
   - Password
   - Role (Admin or Super Admin)
   - **Branch Access** (select specific branches)
   - Active status
4. Click **"Add Admin"** to save

### **3. Managing Existing Admins**
- **Edit**: Click edit button to modify admin details and branch access
- **Activate/Deactivate**: Toggle admin status
- **Delete**: Remove admin (cannot delete super admins)

## 🏢 Branch Management

### **Available Branches**
- **Powai Branch**: Galleria Mall, Powai (+917400068615)
- **Thane Branch**: Anand Nagar, Thane (+919967002481)

### **Branch Access Control**
- Each admin can be assigned to specific branches
- Super admins can access all branches
- Branch admins only see data for their assigned branches
- Branch switching is automatic based on permissions

## 🔐 Security Features

### **Authentication**
- Username-based login system
- Password protection (demo mode accepts any password)
- Admin status validation (inactive admins cannot login)
- Session management with localStorage

### **Data Isolation**
- Branch-specific data filtering
- API-level access control
- Frontend permission validation
- Secure admin data storage

### **Permission System**
- Role-based access control
- Branch-specific permissions
- Super admin override capabilities
- Granular access management

## 📊 Admin Management Interface

### **Admin List View**
- **Admin Info**: Username, email, role
- **Branch Access**: Visual indicators showing assigned branches
- **Status**: Active/Inactive status
- **Actions**: Edit, activate/deactivate, delete

### **Add/Edit Admin Form**
- **Basic Info**: Username, email, password
- **Role Selection**: Admin or Super Admin
- **Branch Assignment**: Checkbox selection for each branch
- **Status Control**: Active/inactive toggle

## 🎨 User Interface Features

### **Branch Selector**
- Shows current branch with color coding
- Dropdown to switch between accessible branches
- Only visible when admin has access to multiple branches
- Real-time data updates when switching

### **Visual Indicators**
- **Branch Colors**: Each branch has a unique color
- **Role Badges**: Super Admin vs Admin indicators
- **Status Indicators**: Active/Inactive status badges
- **Permission Icons**: Visual cues for access levels

## 🔧 Technical Implementation

### **Data Storage**
```javascript
// Admin data structure
{
  id: 1,
  username: 'admin_name',
  email: 'admin@example.com',
  role: 'admin', // or 'super_admin'
  branches: ['powai', 'thane'], // assigned branches
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z'
}
```

### **Branch Context**
```javascript
const { 
  currentBranch, 
  adminBranches, 
  canAccessBranch,
  isSuperAdmin 
} = useBranch();
```

### **API Integration**
```javascript
// Load data filtered by current branch
const appointments = await appointmentsAPI.getAll(currentBranch);
const analytics = await analyticsAPI.getDashboardStats(currentBranch);
```

## 📋 Usage Scenarios

### **Scenario 1: Multi-Branch Salon**
- **Super Admin**: Manages both Powai and Thane branches
- **Powai Manager**: Only manages Powai branch data
- **Thane Manager**: Only manages Thane branch data

### **Scenario 2: Single Branch Management**
- **Branch Admin**: Assigned only to Powai branch
- **Access**: Only Powai appointments, analytics, and data
- **UI**: Branch selector shows current branch only

### **Scenario 3: Admin Hierarchy**
- **Super Admin**: Creates and manages all other admins
- **Senior Admin**: Manages specific branch admins
- **Branch Admin**: Manages only their assigned branch

## 🚨 Troubleshooting

### **Common Issues**

#### **"No Branch Selector Visible"**
- **Cause**: Admin only has access to one branch
- **Solution**: Super admin needs to assign additional branches

#### **"Cannot Access Admin Management"**
- **Cause**: User is not a super admin
- **Solution**: Login with super admin credentials

#### **"Branch Data Not Updating"**
- **Cause**: Branch context not properly initialized
- **Solution**: Refresh page or re-login

#### **"Admin Cannot Login"**
- **Cause**: Admin is inactive or doesn't exist
- **Solution**: Check admin status in Admin Management

### **Debug Steps**
1. Check localStorage for admin data
2. Verify branch assignments
3. Check admin active status
4. Validate role permissions

## 🔄 Workflow Examples

### **Creating a New Branch Admin**
1. Super admin logs in
2. Goes to Admin tab
3. Clicks "Add Admin"
4. Fills in details
5. Selects specific branches (e.g., only Powai)
6. Saves admin
7. New admin can login with assigned branch access

### **Modifying Branch Access**
1. Super admin goes to Admin Management
2. Finds admin to modify
3. Clicks edit button
4. Changes branch assignments
5. Saves changes
6. Admin's access is immediately updated

### **Branch Data Management**
1. Admin logs in
2. System loads their assigned branches
3. Admin selects branch from dropdown
4. All data filters to selected branch
5. Admin manages branch-specific operations

## 📈 Future Enhancements

- [ ] Password hashing and encryption
- [ ] Two-factor authentication
- [ ] Audit logs for admin actions
- [ ] Advanced permission granularity
- [ ] Email notifications for admin changes
- [ ] Bulk admin operations
- [ ] Admin activity monitoring
- [ ] Role-based feature access

This system provides a robust foundation for managing multi-branch salon operations with proper access control and data isolation.

