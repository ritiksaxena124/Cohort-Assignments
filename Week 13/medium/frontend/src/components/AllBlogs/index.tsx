import BlogCard from "../BlogCard/index.js";
import useBlogs from "../../custom-hooks/useBlogs.ts";

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

  // Show loading screen until the blogs are fetched
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-3xl text-center">Loading... </h1>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-80 w-4/5 mx-auto max-w-2xl gap-5 flex flex-col my-24">
        <h1 className="text-2xl font-semibold">All Blogs</h1>

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
    </>
  );
};

export default AllBlogs;
