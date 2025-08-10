import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ category }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/homepage" 
        className="hover:text-accent transition-luxury"
      >
        Home
      </Link>
      <Icon name="ChevronRight" size={16} />
      <Link 
        to="/services-catalog" 
        className="hover:text-accent transition-luxury"
      >
        Services
      </Link>
      {category && (
        <>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground font-medium">{category}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;