import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylistDetailModal = ({ stylist, isOpen, onClose, onBookAppointment }) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(0);

  if (!isOpen || !stylist) return null;

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageCircle' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-lg shadow-luxury-hover max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={stylist?.image}
                alt={stylist?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                {stylist?.name}
              </h2>
              <p className="text-accent font-medium">{stylist?.title}</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={`${
                        i < Math.floor(stylist?.rating)
                          ? 'text-accent fill-current' :'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {stylist?.rating} ({stylist?.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-luxury ${
                activeTab === tab?.id
                  ? 'text-accent border-b-2 border-accent' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'portfolio' && (
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">Portfolio Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {stylist?.portfolio?.map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedPortfolioImage(index)}
                  >
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      className="w-full h-full object-cover transition-luxury group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-luxury" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                        {item?.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Featured Work */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2">Featured Work</h4>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={stylist?.portfolio?.[selectedPortfolioImage]?.image}
                    alt={stylist?.portfolio?.[selectedPortfolioImage]?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {stylist?.portfolio?.[selectedPortfolioImage]?.description}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-semibold mb-3">About {stylist?.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{stylist?.fullBio}</p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {stylist?.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Certifications & Awards</h4>
                <div className="space-y-2">
                  {stylist?.certifications?.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Award" size={16} className="text-accent" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Education</h4>
                <div className="space-y-2">
                  {stylist?.education?.map((edu, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="GraduationCap" size={16} className="text-accent" />
                      <span className="text-sm">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold">Client Reviews</h3>
              {stylist?.reviews?.map((review, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-accent-foreground text-sm font-medium">
                          {review?.clientName?.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-sm">{review?.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={`${
                            i < review?.rating
                              ? 'text-accent fill-current' :'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review?.comment}</p>
                  <p className="text-xs text-muted-foreground">{review?.date}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold">Availability This Week</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stylist?.availability?.map((day, index) => (
                  <div key={index} className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{day?.day}</span>
                      <span className="text-sm text-muted-foreground">{day?.date}</span>
                    </div>
                    {day?.slots?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {day?.slots?.map((slot, slotIndex) => (
                          <span
                            key={slotIndex}
                            className="px-2 py-1 bg-success/10 text-success text-xs rounded"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No availability</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="font-heading text-xl font-semibold text-accent">
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border hover:bg-muted"
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => onBookAppointment(stylist)}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              iconName="Calendar"
              iconPosition="left"
            >
              Book with {stylist?.name?.split(' ')?.[0]}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistDetailModal;