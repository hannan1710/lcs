import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ category }) => {
  return (
   <nav className="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/homepage" 
        className="hover:text-accent transition-luxury"
      >
        Home
      </Link>
      <span className="inline-flex items-center justify-center w-4 h-4">
        <Icon name="ChevronRight" size={14} />
      </span>
      <Link 
        to="/services-catalog" 
        className="hover:text-accent transition-luxury"
      >
        Services
      </Link>
      {category && (
        <>
          <span className="inline-flex items-center justify-center w-4 h-4">
        <Icon name="ChevronRight" size={14} />
      </span>
          <span className="text-foreground font-medium">{category}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;