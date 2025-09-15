import React, { useState } from 'react';
import { useBranch } from '../../../contexts/BranchContext';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BranchSelector = () => {
  const { 
    currentBranch, 
    getCurrentBranchData, 
    getBranchesForSelect, 
    switchBranch,
    isSuperAdmin 
  } = useBranch();
  const [isOpen, setIsOpen] = useState(false);

  const currentBranchData = getCurrentBranchData();
  const availableBranches = getBranchesForSelect();

  const handleBranchSwitch = (branchId) => {
    switchBranch(branchId);
    setIsOpen(false);
  };

  if (availableBranches.length <= 1) {
    // Show current branch info without selector if only one branch available
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg border border-border">
        <Icon name={currentBranchData?.icon || 'MapPin'} size={16} className="text-accent" />
        <span className="text-sm font-medium text-foreground">
          {currentBranchData?.name || 'Current Branch'}
        </span>
        {isSuperAdmin() && (
          <span className="text-xs text-muted-foreground">(All Branches)</span>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border-accent/20 text-accent hover:bg-accent/10"
      >
        <Icon name={currentBranchData?.icon || 'MapPin'} size={16} />
        <span className="text-sm font-medium">
          {currentBranchData?.name || 'Select Branch'}
        </span>
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-luxury z-20">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Available Branches
              </div>
              {availableBranches.map((branch) => (
                <button
                  key={branch.value}
                  onClick={() => handleBranchSwitch(branch.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-luxury ${
                    currentBranch === branch.value
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: branch.color }}
                  />
                  <Icon name={branch.icon} size={16} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{branch.label}</div>
                    <div className="text-xs text-muted-foreground">{branch.location}</div>
                  </div>
                  {currentBranch === branch.value && (
                    <Icon name="Check" size={16} className="text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BranchSelector;
