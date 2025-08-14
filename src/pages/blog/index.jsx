import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Blog = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Summer Hair Care Tips for Healthy Locks',
      excerpt: 'Discover the best practices for maintaining healthy hair during the summer months.',
      content: 'Summer can be harsh on your hair with increased sun exposure, humidity, and chlorine from swimming pools. Here are some essential tips to keep your hair healthy and beautiful all summer long...',
      author: 'Emma Rodriguez',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      publishDate: '2024-01-10',
      category: 'hair-care',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Latest Hair Color Trends for 2024',
      excerpt: 'Explore the hottest hair color trends that will dominate this year.',
      content: '2024 brings exciting new color trends that combine classic techniques with modern innovation. From warm caramel tones to cool platinum finishes, discover what\'s trending...',
      author: 'David Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      publishDate: '2024-01-08',
      category: 'trends',
      image: 'https://images.pixabay.com/photos/2016/03/26/22/13/woman-1281826_960_720.jpg',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'How to Choose the Right Haircut for Your Face Shape',
      excerpt: 'Learn the secrets to finding the perfect haircut that complements your unique features.',
      content: 'Choosing the right haircut starts with understanding your face shape. Whether you have a round, oval, square, or heart-shaped face, there are specific styles that will enhance your natural beauty...',
      author: 'Sophia Martinez',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      publishDate: '2024-01-05',
      category: 'styling',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop',
      readTime: '6 min read'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: blogPosts.length },
    { id: 'hair-care', label: 'Hair Care', count: 1 },
    { id: 'trends', label: 'Trends', count: 1 },
    { id: 'styling', label: 'Styling', count: 1 }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="FileText" size={24} className="text-accent" />
              </div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
                La Coiffure Blog
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover expert tips, latest trends, and professional insights from our team of hair care specialists. 
              Stay updated with the latest in hair styling, care, and beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-luxury">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-heading font-semibold text-foreground mb-3 hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={post.authorAvatar} 
                            alt={post.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(post.publishDate)}</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <span className="text-foreground">{category.label}</span>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest hair care tips and trends delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <Button className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Recent Posts</h3>
                  <div className="space-y-3">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-start space-x-3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground line-clamp-2 hover:text-accent transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(post.publishDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

