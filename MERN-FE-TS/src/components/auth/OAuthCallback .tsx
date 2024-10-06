import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(location.search);
      const accessToken = queryParams.get("token");
      const user = queryParams.get("user");

      if (!accessToken) {
        toast.error("Authorization code is missing");
        return;
      }

      try {
        const userInfo = user ? JSON.parse(decodeURIComponent(user)) : null;

        if (accessToken) {
          contextLogin(accessToken, userInfo);
          toast.success("Login successful");
          navigate("/manager");
        } else {
          toast.error("Authorization code is missing");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during Google login");
      }
    };

    handleCallback();
  }, [contextLogin, navigate]);

  return (
    <div>
      <p>Processing...</p>
    </div>
  );
}
