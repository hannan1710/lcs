import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialConnect = () => {
  const socialPlatforms = [
    {
      name: 'Instagram',
      handle: '@lacoiffuresalon',
      followers: '8K',
      description: '              ',
      icon: 'Instagram',
      color: 'bg-pink-600',
      url: 'https://instagram.com/lacoiffuresalon'
    },
    {
      name: 'Facebook',
      handle: 'La Coiffure Salon NYC',
      followers: '8.2K',
      description: 'Client reviews & salon updates',
      icon: 'Facebook',
      color: 'bg-blue-600',
      url: 'https://facebook.com/lacoiffuresalonnyc'
    },
    {
      name: 'Youtube',
      handle: 'La Coiffure Salon',
      followers: '1K',
      description: 'Hair color & style inspiration boards',
      icon: 'Youtube',
      color: 'bg-red-400',
      url: 'https://youtube.com/imranlcs'
    }
  ];

  const recentPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
      caption: 'Stunning balayage transformation ✨',
      likes: 234,
      platform: 'Instagram'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?w=300&h=300&fit=crop',
      caption: 'Bridal hair perfection 💍',
      likes: 189,
      platform: 'Instagram'
    },
    {
      id: 3,
      image: 'https://images.pixabay.com/photo/2016/03/27/07/32/woman-1282314_1280.jpg?w=300&h=300&fit=crop',
      caption: 'Color correction magic ✨',
      likes: 156,
      platform: 'Instagram'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop',
      caption: 'Precision cut & style 💫',
      likes: 201,
      platform: 'Instagram'
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Social Platforms */}
      <div className="bg-card rounded-lg shadow-luxury border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
              Follow Our Journey
            </h2>
            <p className="text-muted-foreground">
              Stay connected for daily inspiration and exclusive content
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Icon name="Heart" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">42.2K Total Followers</span>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialPlatforms?.map((platform, index) => (
            <div
              key={index}
              onClick={() => handleSocialClick(platform?.url)}
              className="group p-4 border border-border rounded-lg hover:border-accent/50 hover:shadow-luxury-hover transition-luxury cursor-pointer"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 ${platform?.color} rounded-full flex items-center justify-center`}>
                  <Icon name={platform?.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm group-hover:text-accent transition-luxury">
                    {platform?.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">{platform?.followers} followers</p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-xs mb-2">{platform?.handle}</p>
              <p className="text-foreground text-sm">{platform?.description}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-accent text-xs font-medium">Follow</span>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground group-hover:text-accent transition-luxury" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Posts Gallery */}
      <div className="bg-card rounded-lg shadow-luxury border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
              Recent Work
            </h2>
            <p className="text-muted-foreground">
              See our latest transformations and styling inspiration
            </p>
          </div>
          <button
            onClick={() => handleSocialClick('https://instagram.com/lacoiffuresalon')}
            className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-luxury"
          >
            <span className="text-sm font-medium">View All</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentPosts?.map((post) => (
            <div
              key={post?.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleSocialClick('https://instagram.com/lacoiffuresalon')}
            >
              <Image
                src={post?.image}
                alt={post?.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-luxury-slow"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-luxury flex items-end">
                <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-luxury">
                  <p className="text-sm font-medium mb-1">{post?.caption}</p>
                  <div className="flex items-center space-x-2">
                    <Icon name="Heart" size={14} />
                    <span className="text-xs">{post?.likes}</span>
                    <span className="text-xs opacity-75">• {post?.platform}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social CTA */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Share Your La Coiffure Experience
            </h3>
            <p className="text-muted-foreground mb-4">
              Tag us in your posts for a chance to be featured!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                #LaCoiffureSalon
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                #LaCoiffureNYC
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                #HairGoals
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialConnect;