import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Loading from "./components/Loading";
import { checkAuthStatus } from "./helpers/api-communicator";
import Chat from "./pages/Chat";
import { Login } from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Signup } from "./pages/Signup";
import { currentUserAtom, isLoggedInAtom } from "./store/atom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const setCurrentUserAtom = useSetRecoilState(currentUserAtom);
  const currentPath = window.location.pathname;
  
  useEffect(() => {
    if (currentPath === "/chat") {
      checkStatus();
    } else {
      setIsLoading(false);
    }

    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setCurrentUserAtom({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentPath, setCurrentUserAtom, setIsLoggedIn]); // Remove chat from dependencies

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/chat"
        element={isLoggedIn ? <Chat /> : <Navigate to={"/login"} replace />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
