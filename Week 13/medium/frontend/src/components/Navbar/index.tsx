import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="w-full px-6 py-6 border-b-2">
        <Link to="/">
          <img
            width={136}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Medium_%28website%29_logo.svg/2560px-Medium_%28website%29_logo.svg.png"
          />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
