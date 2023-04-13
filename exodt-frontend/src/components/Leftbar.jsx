import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { navlinks } from "@/config";
import Link from "next/link";

const Leftbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative w-[100px] sm:w-[300px] hidden ss:block">
      <div className="absolute flex flex-col items-center sm:items-start h-full">
        <div className="sm:flex hidden gap-2 items-center">
          <Image className="" src="/logo.png" height="50" width="50" />
          <h1 className="text-3xl font-graphikBold">
            EX<span className="text-blue-500">ODT</span>
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
              alt="Article cover image"
            />
          </div>
          <div className="sm:flex hidden  flex-col">
            <span className="font-robotoBold text-lg">Enoch Chirima</span>
            <span className="font-robotoLight">@iamenochchirima</span>
          </div>
        </div>
        <div className="sm:mt-3 ">
          {navlinks?.map((item) => (
            <Link key={item.id} href={item.url}>
              <div className="flex gap-3 pt-3 items-center">
                <span className="text-2xl">{item.icon}</span>
                <span className="sm:flex hidden text-lg">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <span>Leftbar</span>
        <div className="">The current theme is: {theme}</div>
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      </div>
    </div>
  );
};

export default Leftbar;
