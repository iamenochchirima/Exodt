import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsArrowLeft, BsPerson } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import AccountInfo from "./AccountInfo";
import Privacy from "./Privacy";

const SettingsLeftBar = ({ setActiveTab }) => {
  const { profileInfo } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [isLessMid, setIsMid] = useState(false);
  const [hideSection, setHideSection] = useState(false);
  const [account, setShowAccount] = useState(false);
  const [privacy, setShowPricacy] = useState(false);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1024) {
        setIsMid(true);
      } else {
        setIsMid(false);
      }
    }

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAccountClicked = () => {
    if (isLessMid) {
      setHideSection(true);
      setShowAccount(true);
    } else {
      setActiveTab("account");
    }
  };
  const handlePrivacyClicked = () => {
    if (isLessMid) {
      setHideSection(true);
      setShowPricacy(true);
    } else {
      setActiveTab("privacy");
    }
  };

  useEffect(() => {
    if (!isLessMid) {
      setHideSection(false);
      setShowAccount(false);
      setShowPricacy(false);
    }
  }, [isLessMid]);

  const handleCloseComp = () => {
    setShowAccount(false);
    setShowPricacy(false);
    setHideSection(false);
  };

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
        <h1
          className={`${
            theme === "light" ? `text-secondary` : `text-dimWhite`
          } text-xl font-robotoBold`}
        >
          Settings
        </h1>
      </div>
      <hr />
      {!hideSection && (
        <div className="flex flex-col gap-3 mt-3">
          <button
            onClick={handleAccountClicked}
            className={`${
              theme === "light" ? `hover:bg-gray-200` : `hover:bg-gray-700`
            } flex justify-between items-center p-2`}
          >
            <div className="flex gap-2 items-center">
              <BsPerson className="text-xl" />
              <h1
                className={`${
                  theme === "light" ? `text-secondary` : `text-dimWhite`
                }`}
              >
                Account Information
              </h1>
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
              <h1
                className={`${
                  theme === "light" ? `text-secondary` : `text-dimWhite`
                }`}
              >
                Security and Privacy
              </h1>
            </div>
            <div>
              <AiOutlineRight size={18} />
            </div>
          </button>
        </div>
      )}
      {hideSection && (
        <div className="mt-3">
          <button onClick={handleCloseComp} className="flex gap-1 mb-4 items-center">
            <BsArrowLeft size={20} />
            <h3
              className={`${theme === "light" ? `text-secondary` : `text-white`} font-robotoBold`}
            >
              Back
            </h3>
          </button>
          {account && <AccountInfo />}
          {privacy && <Privacy />}
        </div>
      )}
    </div>
  );
};

export default SettingsLeftBar;
