import { getTokenFromUrl } from "../components/auth.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = getTokenFromUrl();
    const token = hash.access_token;

    if (token) {
      localStorage.setItem("spotifyAccessToken", token);
      navigate("/dashboard");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default CallbackPage;
