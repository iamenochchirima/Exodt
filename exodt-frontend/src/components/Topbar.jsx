import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { topTab, latestTab, localTab } from "@/redux/slices/appSlice";
import Link from "next/link";

const Topbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      {isAuthenticated && (
        <>
          <div className="hidden ss:flex w-full justify-between pt-5">
            <button className="text-center w-1/2 bg-blue-500 p-2 rounded-tl-lg text-white">
              Create post
            </button>
            <button
              className={`${
                theme === "dark" ? `bg-gray-600` : `bg-teal-100`
              } text-center   p-2 rounded-tr-xl  w-1/2`}
            >
              Search
            </button>
          </div>
          <div className="flex w-full justify-between">
            <button
              onClick={() => dispatch(topTab())}
              className="text-center w-1/3"
            >
              Top
            </button>
            <button
              onClick={() => dispatch(latestTab())}
              className="text-center w-1/3"
            >
              Latest
            </button>
            <button
              onClick={() => dispatch(localTab())}
              className="text-center w-1/3"
            >
              Local
            </button>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <div className="ss:pt-5">
          <button
            className={`${
              theme === "dark" ? `bg-gray-600` : `bg-teal-100`
            } text-center   p-2 rounded-full hidden ss:block w-full`}
          >
            Search
          </button>
          <div className="flex ss:my-5 gap-2">
            <Link href="/login" className="w-1/2 text-center rounded-full p-2 text-white bg-blue-500">Sign in</Link>
            <Link href="/signup" className="w-1/2 text-center rounded-full p-2 border">Sign up</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
