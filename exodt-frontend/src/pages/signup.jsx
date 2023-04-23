import { useEffect, useState } from "react";
import {
  useSignupMutation,
} from "@/redux/api/generalApi";
import { ThreeDots } from "react-loader-spinner";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useTheme } from "next-themes";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [reOpen, setReOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const [register, { isLoading, isSuccess, isError: isRegisterError, error }] =
    useSignupMutation();
  const [focused, setFocused] = useState({
    first_name: false,
    last_name: false,
    email: false,
    username: false,
    password: false,
    re_password: false,
  });

  const handleFocused = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    re_password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const { first_name, last_name, email, username, password, re_password } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const body = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    username: formData.username,
    password: formData.password,
    re_password: formData.re_password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        if (body.password !== body.re_password) {
          alert("Password mismatch");
        }

        await register(body)
          .unwrap()
          .then((payload) => {
            console.log("fulfilled", payload);
            setFormData(initialFormData);
          });
      } catch (err) {
        console.error("Failed to register: ", err);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <>
        <div className="fixed z-20 inset-0 overflow-y-scroll bg-black bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className={`${
                theme === "light" ? `bg-white  text-teal-800` : `bg-gray-600`
              }  w-full px-6 py-2 rounded-2xl max-w-md space-y-8`}>
              <div className="flex justify-end">
                <Link className="justify-end" href="/">
                  <GrClose className="text-2xl mt-2" />
                </Link>
              </div>
              <div className="">
                <Image
                  className="mx-auto w-auto"
                  src={"/logo.png"}
                  alt="Mordern minds logo"
                  height="100"
                  width="100"
                ></Image>
                <p className="text-center text-lg mb-10">
                  Account have been successfully created, now check your emails
                  we have sent a link to verify your email and activate you
                  account, come back when you are done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="fixed z-20 inset-0 overflow-y-scroll bg-black bg-opacity-50">
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
                  Create your account
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-3">
                      <label htmlFor="first_name" className="sr-only">
                        First name
                      </label>
                      <input
                        name="first_name"
                        type="text"
                        autoComplete="first_name"
                        value={first_name}
                        onChange={onChange}
                        focused={focused.first_name.toString()}
                        onBlur={() => handleFocused("first_name")}
                        required
                        className={` ${
                          theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                        } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        placeholder="First name"
                      />
                      <span className="error-message ">
                        First name is required
                      </span>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="first_name" className="sr-only">
                        Last name
                      </label>
                      <input
                        name="last_name"
                        type="text"
                        autoComplete="last name"
                        value={last_name}
                        onChange={onChange}
                        focused={focused.last_name.toString()}
                        onBlur={() => handleFocused("last_name")}
                        required
                        className={` ${
                          theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                        } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        placeholder="Last name"
                      />
                      <span className="error-message ">
                        Last name is required
                      </span>
                    </div>
                  </div>
                  <div className="">
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
                      focused={focused.email.toString()}
                      onBlur={() => handleFocused("email")}
                      required
                      className={` ${
                        theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                      } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      placeholder="Enter email"
                    />
                    <span className="error-message ">Invalid email</span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      name="username"
                      type="text"
                      value={username}
                      onChange={onChange}
                      focused={focused.last_name.toString()}
                      onBlur={() => handleFocused("username")}
                      required
                      className={` ${
                        theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                      } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      placeholder="Username"
                    />
                    <span className="error-message ">
                      Username name is required and should be unique
                    </span>
                  </div>
                  <div className="mb-5">
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
                  <div className="">
                    <div className="flex border items-center rounded">
                      <input
                        id="re_password"
                        name="re_password"
                        type={reOpen ? "text" : "password"}
                        value={re_password}
                        onChange={onChange}
                        required
                        className={` ${
                          theme === "light" ? ` text-gray-900` : ` bg-gray-600`
                        } w-full  px-3 py-2 border-none placeholder-gray-500 outline-none sm:text-sm`}
                        placeholder="Confirm password"
                      />
                      <div className=""></div>
                      {reOpen ? (
                        <AiOutlineEye
                          onClick={() => setReOpen(false)}
                          className="mr-2 text-xl"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={() => setReOpen(true)}
                          className="mr-2 text-xl"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <Link
                    onClick={() => dispatch(setCloseRegisterViewState())}
                    className="underline"
                    href="/policy"
                  >
                    privacy policy
                  </Link>{" "}
                  .
                </p>

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
                      Signup
                    </button>
                  )}
                  {isRegisterError && error.status === 400 && (
                    <div className="bg-green-200 text-green-800 py-2 px-4 rounded-md text-center">
                      An account with the same email already exist
                    </div>
                  )}
                </div>
              </form>
              <div className="">
                <p className="text-center">
                  Already have an account?{" "}
                  <span
                    className={` ${
                      theme === "light" ? `text-indigo-600` : `text-blue-300`
                    } font-medium hover:text-indigo-500`}
                  >
                    <Link href="/login">Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Signup;
