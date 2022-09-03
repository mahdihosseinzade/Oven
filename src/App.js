import "./App.css";
import SignInRouter from "./Routers/SignInRouter/SignInRouter";
import HomeRouter from "./Routers/HomeRouter/HomeRouter";
import ProfileRouter from "./Routers/ProfileRouter/ProfileRouter";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useUser } from "./components/hooks/useUser";
import CartempRouter from "./Routers/CartempRouter/CartempRouter";
import MyOrdersRouter from "./Routers/MyOrdersRouter/MyOrdersRouter";

function App() {
  const { user } = useUser();

  if (user.auth == null) {
    return <div></div>;
  }

  return (
    <div className="App" dir="rtl">
      <ToastContainer autoClose={5000} rtl={true} />
      <Routes>
        {user.auth && (
          <>
            <Route path="/home" element={<HomeRouter />} />
            <Route path="/profile" element={<ProfileRouter />} />
            <Route path="/cartemp" element={<CartempRouter />} />
            <Route path="/myorders" element={<MyOrdersRouter />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        )}
        {!user.auth && (
          <>
            <Route path="/signin" element={<SignInRouter />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
