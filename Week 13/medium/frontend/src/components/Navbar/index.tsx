import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="min-w-80 w-full mx-auto px-8 md:px-16 flex py-6 items-center justify-between border-b-2">
        <Link to="/">
          <img
            width={136}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Medium_%28website%29_logo.svg/2560px-Medium_%28website%29_logo.svg.png"
          />
        </Link>

        <Link to="/signin">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Signin
          </button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
