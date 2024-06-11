import { Link } from "react-router-dom";

interface BlogcardFields {
  id: string;
  title: string;
  content: string;
  authorName: string;
}

const BlogCard = ({ id, title, content, authorName }: BlogcardFields) => {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="p-4 rounded-md border-2 border-zinc-20000 w-full flex flex-col gap-2">
          <h2 className="font-semibold text-xl text-slate-900">{title}</h2>
          <p className="text-sm text-slate-400">Blog by {authorName}</p>
          <p className="text-sm text-slate-600">
            {content.slice(0, 180) + "..."}
          </p>
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            Read more &#8594;
          </span>
        </div>
      </Link>
    </>
  );
};
export default BlogCard;
