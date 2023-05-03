import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsArrowLeft, BsPerson } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const SettingsLeftBar = ({ setActiveTab }) => {
  const { profileInfo } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleAccountClicked = () => {
    setActiveTab("account")
  }
  const handlePrivacyClicked = () => {
    setActiveTab("privacy")
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mr-5">
      <div className="ss:hidden mt-3">
        <Link className="" href="/">
          <BsArrowLeft className="text-2xl " />
        </Link>
      </div>
      <div className="flex gap-2 py-3 items-center">
        <Image
          src={profileInfo.profile_image}
          className="mid:hidden rounded-full bg-black"
          height={35}
          width={35}
          alt="profile image"
        />
        <h1 className="text-xl font-robotoBold">Settings</h1>
      </div>
      <hr />
      <div className="flex flex-col gap-3 mt-3">
        <button
          onClick={handleAccountClicked}
          className={`${
            theme === "light" ? `hover:bg-gray-200` : `hover:bg-gray-700`
          } flex justify-between items-center p-2`}
        >
          <div className="flex gap-2 items-center">
            <BsPerson className="text-xl" />
            <h1>Account Information</h1>
          </div>
          <div>
            <AiOutlineRight size={18} />
          </div>
        </button>
        <button
          onClick={handlePrivacyClicked}
          className={`${
            theme === "light" ? `hover:bg-gray-200` : `hover:bg-gray-700`
          } flex justify-between items-center p-2`}
        >
          <div className="flex gap-2 items-center">
            <MdOutlinePrivacyTip className="text-xl" />
            <h1> Security and Privacy</h1>
          </div>
          <div>
            <AiOutlineRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingsLeftBar;
