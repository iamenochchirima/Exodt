import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const Rightbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  return (
    <div className="relative w-full bg-slate-200">
      <div className="sticky top-0 ">
        {isAuthenticated && (
          <div className="">
            <h1 className="text-center ">Suggestions for you</h1>
          </div>
        )}
      <div className="">
        <div className={`${theme === "light" ? `text-gray-500` : ``} grid grid-cols-2 font-roboto text-sm`}>
          <Link className="col-span-1" href="/privacy">Privacy Policy</Link>
          <Link className="col-span-1" href="/privacy">Terms of use</Link>
          <Link className="col-span-1" href="/privacy">Cookie Policy</Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Rightbar;
