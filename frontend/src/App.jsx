import "./App.css";
import { useAuthContex } from "./context/AuthContext";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import SignUp from "./Pages/signup/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { authUser } = useAuthContex()
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to= {"/login"} />}/>
        <Route path="/login" element={ authUser ? <Navigate to="/"/> : <Login />}/>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
