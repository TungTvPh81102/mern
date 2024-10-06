import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./app/admin/pages/DashboardPage";
import { ThemeProvider } from "./components/theme-provider";
import PageNotFound from "./components/common/PageNotFound";
import ListCategory from "./app/admin/pages/category/ListCategory";
import CreateCategory from "./app/admin/pages/category/CreateCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
import ListBrand from "./app/admin/pages/brand/ListBrand";
import CreateBrand from "./app/admin/pages/brand/CreateBrand";

import SignInPage from "./components/auth/SignInPage";
import SignUpPage from "./components/auth/SignUpPage";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import ForgotPassword from "./components/auth/ForgotPassword";
import { Toaster } from "react-hot-toast";
import PrivateRouter from "./components/auth/PrivateRouter";
import OAuthCallback from "./components/auth/OAuthCallback ";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="/manager/*" element={<PrivateRouter />}>
            <Route element={<LayoutAdmin />}>
              <Route index element={<DashboardPage />} />
              <Route path="categories" element={<ListCategory />} />
              <Route path="categories/create" element={<CreateCategory />} />
              <Route path="categories/edit/:id" element={<CreateCategory />} />
              <Route path="brands/*" element={<ListBrand />} />
              <Route path="brands/create" element={<CreateBrand />} />
            </Route>
          </Route>
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/auth/oauth" element={<OAuthCallback />} />
          <Route path="/forgot-password/*" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
