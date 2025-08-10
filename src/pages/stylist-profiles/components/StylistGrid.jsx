import React from 'react';
import StylistCard from './StylistCard';

const StylistGrid = ({ stylists, onViewDetails, onBookAppointment, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg shadow-luxury overflow-hidden animate-pulse">
            <div className="h-64 lg:h-80 bg-muted" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-6 bg-muted rounded w-16" />
                <div className="h-6 bg-muted rounded w-20" />
                <div className="h-6 bg-muted rounded w-18" />
              </div>
              <div className="h-16 bg-muted rounded" />
              <div className="flex gap-3">
                <div className="h-10 bg-muted rounded flex-1" />
                <div className="h-10 bg-muted rounded flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stylists?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
          No Stylists Found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any stylists matching your current filters. Try adjusting your search criteria or browse all our talented professionals.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stylists?.map((stylist) => (
        <StylistCard
          key={stylist?.id}
          stylist={stylist}
          onViewDetails={onViewDetails}
          onBookAppointment={onBookAppointment}
        />
      ))}
    </div>
  );
};

export default StylistGrid;