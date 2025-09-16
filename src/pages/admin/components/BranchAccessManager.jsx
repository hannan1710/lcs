import React, { useState } from 'react';
import { useBranch } from '../../../contexts/BranchContext';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BranchAccessManager = () => {
  const { 
    branches, 
    adminBranches, 
    setAdminBranches, 
    setCurrentBranch,
    isSuperAdmin 
  } = useBranch();
  const [showManager, setShowManager] = useState(false);

  const handleAddBranchAccess = (branchId) => {
    if (!adminBranches.includes(branchId)) {
      const newBranches = [...adminBranches, branchId];
      setAdminBranches(newBranches);
      
      // Update localStorage
      const admin = JSON.parse(localStorage.getItem('admin') || '{}');
      const updatedAdmin = { ...admin, branches: newBranches };
      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      
      // Set as current branch if it's the first one
      if (adminBranches.length === 0) {
        setCurrentBranch(branchId);
      }
    }
  };

  const handleRemoveBranchAccess = (branchId) => {
    if (adminBranches.length > 1) { // Don't remove if it's the only branch
      const newBranches = adminBranches.filter(id => id !== branchId);
      setAdminBranches(newBranches);
      
      // Update localStorage
      const admin = JSON.parse(localStorage.getItem('admin') || '{}');
      const updatedAdmin = { ...admin, branches: newBranches };
      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      
      // Switch to first available branch if current was removed
      if (adminBranches[0] === branchId && newBranches.length > 0) {
        setCurrentBranch(newBranches[0]);
      }
    }
  };

  if (!isSuperAdmin()) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowManager(!showManager)}
        className="flex items-center space-x-2"
      >
        <Icon name="Settings" size={14} />
        <span>Manage Branches</span>
      </Button>

      {showManager && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowManager(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-luxury z-20">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Branch Access</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowManager(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <div className="space-y-3">
                {branches.map((branch) => (
                  <div key={branch.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: branch.color }}
                      />
                      <Icon name={branch.icon} size={16} />
                      <div>
                        <div className="font-medium text-foreground">{branch.name}</div>
                        <div className="text-xs text-muted-foreground">{branch.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {adminBranches.includes(branch.id) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveBranchAccess(branch.id)}
                          disabled={adminBranches.length <= 1}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddBranchAccess(branch.id)}
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <Icon name="Info" size={12} className="inline mr-1" />
                  You have access to {adminBranches.length} of {branches.length} branches
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BranchAccessManager;



