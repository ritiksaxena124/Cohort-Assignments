import { useState } from "react";
import { BlogInput } from "@developer-crex/common-validation";
import axios from "axios";
import { Server_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [blogContent, setBlogContent] = useState<BlogInput>({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  async function publishBlogHandler() {
    const res = await axios.post(`${Server_URL}/api/v1/blog`, blogContent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    navigate(`/blog/${res.data.blogId}`);
  }

  return (
    <>
      <div className="min-w-80 w-4/5 mx-auto max-w-2xl gap-5 flex flex-col my-24">
        <textarea
          placeholder="Title"
          onChange={(e) =>
            setBlogContent({
              ...blogContent,
              title: e.target.value,
            })
          }
          value={blogContent.title}
          className="outline-none text-pretty text-4xl font-semibold text-slate-900"
        />
        <textarea
          value={blogContent.content}
          onChange={(e) =>
            setBlogContent({
              ...blogContent,
              content: e.target.value,
            })
          }
          name="content-area"
          placeholder="Enter your content here..."
          className="outline-none py-4 min-h-96 resize-none text-slate-800"
        ></textarea>

        {blogContent.content.trim() == "" || blogContent.title.trim() == "" ? (
          <button
            type="button"
            className="text-white bg-slate-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled
          >
            Publish
          </button>
        ) : (
          <>
            <button
              type="button"
              className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5`}
              onClick={publishBlogHandler}
            >
              Publish
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default NewBlog;
