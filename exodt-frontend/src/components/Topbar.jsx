import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { topTab, latestTab, localTab } from "@/redux/slices/appSlice";

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
          <div className="flex w-full justify-between">
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
        <>
          <button
            className={`${
              theme === "dark" ? `bg-gray-600` : `bg-teal-100`
            } text-center   p-2 rounded-full  w-full`}
          >
            Search
          </button>
        </>
      )}
    </>
  );
};

export default Topbar;
