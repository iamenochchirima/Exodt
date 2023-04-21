import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { navlinks } from "@/config";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import {
  setLogoutState,
  setAuthState,
} from "@/redux/slices/authSlice";
import {
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useLogoutMutation,
} from "@/redux/api/authApi";

const Leftbar = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const {
    isAuthenticated,
    isLogedIn,
    resetPasswordRequest,
  } = useSelector((state) => state.auth);
  const { data, isSuccess, error } = useLoadUserQuery();
  const [fetchUser, { data: lazyData, isSuccess: success, error: lazyError }] =
    useLazyLoadUserQuery();

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
    }
  }, [isLogedIn, success, lazyData, data, isSuccess]);

  console.log(userInfo)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative w-[100px] sm:w-[300px] hidden ss:block">
      <div className="fixed flex flex-col p-2  h-full items-center sm:items-start" style={{width: "inherit"}}>
        <div className="sm:flex hidden items-center">
          <div className="relative h-[50px] w-[50px]">
            <Image
              className=" p-0 m-0"
              src="/logo.png"
              style={{
                objectFit: "cover",
              }}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 95vw,
              90"
              alt="logo"
            />
          </div>
          <h1 className="text-3xl font-graphikBold">
            NEXUS<span className="text-blue-500">X</span>
          </h1>
        </div>
        <Image className="sm:hidden" src="/logo.png" height="50" width="50" alt="logo" />
        {isAuthenticated && <><div className="flex items-center gap-3 sm:mt-5">
          <div className="relative h-[25px] w-[25px] sm:h-[50px] sm:w-[50px] rounded-full">
            <Image
              className="rounded-full"
              src={userInfo?.profile_image}
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
          <div className="sm:flex hidden  flex-col">
            <span className="font-robotoBold text-lg">{`${userInfo?.first_name} ${" " }${userInfo?.last_name} `}</span>
            <span className="font-robotoLight">{userInfo?.username}</span>
          </div>
        </div>
        <div
          className={` ${
            theme === "dark" ? `` : `text-gray-800`
          } sm:mt-3 border-b pb-5 border-gray-500`}
        >
          {navlinks?.map((item) => (
            <Link key={item.id} href={item.url}>
              <div className="flex gap-3 pt-3 items-center">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`${
                    theme === "dark" ? `` : `text-gray-950`
                  } sm:flex hidden text-lg `}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        </>}
        <hr />
        <div className="py-5 text-2xl ">
          {theme === "light" ? (
            <button onClick={() => setTheme("dark")} className="flex gap-3 items-center">
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
            <button onClick={() => setTheme("light")} className="flex gap-3 items-center">
              <BsSun  />
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
