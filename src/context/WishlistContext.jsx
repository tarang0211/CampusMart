import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { useAuth } from './AuthContext';

const WishlistContext = createContext();

const API_URL = 'http://localhost:5000/api/wishlist';

export const WishlistProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET WISHLIST FROM BACKEND
  // =========================

  const fetchWishlist = async () => {
    try {
      const token =
        localStorage.getItem('campusmart_token');

      if (!token) {
        setWishlist([]);
        return;
      }

      setLoading(true);

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to fetch wishlist'
        );
      }

      const wishlistIds = (data.wishlist || []).map(
        (item) =>
          typeof item === 'string'
            ? item
            : item._id
      );

      setWishlist(wishlistIds);
    } catch (error) {
      console.error(
        'Error fetching wishlist:',
        error
      );

      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH ON LOGIN
  // =========================

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isLoggedIn]);

  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = async (productId) => {
    try {
      const token =
        localStorage.getItem('campusmart_token');

      if (!token) {
        throw new Error(
          'Please login to use Wishlist'
        );
      }

      const alreadyWishlisted =
        wishlist.includes(productId);

      const response = await fetch(
        `${API_URL}/${productId}`,
        {
          method: alreadyWishlisted
            ? 'DELETE'
            : 'POST',

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to update wishlist'
        );
      }

      const updatedWishlist =
        (data.wishlist || []).map(
          (item) =>
            typeof item === 'string'
              ? item
              : item._id
        );

      setWishlist(updatedWishlist);

    } catch (error) {
      console.error(
        'Error updating wishlist:',
        error
      );
    }
  };

  // =========================
  // CHECK WISHLIST
  // =========================

  const isWishlisted = (productId) => {
    return wishlist.includes(productId);
  };

  // =========================
  // CLEAR WISHLIST
  // =========================

  const clearWishlist = async () => {
    try {
      const token =
        localStorage.getItem('campusmart_token');

      if (!token) {
        return;
      }

      const currentWishlist = [...wishlist];

      for (const productId of currentWishlist) {
        await fetch(
          `${API_URL}/${productId}`,
          {
            method: 'DELETE',

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );
      }

      setWishlist([]);
    } catch (error) {
      console.error(
        'Error clearing wishlist:',
        error
      );
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================

export const useWishlist = () =>
  useContext(WishlistContext);