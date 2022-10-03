import { Route, Routes } from "react-router-dom";
import DMPage from "./components/DM";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import PostPage from "./components/Post";
import RegisterPage from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage /> } />
      <Route path="/post" element={<PostPage /> } />
      <Route path="/dm" element={<DMPage /> } />
      <Route path="/login" element={<LoginPage /> } />
      <Route path="/register" element={<RegisterPage/> } />
    </Routes>
  );
}

export default App;
