import BlogCard from "../BlogCard/index.js";
import useBlogs from "../../custom-hooks/useBlogs.ts";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../store/atoms/authAtom.ts";
interface BlogInfo {
  id: string;
  title: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
}

const AllBlogs = () => {
  const { loading, blogs } = useBlogs();
  const navigate = useNavigate();
  const isAuth = useRecoilValue(authAtom);

  // Show loading screen until the blogs are fetched
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-3xl text-center">Loading... </h1>
      </div>
    );
  }

  function navigateHandler(link: string) {
    navigate(link);
  }

  return (
    <>
      {isAuth ? (
        <div className="min-w-80 w-4/5 mx-auto max-w-2xl gap-5 flex flex-col my-24">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold">All Blogs</h1>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => navigateHandler("/blog/new")}
            >
              Create
            </button>
          </div>

          {blogs.map((blog: BlogInfo) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={`${blog.author.firstName} `}
            />
          ))}
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <h1 className="text-3xl text-center">You are not signed in </h1>
        </div>
      )}
    </>
  );
};

export default AllBlogs;
