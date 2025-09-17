import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with undefined default value for better HMR compatibility
const BranchContext = createContext(undefined);

// Custom hook to use the branch context
export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

export const BranchProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [adminBranches, setAdminBranches] = useState([]); // Branches this admin can access

  // Default branches
  const defaultBranches = [
    {
      id: 'powai',
      name: 'Powai Branch',
      location: 'Powai (Galleria)',
      address: 'Galleria Mall, Powai, Mumbai',
      phone: '+917400068615',
      whatsapp: '+917400068615',
      manager: 'Sarah Johnson',
      email: 'powai@lacoiffure.com',
      status: 'active',
      color: '#FACC15', // Amber
      icon: 'MapPin'
    },
    {
      id: 'thane',
      name: 'Thane Branch',
      location: 'Thane (Anand Nagar)',
      address: 'Anand Nagar, Thane, Mumbai',
      phone: '+919967002481',
      whatsapp: '+919967002481',
      manager: 'Michael Chen',
      email: 'thane@lacoiffure.com',
      status: 'active',
      color: '#EC4899', // Pink
      icon: 'MapPin'
    }
  ];

  // Load branches from localStorage on mount
  useEffect(() => {
    const loadBranches = () => {
      try {
        const savedBranches = localStorage.getItem('salon_branches_data');
        if (savedBranches) {
          const branchesData = JSON.parse(savedBranches);
          setBranches(branchesData);
        } else {
          setBranches(defaultBranches);
          localStorage.setItem('salon_branches_data', JSON.stringify(defaultBranches));
        }
      } catch (error) {
        console.error('Error loading branches data:', error);
        setBranches(defaultBranches);
      }
    };

    loadBranches();
  }, []);

  // Save branches to localStorage whenever it changes
  useEffect(() => {
    if (branches.length > 0) {
      localStorage.setItem('salon_branches_data', JSON.stringify(branches));
    }
  }, [branches]);

  // Load current branch and admin branches from localStorage
  useEffect(() => {
    const loadAdminData = () => {
      try {
        const admin = localStorage.getItem('admin');
        if (admin) {
          const adminData = JSON.parse(admin);
          const adminBranches = adminData.branches || ['powai']; // Default to powai if no branches specified
          setAdminBranches(adminBranches);
          
          // Set current branch to first available branch
          if (adminBranches.length > 0) {
            setCurrentBranch(adminBranches[0]);
          }
        }
      } catch (error) {
        console.error('Error loading admin branch data:', error);
        setAdminBranches(['powai']);
        setCurrentBranch('powai');
      }
    };

    loadAdminData();
  }, []);

  const addBranch = (branch) => {
    const newBranch = {
      ...branch,
      id: branch.name.toLowerCase().replace(/\s/g, '-'),
      createdAt: new Date().toISOString()
    };
    setBranches(prev => [...prev, newBranch]);
    return newBranch;
  };

  const updateBranch = (id, updates) => {
    setBranches(prev =>
      prev.map(branch =>
        branch.id === id
          ? { ...branch, ...updates, updatedAt: new Date().toISOString() }
          : branch
      )
    );
  };

  const deleteBranch = (id) => {
    // Prevent deleting default branches
    if (defaultBranches.some(branch => branch.id === id)) {
      console.warn(`Cannot delete default branch: ${id}`);
      return;
    }
    setBranches(prev => prev.filter(branch => branch.id !== id));
  };

  const switchBranch = (branchId) => {
    if (adminBranches.includes(branchId)) {
      setCurrentBranch(branchId);
      localStorage.setItem('currentBranch', branchId);
    } else {
      console.warn(`Admin does not have access to branch: ${branchId}`);
    }
  };

  const getCurrentBranchData = () => {
    return branches.find(branch => branch.id === currentBranch) || branches[0];
  };

  const getBranchesForSelect = () => {
    return branches
      .filter(branch => adminBranches.includes(branch.id))
      .map(branch => ({
        value: branch.id,
        label: branch.name,
        location: branch.location,
        color: branch.color,
        icon: branch.icon
      }));
  };

  const canAccessBranch = (branchId) => {
    return adminBranches.includes(branchId);
  };

  const isSuperAdmin = () => {
    return adminBranches.length === branches.length;
  };

  const value = {
    branches,
    currentBranch,
    adminBranches,
    addBranch,
    updateBranch,
    deleteBranch,
    switchBranch,
    getCurrentBranchData,
    getBranchesForSelect,
    canAccessBranch,
    isSuperAdmin,
    setCurrentBranch,
    setAdminBranches
  };

  return (
    <BranchContext.Provider value={value}>
      {children}
    </BranchContext.Provider>
  );
};

// Add display name for better debugging and HMR
BranchProvider.displayName = 'BranchProvider';




