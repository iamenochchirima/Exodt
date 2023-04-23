import { useState, useEffect } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setAuthState,
  setCloseLoginViewState,
  setIsLogedIn,
  setOpenPasswordReset,
} from "@/redux/slices/authSlice";
import { useTheme } from "next-themes";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import { useSelector } from "react-redux";

const Login = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const body = {
    email: formData.email,
    password: formData.password,
  };

  const handleForgotPassword = () => {
    dispatch(setOpenPasswordReset());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        await login(body)
          .unwrap()
          .then((payload) => {
            setFormData(initialFormData);
            dispatch(setAuthState());
            dispatch(setIsLogedIn());
            dispatch(setCloseLoginViewState());
            router.push("/");
          });
      } catch (err) {
        console.error("Failed to login: ", err);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed z-20 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div
            className={`${
              theme === "light" ? `bg-white` : `bg-gray-600`
            }  w-full px-6 py-2 rounded-2xl max-w-md space-y-8`}
          >
            <div className="flex justify-end">
              <Link className="justify-end" href="/">
                <GrClose className="text-2xl mt-2" />
              </Link>
            </div>
            <div>
              <Image
                className="mx-auto w-auto"
                src={"/logo.png"}
                alt="Mordern minds logo"
                height="100"
                width="100"
              ></Image>
              <h2
                className={`${
                  theme === "light" ? `text-gray-900` : `text-white`
                } mt-6 text-center text-3xl font-bold tracking-tight`}
              >
                Sign in to your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    autoComplete="email"
                    required
                    className={` ${
                      theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                    } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="flex items-center mb-5 border rounded">
                    <input
                      id="password"
                      name="password"
                      type={open ? "text" : "password"}
                      value={password}
                      onChange={onChange}
                      required
                      className={` ${
                        theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                      } w-full  px-3 py-2 border-none placeholder-gray-500 outline-none sm:text-sm`}
                      placeholder="Password"
                      autoComplete="password"
                    />
                    {open ? (
                      <AiOutlineEye
                        onClick={() => setOpen(false)}
                        className="mr-2 text-xl"
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => setOpen(true)}
                        className="mr-2 text-xl"
                      />
                    )}
                  </div>
                </div>
                {error &&
                  error.data.err.message ===
                    "Request failed with status code 401" && (
                    <div className="text-red-500 mt-2">
                      Incorrect email or password
                    </div>
                  )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    className={` ${
                      theme === "light" ? `text-indigo-600` : `text-blue-300`
                    } font-medium hover:text-indigo-500`}
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                {isLoading ? (
                  <div className="flex justify-center my-5">
                    <ThreeDots
                      height="50"
                      width="50"
                      radius="9"
                      color="#black"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className={` ${
                      theme === "light"
                        ? ` hover:bg-white hover:text-black hover:border-black`
                        : `hover:bg-gray-800`
                    } group relative flex w-full justify-center border border-transparent bg-blue-500 rounded-full py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>
            <div className="">
              <p className="text-center">
                Do not have an account?{" "}
                <span
                  className={` ${
                    theme === "light" ? `text-indigo-600` : `text-blue-300`
                  } font-medium hover:text-indigo-500`}
                >
                  <Link href="/signup">Create an account</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
