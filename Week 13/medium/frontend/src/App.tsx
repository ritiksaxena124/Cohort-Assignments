import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AllBlogsPage from "./pages/AllBlogsPage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
import NewBlogPage from "./pages/NewBlogPage";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RecoilRoot>
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
            <Route path="/blog/new" element={<NewBlogPage />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
