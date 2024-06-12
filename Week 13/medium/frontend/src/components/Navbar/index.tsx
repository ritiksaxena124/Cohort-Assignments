import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authAtom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  const [isAuth, setIsAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  const res = localStorage.getItem("token");
  if (res) {
    setIsAuth(true);
  } else {
    setIsAuth(false);
  }

  function handleLogout() {
    // Implement logout logic here
    setIsAuth(false);
    navigate("/signin");
    localStorage.removeItem("token");
    toast.success("Logout successfull!", {
      position: "bottom-right"
    })
  }

  function handleSignin() {
    navigate("/signin");
  }

  return (
    <>
      <div className="min-w-80 w-full mx-auto px-8 md:px-16 flex py-6 items-center justify-between border-b-2">
        <Link to="/">
          <img
            width={136}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Medium_%28website%29_logo.svg/2560px-Medium_%28website%29_logo.svg.png"
          />
        </Link>
        {isAuth ? (
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleSignin}
          >
            Signin
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
