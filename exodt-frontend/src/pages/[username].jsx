import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useProfileInfoMutation } from "@/redux/api/generalApi";
import { AiOutlineEdit } from "react-icons/ai";
import { TbSettings } from "react-icons/tb";
import Image from "next/image";
import { useTheme } from "next-themes";
import UserPostsComp from "@/components/UserPostsComp";
import { openManageAcc, openEditProf, closeEditProf } from "@/redux/slices/appSlice";
import { useSelector } from "react-redux";
import EditProfile from "@/components/EditProfile";
import Link from "next/link";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const [postsComp, setUserPostsComp] = useState(true);
  const { username } = router.query || {};
  const { manageAccount, editProfile } = useSelector((state) => state.app);
  const [getProfileInfo, { data: profileInfo, isSuccess }] =
    useProfileInfoMutation();

  const handlePostsClicked = () => {
    setUserPostsComp(true);
  };

  const handleEditClicked = () => {
    dispatch(openEditProf())
  }

  useEffect(() => {
    if (username) {
      getProfileInfo(username);
    }
  }, [username]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div className="flex justify-end gap-2 pt-5">
        <button onClick={handleEditClicked} className="flex items-center px-2 py-1 rounded-full text-white bg-blue-500 gap-1">
          <AiOutlineEdit className="text-3xl rounded-full bg-white text-black p-1" />
          <span>Edit Profile</span>
        </button>
        {editProfile && <EditProfile userInfo={profileInfo} />}
        <Link href="/settings" className="flex items-center px-2 py-1 rounded-full text-white bg-blue-500 gap-1">
          <TbSettings className="text-3xl rounded-full bg-white text-black p-1" />
          <span>Settings</span>
        </Link>
      </div>
      <div className="flex items-center gap-10 w-full mt-10">
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
        <div className="">
          <h1 className="font-robotoBold text-lg">{`${
            profileInfo?.first_name
          } ${" "}${profileInfo?.last_name} `}</h1>
          <h3 className="">{`${"@"}${profileInfo?.username}`}</h3>
          <h2
            className={`${
              theme === "light" ? `text-gray-700` : `text-dimWhite`
            } `}
          >
            Data Scientist
          </h2>
          <div className="flex py-1 gap-2">
            <button className="bg-blue-500 px-4 py-1 rounded-full text-white">
              Follow
            </button>
            <button className="bg-blue-500 px-4 py-1 rounded-full text-white">
              Connect
            </button>
          </div>
          <div className="py-2 flex">
            <ul
              className={` ${
                theme === "light" ? ` border-gray-600` : `border-dimWhite`
              } px-2 border-dashed felx flex-col text-center border-l`}
            >
              <li className="font-robotoBold">10</li>
              <li>Followers</li>
            </ul>
            <ul
              className={` ${
                theme === "light" ? `border-gray-600` : `border-dimWhite`
              } px-2 border-dashed felx flex-col text-center border-l`}
            >
              <li className="font-robotoBold">5</li>
              <li>Following</li>
            </ul>
            <ul
              className={` ${
                theme === "light" ? `border-gray-600` : `border-dimWhite`
              } px-2 border-dashed felx flex-col text-center border-x`}
            >
              <li className="font-robotoBold">8</li>
              <li>Connections</li>
            </ul>
          </div>
        </div>
      </div>
      {profileInfo?.about && (
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
        <div className="mt-5">
          <h1 className="text-xl">Groups</h1>
        </div>
        {/* <div className="mt-5">
          <h1 className="text-xl">Communities</h1>
        </div> */}
      </div>
      <div className="mt-5">
        <div className="flex gap-2">
          <button onClick={handlePostsClicked} className="text-xl">
            Posts
          </button>
          {/* <button className="text-xl">Articles</button> */}
        </div>
        {postsComp && <UserPostsComp />}
      </div>
    </div>
  );
};

export default UserProfile;
