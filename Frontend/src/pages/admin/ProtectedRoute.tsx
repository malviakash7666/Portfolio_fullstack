import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../../service/authService";

function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getMe(); // cookie check
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAuth) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;