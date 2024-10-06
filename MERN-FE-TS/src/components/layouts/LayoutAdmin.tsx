import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

const LayoutAdmin = () => {
  //   const { userId, isLoaded } = useAuth();
  //   const navigate = useNavigate();
  //   React.useEffect(() => {
  //     if (isLoaded && !userId) {
  //       navigate("/sign-in");
  //     }
  //   }, [isLoaded]);

  //   if (!isLoaded) return "Loading...";
  const { user } = useAuth();

  if (!user || user?.role !== "admin") {
    return "Bạn không có quyền truy cập...";
  }
  return (
    <div className="h-screen dark:bg-grayDarker grid grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar />
      <main className="ml-5 mr-6 mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
