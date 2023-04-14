import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { navlinks } from "@/config";
import Link from "next/link";
import { BsFillMoonStarsFill, BsSearch, BsSun } from "react-icons/bs";

const Leftbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative w-[100px] sm:w-[300px] hidden ss:block">
      <div className="fixed flex flex-col items-center sm:items-start h-full">
        <div className="sm:flex hidden items-center">
          <div className="relative h-[50px] w-[50px]">
            <Image
              className="absolute p-0 m-0"
              alt="Logo"
              src="/logo.png"
              style={{
                objectFit: "cover",
              }}
              fill
              sizes="100vw"
            />
          </div>
          <h1 className="text-3xl font-graphikBold">
            NEXUS<span className="text-blue-500">X</span>
          </h1>
        </div>
        <Image className="sm:hidden" src="/logo.png" height="50" width="50" />
        <div className="flex items-center gap-3 sm:mt-5">
          <div className="relative h-[25px] w-[25px] sm:h-[50px] sm:w-[50px] rounded-full">
            <Image
              className="rounded-full"
              src="/profile.jpg"
              style={{
                objectFit: "cover",
              }}
              fill
              sizes="100vw"
              alt="Profile image"
            />
          </div>
          <div className="sm:flex hidden  flex-col">
            <span className="font-robotoBold text-lg">Enoch Chirima</span>
            <span className="font-robotoLight">@iamenochchirima</span>
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
        <hr />
        <div className="py-5 text-2xl">
          {theme === "light" ? (
            <BsFillMoonStarsFill onClick={() => setTheme("dark")} />
          ) : (
            <BsSun onClick={() => setTheme("light")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
