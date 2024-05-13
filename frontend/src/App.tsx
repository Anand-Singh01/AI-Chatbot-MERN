import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import "./App.css";
import Header from "./components/Header";
import { checkAuthStatus } from "./helpers/api-communicator";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import { currentUserAtom, isLoggedInAtom } from "./store/atoms/atom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const setCurrentUserAtom = useSetRecoilState(currentUserAtom);

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setCurrentUserAtom({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, [setCurrentUserAtom, setIsLoggedIn]);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={ isLoggedIn ? <Chat /> : <Navigate to={'/login'} replace/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
