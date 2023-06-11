import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { navlinks } from "@/config";
import Link from "next/link";
import { setLogoutState } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { setAuthState, setProfileInfo } from "@/redux/slices/authSlice";
import {
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useLogoutMutation,
} from "@/redux/api/authApi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

const Leftbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { isAuthenticated, isLogedIn } = useSelector((state) => state.auth);
  const { data, isSuccess, error } = useLoadUserQuery();
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();
  const [fetchUser, { data: lazyData, isSuccess: success, error: lazyError }] =
    useLazyLoadUserQuery();

  const handleLogout = () => {
    logout();
    dispatch(setLogoutState());
  };

  useEffect(() => {
    if (logoutSuccess) {
      router.push("/");
    }
  }, [logoutSuccess]);

  useEffect(() => {
    if (isLogedIn) {
      fetchUser();
    }
    if (success) {
      setUserInfo(lazyData.user);
      dispatch(setAuthState());
    }
    if (isSuccess) {
      setUserInfo(data.user);
      dispatch(setAuthState());
      dispatch(setProfileInfo(data?.user));
    }
  }, [isLogedIn, success, lazyData, data, isSuccess]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUserInfo(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative w-[100px] sm:w-[300px] hidden ss:block">
      <div
        className="fixed flex flex-col p-2  h-full items-center sm:items-start"
        style={{ width: "inherit" }}
      >
        <Link href="/">
          <div className="sm:flex hidden items-center">
            <Image
              src="/name.png"
              height={40}
              width={130}
              alt="name"
              sizes="100vw"
            />
          </div>
          <Image
            className="sm:hidden"
            src="/logo.png"
            height="50"
            width="50"
            alt="logo"
          />
        </Link>
        {isAuthenticated && (
          <>
            <button className="sm:hidden">
              <div className="relative h-[25px] w-[25px] sm:h-[40px] sm:w-[40px] rounded-full">
                <Image
                  className="rounded-full"
                  src={
                    userInfo?.profile_image
                      ? userInfo.profile_image
                      : `/profile.png`
                  }
                  style={{
                    objectFit: "cover",
                  }}
                  fill
                  sizes="100vw"
                  alt="profile image"
                />
              </div>
            </button>
            <Menu
              as="div"
              className="sm:inline-block hidden relative text-left"
            >
              <div>
                <Menu.Button className="">
                  <div className="flex items-center gap-3 sm:mt-5">
                    <div className="relative h-[25px] w-[25px] sm:h-[40px] sm:w-[40px] rounded-full">
                      <Image
                        className="rounded-full"
                        src={
                          userInfo?.profile_image
                            ? userInfo.profile_image
                            : `/profile.png`
                        }
                        style={{
                          objectFit: "cover",
                        }}
                        fill
                        sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 95vw,
                    90vw"
                        alt="profile image"
                      />
                    </div>
                    <div className="sm:flex hidden flex-col">
                      <h1 className="text-left font-robotoBold leading-normal  text-lg">{`${
                        userInfo?.first_name
                      } ${" "}${userInfo?.last_name} `}</h1>
                      <h1 className="font-robotoLight text-left leading-none">
                        {userInfo?.username}
                      </h1>
                    </div>
                    <MdOutlineArrowDropDown className="sm:block hidden text-3xl" />
                  </div>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={` ${
                    theme === "light" ? `bg-white` : `bg-gray-500`
                  } absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="py-1">
                    <Menu.Item>
                      <Link
                        href={`/${encodeURIComponent(userInfo?.username)}/`}
                        className={` ${
                          theme === "light"
                            ? `text-gray-800 hover:bg-gray-200`
                            : `text-white hover:bg-gray-700`
                        } block px-4 py-2 text-sm`}
                      >
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/settings"
                        className={` ${
                          theme === "light"
                            ? `text-gray-800 hover:bg-gray-200`
                            : `text-white hover:bg-gray-700`
                        } block px-4 py-2 text-sm`}
                      >
                        Settings
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className={` ${
                          theme === "light"
                            ? `text-gray-800 hover:bg-gray-200`
                            : `text-white hover:bg-gray-700`
                        } block px-4 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div
              className={` ${
                theme === "dark" ? `` : `text-gray-800`
              } sm:mt-3 border-b pb-5 border-gray-500`}
            >
              {navlinks?.map((item) => (
                <Link key={item.id} href={item.url}>
                  <div className="flex gap-3 pt-3 items-center">
                    <div className="text-2xl">{item.icon}</div>
                    <h1
                      className={`${
                        theme === "dark" ? `` : `text-gray-950`
                      } sm:flex hidden text-lg `}
                    >
                      {item.name}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
        <hr />
        <div className="py-5 text-2xl ">
          {theme === "light" ? (
            <button
              onClick={() => setTheme("dark")}
              className="flex gap-3 items-center"
            >
              <BsFillMoonStarsFill />
              <span
                className={`${
                  theme === "dark" ? `` : `text-gray-950`
                } sm:flex hidden text-lg `}
              >
                Theme
              </span>
            </button>
          ) : (
            <button
              onClick={() => setTheme("light")}
              className="flex gap-3 items-center"
            >
              <BsSun />
              <span
                className={`${
                  theme === "dark" ? `` : `text-gray-950`
                } sm:flex hidden text-lg `}
              >
                Theme
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
