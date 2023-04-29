import CropEasy from "@/crop/CropEasy";
import { closeEditProf } from "@/redux/slices/appSlice";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { AiOutlineCheck } from "react-icons/ai";
import Image from "next/image";

const EditProfile = (props) => {
  const userInfo = props.userInfo;
  const [firstName, setFirstName] = useState(userInfo?.first_name);
  const [lastName, setLastName] = useState(userInfo?.last_name);
  const [country, setCountry] = useState(
    userInfo?.country === null ? "" : userInfo?.country
  );
  const [gender, setGender] = useState(
    userInfo?.gender === null ? "" : userInfo?.gender
  );
  const [about, setAbout] = useState(userInfo?.about);
  const [profileImage, setProfileImage] = useState(userInfo?.profile_image);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isProfileEdited, setIsProfileEdited] = useState(false);

  console.log(file, "file here");

  const [
    updateUserProfile,
    { isSuccess: isUpdateSuccess, isLoading, error, isError },
  ] = useUpdateUserMutation();

  useEffect(() => {
    console.log(error, "Error here");
  }, [isError, error]);

  const handleClose = () => {
    dispatch(closeEditProf());
  };

  const handleEditClick = () => {
    setOpenCrop(true);
  };

  const accountBody = {
    first_name: firstName,
    last_name: lastName,
  };

  const profileBody = {
    about: about,
    country: country,
    gender: gender,
  };
  const profileImageBody = {
    about: about,
    country: country,
    gender: gender,
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (profileBody) {
      try {
        await updateUserProfile(profileBody);
        console.log(profileBody);
        setIsProfileEdited(false);
      } catch (err) {
        console.error("Failed to update: ", err);
      }
    }
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    if (accountBody) {
      try {
        // await updateUserAccount(accountBody);
        console.log(accountBody);
        setIsNameEdited(false);
      } catch (err) {
        console.error("Failed to update: ", err);
      }
    }
  };

  const handleNameInputChange = () => {
    setIsNameEdited(true);
  };

  const handleProfileChange = () => {
    setIsProfileEdited(true);
  };

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div
            className={`${
              theme === "light" ? `bg-white` : `bg-gray-500`
            }  w-full px-6 py-2 rounded-2xl max-w-[800px] space-y-8`}
          >
            <div className="flex justify-end">
              <button className="justify-end" onClick={handleClose}>
                <MdOutlineClose
                  className={`${
                    theme === "light" ? `text-black` : `text-white`
                  } text-2xl  mt-2`}
                />
              </button>
            </div>
            <div className="flex justify-center">
              <Image
                className="rounded-full bg-slate-400"
                src={profileImage}
                alt="profile image"
                height={150}
                width={150}
                sizes="100vw"
              />
            </div>
            <div className="flex justify-center gap-3">
              <button
                className={`${
                  theme === "dark" ? `border-white` : `border-gray-700`
                } py-1 px-2 rounded-full border w-[130px]`}
                onClick={handleEditClick}
              >
                Add photo
              </button>
            </div>

            <hr />
            <form onSubmit={handleAccountUpdate} className="">
              <div className="flex gap-2 w-full items-center">
                <div className="flex flex-col w-full space-y-1">
                  <label className="text-sm font-bold" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className={`${
                      theme === "dark" ? `text-white` : `text-gray-900`
                    } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      handleNameInputChange();
                    }}
                  />
                </div>
                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm font-bold" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className={`${
                      theme === "dark" ? `text-white` : `text-gray-900`
                    } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                      handleNameInputChange();
                    }}
                  />
                </div>
              </div>
              {isNameEdited && (
                <div className="py-2">
                  <button
                    type="submit"
                    className="flex gap-2 items-center border border-gray-800 px-2 py-1 rounded-2xl"
                  >
                    <AiOutlineCheck size={20} />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>
            <hr />
            <form onSubmit={handleProfileUpdate} className="">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold" htmlFor="firstName">
                  About
                </label>
                <textarea
                  className={`${
                    theme === "dark" ? `text-white` : `text-gray-900`
                  } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  type="text"
                  id="about"
                  name="about"
                  value={about}
                  onChange={(event) => {
                    setAbout(event.target.value);
                    handleProfileChange();
                  }}
                />
              </div>
              {isProfileEdited && (
                <div className="py-2">
                  <button
                    type="submit"
                    className="flex gap-2 items-center border border-gray-800 px-2 py-1 rounded-2xl"
                  >
                    <AiOutlineCheck size={20} />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>
            <hr />
          </div>
        </div>
      </div>
      {openCrop && (
        <CropEasy {...{ photoURL, setOpenCrop, setFile, setPhotoURL }} />
      )}
    </>
  );
};

export default EditProfile;
