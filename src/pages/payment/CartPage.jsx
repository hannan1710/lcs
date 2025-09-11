import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }
    const handler = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(Array.isArray(saved) ? saved : []);
      } catch {}
    };
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, []);

  const updateQty = (id, delta) => {
    setCart(prev => {
      const updated = prev
        .map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
        .filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const checkout = () => {
    const bookingData = {
      selectedServices: cart.map(i => ({ name: i.name, price: i.price, duration: i.quantity + ' pcs' })),
      selectedStylist: { name: 'Online Purchase' },
      selectedDate: new Date().toISOString().split('T')[0],
      selectedTime: '',
      formData: { firstName: 'Guest', lastName: 'Customer' }
    };
    navigate('/payment', { state: { bookingData, productCheckout: true } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-6">Your Cart</h1>
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">Your cart is empty.</p>
              <Button onClick={() => navigate('/products')}>Browse Products</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="xs" variant="outline" onClick={() => updateQty(item.id, -1)}>-</Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button size="xs" variant="outline" onClick={() => updateQty(item.id, 1)}>+</Button>
                      <Button size="xs" variant="outline" className="text-error border-error" onClick={() => removeItem(item.id)}>
                        <Icon name="Trash" size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-lg p-6 h-fit">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <Button fullWidth onClick={checkout} className="mt-4">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;











