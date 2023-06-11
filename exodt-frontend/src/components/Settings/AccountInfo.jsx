import {
  useDeleteAccountMutation,
  useLoadUserQuery,
} from "@/redux/api/authApi";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AccountInfo = () => {
  const router = useRouter()
  const { data } = useLoadUserQuery();
  const [deleteAcc, { data: deleteRes, isSuccess, error }] =
    useDeleteAccountMutation();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const { theme } = useTheme();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    } else {
      router.push("/")
    }
  }, [data]);

  const handleDeleteAccount = async () => {
    setConfirmDelete(false);
    try {
      deleteAcc();
      toast.success("Account have been deleted successfully", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {" "}
      {user && (
        <div className="p-3 text-primary">
          <div className="">
            <h3
              className={`${
                theme === "light" ? `text-secondary` : `text-dimWhite`
              }`}
            >
              Username
            </h3>
            <div className="flex justify-between items-center my-3 border px-2 py-4 rounded">
              <h3>{user.username}</h3>
              <button>Update</button>
            </div>
          </div>
          <div className="">
            <h3
              className={`${
                theme === "light" ? `text-secondary` : `text-dimWhite`
              }`}
            >
              Email
            </h3>
            <div className="flex justify-between items-center my-3 border px-2 py-4 rounded">
              <h3>{user.email}</h3>
              <button>Update</button>
            </div>
          </div>
          <div className="">
            <h3
              className={`${
                theme === "light" ? `text-secondary` : `text-dimWhite`
              }`}
            >
              Country
            </h3>
            <div className="flex justify-between items-center my-3 border px-2 py-4 rounded">
              <h3>
                {user.country_name ? user.country_name : "Country not set"}
              </h3>
              <button>Update</button>
            </div>
          </div>
          <div className="">
            <h3
              className={`${
                theme === "light" ? `text-secondary` : `text-dimWhite`
              }`}
            >
              Gender
            </h3>
            <div className="flex justify-between items-center my-3 border px-2 py-4 rounded">
              <h3>{user.gender ? user.gender : "Gender not set"}</h3>
              <button>Update</button>
            </div>
          </div>
          {!confirmDelete && (
            <div className="my-5 flex items-center justify-between">
              <h1
                className={`${
                  theme === "light" ? `text-red-800` : `text-red-500`
                } font-semibold `}
              >
                Delete your account
              </h1>
              <button
                onClick={() => setConfirmDelete(true)}
                className={`${
                  theme === "light" ? `text-red-800` : `text-red-500`
                } py-1.5 px-2 border rounded-lg`}
              >
                Proceed
              </button>
            </div>
          )}
          {confirmDelete && (
            <div className="justify-center flex flex-col items-center mt-5 gap-3">
              <h1 className="text-cyan-50">
                Are you sure you want to delete your account?
              </h1>
              <button
                onClick={handleDeleteAccount}
                className={`${
                  theme === "light" ? `text-red-800` : `text-red-500`
                } py-1.5 px-2 border rounded-lg`}
              >
                Yes please Delete my account
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AccountInfo;
