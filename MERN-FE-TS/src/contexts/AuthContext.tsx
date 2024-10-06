import { TUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "@/api";

export interface AuthContextType {
  user: TUser | null;
  login: (token: string, user: TUser) => void;
  logout: () => void;
  isAdmin?: boolean;
  googleLogin: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUser(user);
    }
  }, []);

  const login = (token: string, user: TUser) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.role === "admin" ? "/manager" : "/");
  };

  const googleLogin = async () => {
    try {
      const { data } = await api.get("/auth/oauth");
      window.location.href = data.url;
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.error("Google login error:", error);
    }
  };

  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const accessToken = localStorage.getItem("accessToken");
        try {
          if (accessToken) {
            await api.post("/auth/signOut");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser(null);
            toast.success("Đăng xuất thành công");
            nav("/sign-in");
          }
        } catch (error) {
          console.error("Đăng xuất không thành công:", error);
          toast.error("Đăng xuất không thành công");
        }
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === "admin",
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
