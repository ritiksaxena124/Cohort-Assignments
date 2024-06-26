import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Server_URL } from "../../config";
import { BlogInput } from "@developer-crex/common-validation";

const SingleBlog = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogInput>({
    title: "",
    content: "",
  });

  useEffect(() => {
    async function getBlogDetails() {
      const response = await axios.get(`${Server_URL}/api/v1/blog/${id}`);

      setBlog(response.data.blog);
      console.log(response.data.blog);

      setLoading(false);
    }

    getBlogDetails();
  }, [id]);

  // Show loading screen until the blog data is fetched
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
        <h1 className="text-3xl font-extrabold">{blog.title}</h1>
        {/* <p className="text-lg font-medium mb-6 text-slate-500">
          Published by {blog.author?.firstName + " " + blog.author?.lastName}
        </p> */}
        <p>{blog.content}</p>
      </div>
    </>
  );
};

export default SingleBlog;
