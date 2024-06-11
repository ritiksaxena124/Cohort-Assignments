import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AllBlogsPage from "./pages/AllBlogsPage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-5xl">Hello World!</h1>
              </div>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/blogs" element={<AllBlogsPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
