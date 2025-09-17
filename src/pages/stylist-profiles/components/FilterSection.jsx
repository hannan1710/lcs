import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSection = ({ 
  selectedSpecialty, 
  onSpecialtyChange, 
  selectedExperience, 
  onExperienceChange,
  onClearFilters,
  activeFiltersCount 
}) => {
  const specialties = [
    { value: 'all', label: 'All Specialties', icon: 'Scissors' },
    { value: 'hair', label: 'Hair Services', icon: 'Scissors' },
    { value: 'nail', label: 'Nail Services', icon: 'Heart' },
    { value: 'facial', label: 'Facial Services', icon: 'Sparkles' }
  ];

  const experienceLevels = [
    { value: 'all', label: 'All Experience' },
    { value: '5', label: '5+ Years' },
    { value: '10', label: '10+ Years' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-luxury p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Find Your Perfect Stylist
        </h2>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
            iconName="X"
            iconPosition="left"
          >
            Clear Filters ({activeFiltersCount})
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Specialties Filter */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Specialties</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {specialties?.map((specialty) => (
              <button
                key={specialty?.value}
                onClick={() => onSpecialtyChange(specialty?.value)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-luxury text-left ${
                  selectedSpecialty === specialty?.value
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-background text-foreground border-border hover:border-accent/50 hover:bg-accent/5'
                }`}
              >
                <Icon 
                  name={specialty?.icon} 
                  size={16} 
                  className={selectedSpecialty === specialty?.value ? 'text-accent-foreground' : 'text-accent'}
                />
                <span className="text-sm font-medium">{specialty?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Experience Level</h3>
          <div className="flex flex-wrap gap-3">
            {experienceLevels?.map((level) => (
              <button
                key={level?.value}
                onClick={() => onExperienceChange(level?.value)}
                className={`px-4 py-2 rounded-full border transition-luxury ${
                  selectedExperience === level?.value
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-background text-foreground border-border hover:border-accent/50 hover:bg-accent/5'
                }`}
              >
                <span className="text-sm font-medium">{level?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <p className="text-2xl font-heading font-semibold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Expert Stylists</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Icon name="Award" size={20} className="text-accent" />
            </div>
            <p className="text-2xl font-heading font-semibold text-foreground">25+</p>
            <p className="text-sm text-muted-foreground">Certifications</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Icon name="Star" size={20} className="text-accent" />
            </div>
            <p className="text-2xl font-heading font-semibold text-foreground">4.9</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
            <p className="text-2xl font-heading font-semibold text-foreground">150+</p>
            <p className="text-sm text-muted-foreground">Years Combined</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;