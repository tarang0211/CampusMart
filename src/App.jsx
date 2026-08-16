import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";

// Layout
import { RootLayout } from "./layouts/RootLayout";

// Pages
import { HomePage } from "./pages/HomePage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { SellItemPage } from "./pages/SellItemPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MyListingsPage } from "./pages/MyListingsPage";
import { WishlistPage } from "./pages/WishlistPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProfileCompletionPage } from "./pages/ProfileCompletionPage";

import ScrollToTop from "./components/ScrollToTop";

// Protected Route
import { ProtectedRoute } from "./components/ProtectedRoute";

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <ProductProvider>
              <BrowserRouter>
                <ScrollToTop />

                <Routes>
                  <Route
                    path="/"
                    element={<RootLayout />}
                  >
                    {/* PUBLIC ROUTES */}

                    <Route
                      index
                      element={<HomePage />}
                    />

                    <Route
                      path="product/:id"
                      element={<ProductDetailsPage />}
                    />

                    <Route
                      path="login"
                      element={<LoginPage />}
                    />

                    <Route
                      path="register"
                      element={<RegisterPage />}
                    />

                    <Route
                      path="complete-profile"
                      element={<ProfileCompletionPage />}
                    />

                    {/* PROTECTED ROUTES */}

                    <Route element={<ProtectedRoute />}>
                      <Route
                        path="sell"
                        element={<SellItemPage />}
                      />

                      <Route
                        path="my-listings"
                        element={<MyListingsPage />}
                      />

                      <Route
                        path="wishlist"
                        element={<WishlistPage />}
                      />

                      <Route
                        path="profile"
                        element={<ProfilePage />}
                      />
                    </Route>

                    {/* FALLBACK */}

                    <Route
                      path="*"
                      element={<HomePage />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ProductProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;