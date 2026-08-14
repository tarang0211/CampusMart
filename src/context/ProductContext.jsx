import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

const API_URL = "http://localhost:5000/api/items";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  // =========================
  // FILTER STATES
  // =========================

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedHostel, setSelectedHostel] = useState("All Hostels");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState("newest");

  // =========================
  // CLEAR PRODUCTS
  // =========================

  const clearProducts = () => {
    setProducts([]);
  };

  // =========================
  // FORMAT BACKEND ITEM
  // =========================

  const formatProduct = (item) => {
    return {
      id: item._id,

      title: item.title || "",

      description: item.description || "",

      price: Number(item.price) || 0,

      originalPrice: Number(item.originalPrice) || 0,

      category: item.category || "Other",

      condition: item.condition || "Used",

      hostel: item.hostel || "All Hostels",

      contactNumber: item.contactNumber || "",

      postedTime: item.createdAt || new Date().toISOString(),

      isSold: item.isSold || false,

      featured: item.featured || false,

      images:
        item.images && item.images.length > 0
          ? item.images
          : [
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800",
            ],

      seller: item.user
        ? {
            id: item.user._id,

            name: item.user.name || "Unknown Seller",

            email: item.user.email || "",

            phone: item.user.phone || item.contactNumber || "",

            hostel: item.user.hostel || item.hostel || "",
          }
        : {
            id: "",
            name: "Unknown Seller",
            email: "",
            phone: item.contactNumber || "",
            hostel: item.hostel || "",
          },
    };
  };

  // =========================
  // GET ALL ITEMS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch items");
      }

      const formattedProducts = data.map(formatProduct);

      setProducts(formattedProducts);

      console.log("Products fetched from MongoDB:", formattedProducts);

      return formattedProducts;
    } catch (error) {
      console.error("Error fetching products:", error);

      return [];
    }
  };

  // =========================
  // FETCH PRODUCTS ON APP LOAD
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user) {
      setProducts([]);
    }
  }, [user]);
  // =========================
  // GET MY ITEMS
  // =========================

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("BitMart_token");

      if (!token) {
        throw new Error("Please login first");
      }

      const response = await fetch(`${API_URL}/my-items`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch your items");
      }

      const formattedProducts = data.map(formatProduct);

      setProducts(formattedProducts);

      console.log("My products:", formattedProducts);

      return formattedProducts;
    } catch (error) {
      console.error("Error fetching my products:", error);

      throw error;
    }
  };

  // =========================
  // ADD PRODUCT
  // =========================

  const addProduct = async (newProductData, currentUser) => {
    try {
      const token = localStorage.getItem("BitMart_token");

      if (!token) {
        throw new Error("You must be logged in to sell an item.");
      }

      const data = new FormData();

      data.append("title", newProductData.title);

      data.append("description", newProductData.description);

      data.append("price", newProductData.price);

      data.append("originalPrice", newProductData.originalPrice || 0);

      data.append("category", newProductData.category);

      data.append("condition", newProductData.condition);

      data.append("hostel", newProductData.hostel || "");

      data.append("contactNumber", newProductData.contactNumber || "");

      if (newProductData.images && newProductData.images.length > 0) {
        newProductData.images.forEach((file) => {
          data.append("images", file);
        });
      }

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create item");
      }

      const newProduct = formatProduct(result);

      setProducts((prev) => [newProduct, ...prev]);

      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);

      throw error;
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("BitMart_token");

      if (!token) {
        throw new Error("You must be logged in.");
      }

      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete item");
      }

      setProducts((prev) => prev.filter((product) => product.id !== productId));

      return true;
    } catch (error) {
      console.error("Error deleting product:", error);

      throw error;
    }
  };

  // =========================
  // UPDATE PRODUCT
  // =========================

  const editProduct = async (productId, updatedFields) => {
    try {
      const token = localStorage.getItem("BitMart_token");

      if (!token) {
        throw new Error("You must be logged in.");
      }

      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(updatedFields),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update item");
      }

      const updatedProduct = formatProduct(data);

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? updatedProduct : product,
        ),
      );

      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);

      throw error;
    }
  };

  // =========================
  // MARK AS SOLD
  // =========================

  const markAsSold = async (productId) => {
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    try {
      await editProduct(productId, {
        isSold: !product.isSold,
      });
    } catch (error) {
      console.error("Error marking item as sold:", error);

      throw error;
    }
  };

  // =========================
  // RESET FILTERS
  // =========================

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedHostel("All Hostels");
    setSelectedCondition("all");
    setPriceRange(10000);
    setSortBy("newest");
  };

  // =========================
  // FILTER + SORT
  // =========================

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          searchQuery === "" ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" ||
          product.category.toLowerCase().replace(/s$/, "") ===
            selectedCategory.toLowerCase().replace(/s$/, "");

        const matchesHostel =
          selectedHostel === "All Hostels" || product.hostel === selectedHostel;

        const matchesCondition =
          selectedCondition === "all" ||
          product.condition === selectedCondition;

        const matchesPrice = product.price <= priceRange;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesHostel &&
          matchesCondition &&
          matchesPrice
        );
      })

      .sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }

        if (sortBy === "price-high") {
          return b.price - a.price;
        }

        return new Date(b.postedTime) - new Date(a.postedTime);
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedHostel,
    selectedCondition,
    priceRange,
    sortBy,
  ]);

  // =========================
  // CONTEXT
  // =========================

  return (
    <ProductContext.Provider
      value={{
        products,

        filteredProducts,

        searchQuery,
        setSearchQuery,

        selectedCategory,
        setSelectedCategory,

        selectedHostel,
        setSelectedHostel,

        selectedCondition,
        setSelectedCondition,

        priceRange,
        setPriceRange,

        sortBy,
        setSortBy,

        resetFilters,

        fetchProducts,
        fetchMyProducts,
        clearProducts,

        addProduct,

        markAsSold,
        deleteProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================

export const useProducts = () => useContext(ProductContext);
