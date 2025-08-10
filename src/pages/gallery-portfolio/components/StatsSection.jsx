import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: "Scissors",
      number: "2,500+",
      label: "Transformations",
      description: "Beautiful makeovers completed"
    },
    {
      id: 2,
      icon: "Users",
      number: "1,200+",
      label: "Happy Clients",
      description: "Satisfied customers served"
    },
    {
      id: 3,
      icon: "Award",
      number: "15+",
      label: "Awards Won",
      description: "Industry recognitions"
    },
    {
      id: 4,
      icon: "Star",
      number: "4.9",
      label: "Average Rating",
      description: "Based on client reviews"
    }
  ];

  return (
    <div className="bg-muted/50 py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
            Our Portfolio in Numbers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every transformation tells a story of expertise, creativity, and dedication to beauty excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats?.map((stat) => (
            <div
              key={stat?.id}
              className="text-center group"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:bg-accent/20 transition-luxury">
                <Icon 
                  name={stat?.icon} 
                  size={24} 
                  className="text-accent lg:w-8 lg:h-8" 
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
                  {stat?.number}
                </h3>
                <p className="font-medium text-foreground text-sm lg:text-base">
                  {stat?.label}
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {stat?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;