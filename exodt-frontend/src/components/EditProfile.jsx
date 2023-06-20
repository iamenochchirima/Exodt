import CropEasy from "@/crop/CropEasy";
import { closeEditProf } from "@/redux/slices/appSlice";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  useUpdateUserProfileMutation,
  useUpdateUserAccountMutation,
} from "@/redux/api/authApi";
import { AiOutlineCheck } from "react-icons/ai";
import Image from "next/image";
import { toast } from "react-toastify";
import { useLazyGetCountriesQuery, useUpdateProfileImageMutation } from "@/redux/api/generalApi";

const EditProfile = (props) => {
  const userInfo = props.userInfo;
  const [firstName, setFirstName] = useState(userInfo?.first_name);
  const [lastName, setLastName] = useState(userInfo?.last_name);
  const [about, setAbout] = useState(userInfo?.about);
  const [profileImage, setProfileImage] = useState(userInfo?.profile_image);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isProfileEdited, setIsProfileEdited] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [profileChanged, setProfileChanged] = useState(false);
  const [country, setCountry] = useState(
    userInfo?.country === null ? "" : userInfo?.country
  );
  const [gender, setGender] = useState(
    userInfo?.gender === null ? "" : userInfo?.gender
  );
  const [getCountries, { data: lazyCountires }] = useLazyGetCountriesQuery();

  const [
    updateUserProfile,
    { isSuccess: isUpdateSuccess, isLoading, error, isError },
  ] = useUpdateUserProfileMutation();
  const [updateUserAccount, {}] = useUpdateUserAccountMutation();

  const handleClose = () => {
    dispatch(closeEditProf());
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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (profileBody) {
      try {
        await updateUserProfile(profileBody);
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
        await updateUserAccount(accountBody);
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

  useEffect(() => {
    getCountries();
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      setProfileChanged(false);
    }
  }, [isUpdateSuccess]);

  const profileImageBody = {
    profile_image: file,
    about: about,
    country: country,
    gender: gender,
  };

  const saveProfileImage = async () => {
    if (profileImageBody && croppedImage !== null) {
      try {
        
      } catch (err) {
        console.error("Failed to update profile: ", err);
        toast.error("Failed to update", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
      }
    }
  };

  const cancelProfileImageChanges = () => {
    setCroppedImage(null);
    setProfileImage(userInfo?.profile_image);
    setProfileChanged(false);
    setFile(null);
    setPhotoURL(null);
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
              {profileChanged ? (
                <div className="py-2 flex flex-col">
                  <button
                    onClick={saveProfileImage}
                    className={`${
                      theme === "dark" ? `border-white` : `border-gray-700`
                    } p-2 gap-2 mb-1 justify-center rounded-full border flex w-[200px]`}
                  >
                    <AiOutlineCheck size={20} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={cancelProfileImageChanges}
                    className={`${
                      theme === "dark" ? `border-white` : `border-gray-700`
                    } p-2 gap-2 justify-center rounded-full border flex w-[200px]`}
                  >
                    <MdOutlineClose size={20} />
                    <span>Cancel Changes</span>
                  </button>
                </div>
              ) : (
                <button
                  className={`${
                    theme === "dark" ? `border-white` : `border-gray-700`
                  } py-1 px-2 rounded-full border w-[130px]`}
                >
                  <form>
                    <label htmlFor="profile_picture" className="">
                      Add photo
                    </label>
                    <input
                      type="file"
                      name="profile_picture"
                      id="profile_picture"
                      onChange={handleFileInputChange}
                      className="hidden"
                      accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
                    />
                  </form>
                </button>
              )}
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
                      theme === "dark"
                        ? `text-white  bg-gray-700`
                        : `text-gray-900`
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
                      theme === "dark"
                        ? `text-white  bg-gray-700`
                        : `text-gray-900`
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
              <div className="flex flex-col space-y-1 mb-3">
                <label className="text-sm font-bold" htmlFor="firstName">
                  About
                </label>
                <textarea
                  className={`${
                    theme === "dark"
                      ? `text-white  bg-gray-700`
                      : `text-gray-900`
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
              <div className="flex flex-col space-y-1 mb-3">
                <label className="text-sm font-bold" htmlFor="country">
                  Country
                </label>
                <select
                  className={`${
                    theme === "dark"
                      ? `text-white  bg-gray-700`
                      : `text-gray-900`
                  } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  id="country"
                  name="country"
                  value={country}
                  onChange={(event) => {
                    setCountry(event.target.value);
                    handleProfileChange();
                  }}
                >
                  <option value="">Select a country</option>
                  {lazyCountires?.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-1 mb-3">
                <label className="text-sm font-bold" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  required
                  className={`${
                    theme === "dark"
                      ? `text-white bg-gray-700`
                      : `text-gray-900`
                  } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  name="gender"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                    handleProfileChange();
                  }}
                >
                  <option value="">Select a gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
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
        <CropEasy
          {...{
            photoURL,
            setOpenCrop,
            setCroppedImage,
            setProfileChanged,
            setProfileImage,
          }}
        />
      )}
    </>
  );
};

export default EditProfile;
