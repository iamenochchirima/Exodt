import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setLogoutState } from "@/redux/slices/authSlice";
import { useProfileInfoMutation } from "@/redux/api/generalApi";
import { AiOutlineEdit } from "react-icons/ai";
import { TbSettings } from "react-icons/tb";
import Image from "next/image";
import { useTheme } from "next-themes";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { username } = router.query || {};
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();
  const [getProfileInfo, { data: profileInfo, isSuccess }] =
    useProfileInfoMutation();

  const handleLogout = () => {
    logout();
    dispatch(setLogoutState());
  };

  useEffect(() => {
    if (username) {
      getProfileInfo(username);
    }
  }, [username]);

  useEffect(() => {
    if (logoutSuccess) {
      router.push("/");
    }
  }, [logoutSuccess]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div className="flex justify-end gap-2 pt-5">
        <button className="flex items-center px-2 py-1 rounded-full text-white bg-blue-500 gap-1">
          <AiOutlineEdit className="text-3xl rounded-full bg-white text-black p-1" />
          <span>Edit Profile</span>
        </button>
        <button className="flex items-center px-2 py-1 rounded-full text-white bg-blue-500 gap-1">
          <TbSettings className="text-3xl rounded-full bg-white text-black p-1" />
          <span>Manage account</span>
        </button>
      </div>
      <div className="flex gap-10 w-full mt-10">
        <Image
          className="rounded-full bg-slate-400"
          src={
            profileInfo?.profile_image
              ? profileInfo.profile_image
              : `/profile.png`
          }
          alt="profile image"
          height={150}
          width={150}
          sizes="100vw"
        />
        <div className="flex mt-5">
        <div className="">
          <h1 className="text-3xl">{`${profileInfo?.first_name} ${" "}${
            profileInfo?.last_name
          } `}</h1>
          <h3 className="py-1">{`${"@"}${profileInfo?.username}`}</h3>
          <h2
            className={`${
              theme === "light" ? `text-gray-700` : `text-dimWhite`
            } text-xl `}
          >
            Data Scientist
          </h2>
        </div>
      </div>
      </div>
      {profileInfo?.bio && (
      <div className="mt-10">
        <h1 className="text-xl">About</h1>
        <p className="my-5">
            Experienced software developer with expertise in full-stack
            development, cloud computing, and DevOps. Passionate about creating
            scalable and maintainable software solutions that meet the needs of
            end-users. Proficient in programming languages like Python,
            JavaScript, and Java.
          </p>
      </div>
        )}
      <div className="">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
