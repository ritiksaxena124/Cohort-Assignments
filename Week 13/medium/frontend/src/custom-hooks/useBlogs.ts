import { useState, useEffect } from "react";
import { Server_URL } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const response = await axios.get(`${Server_URL}/api/v1/blog/all`);
      setLoading(false);
      setBlogs(response.data.allBlogs);
      toast.success("Blogs fetched successfully", {
        position: "bottom-right",
      });
    }

    getBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};

export default useBlogs;
