import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './assets/styles.css';

export function Profile() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/auth/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/cart/items', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          const totalItems = data?.cart?.products.reduce((acc, item) => acc + item.quantity, 0) || 0;
          setCartCount(totalItems);
        } else {
          console.error('Failed to fetch cart count');
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, []);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <Header cartCount={cartCount} username={user.username} />
      <div className="profile-container">
        <div className="profile-card">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" className="profile-picture" />
        <h2>{user.username}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Cart Items:</strong> {cartCount}</p>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

