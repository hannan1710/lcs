import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { productsAPI } from '../../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await productsAPI.getAll().catch(() => []);
        const found = Array.isArray(all) ? all.find(p => String(p.id) === String(id)) : null;
        setProduct(found || null);
        if (!found) setError('Product not found');
      } catch (e) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length) return product.images;
    return product.image ? [product.image] : [];
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center py-16">
              <Icon name="Loader" size={48} className="animate-spin text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Loading product…</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-6">{error || 'Product not found'}</p>
              <Button variant="outline" onClick={() => navigate('/products')}>Back to Products</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <Image src={images[activeImageIdx]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border ${idx === activeImageIdx ? 'border-accent' : 'border-border'}`}
                    >
                      <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="mb-4">
                <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{product.category}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  {product.size && <span className="text-sm text-muted-foreground">{product.size}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-semibold text-foreground">${product.price?.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-muted-foreground line-through">${product.originalPrice?.toFixed(2)}</span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {Array.isArray(product.benefits) && product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((b, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">{b}</span>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">{ing}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Add to Cart</Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">Buy Now</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;















