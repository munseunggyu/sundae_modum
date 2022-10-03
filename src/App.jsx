import { Route, Routes } from "react-router-dom";
import DMPage from "./components/DM";
import HomePage from "./components/Home";
import SNSLoginPage from "./components/SNSLogin";
import PostPage from "./components/Post";
import RegisterPage from "./components/Register";
import EmailLoginPage from "./components/EmailLogin";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomePage /> } />
      <Route path="/post" element={<PostPage /> } />
      <Route path="/dm" element={<DMPage /> } />
      <Route path="/snslogin" element={<SNSLoginPage /> } />
      <Route path="/register" element={<RegisterPage/> } />
      <Route path="/emaillogin" element={<EmailLoginPage /> } />
    </Routes>
  );
}

export default App;
