import Sidebar from "../../components/layouts/Sidebar";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";

const Layout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";
  return (
    <div className="h-screen dark:bg-grayDarker grid grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar />
      <main className="ml-5 mr-6 mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
