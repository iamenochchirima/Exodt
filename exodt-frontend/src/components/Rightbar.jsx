import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Image from "next/image";
import { USERS } from "@/config";

const Rightbar = () => {
  const [displayedUsers, setDisplayedUsers] = useState(USERS)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth >= 1200) { // Change the value to the breakpoint you want to use
        setDisplayedUsers(USERS)
      } else {
        const truncatedUsers = USERS.map(user => ({
          ...user,
          username: `${user.username.substring(0, 10)}...`
        }))
        setDisplayedUsers(truncatedUsers)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full ">
      <div className="sticky top-0">
        {!isAuthenticated && (
          <div className="">
            <h1 className="text-center ">Suggestions for you</h1>
            <div className="mt-5">
              <h1
                className={`${
                  theme === "light" ? `text-gray-600` : `text-dimWhite`
                }`}
              >
                Connections
              </h1>
              <ul>
                {displayedUsers.map((user) => (
                  <li
                    key={user.userId}
                    className="flex justify-between items-center"
                  >
                    <div className="py-3 flex gap-2 items-center">
                      <div className="relative h-[35px] w-[35px] rounded-full">
                        <Image
                          className="rounded-full"
                          src={user.avatar}
                          style={{
                            objectFit: "cover",
                          }}
                          fill
                          sizes="(max-width: 768px) 100vw"
                          alt="profile picture"
                        />
                      </div>
                      <h1 className="text-sm">
                        {user.username}
                      </h1>
                    </div>
                    <div className="">
                      <button className="bg-blue-500 text-white py-1 px-2 rounded-full ">
                        Connect
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="">
          <div
            className={`${
              theme === "light"
                ? `text-gray-500 bg-teal-100`
                : `bg-gray-600 text-dimWhite`
            } p-5 grid grid-cols-2 gap-2 font-roboto text-sm`}
          >
            <Link className="col-span-1" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="col-span-1" href="/privacy">
              Terms of use
            </Link>
            <Link className="col-span-1" href="/privacy">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
