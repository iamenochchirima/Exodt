import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";

const CreatePost = ({ setCreateComp }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const {profileInfo} = useSelector((state) => state.auth)

  const handleClose = () => {
    setCreateComp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    formData.append("author", profileInfo.user);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
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
          <h1 className="text-center font-robotoBold text-2xl">
            Create a post
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <label className="text-sm font-bold" htmlFor="Content">
              Content
            </label>
            <textarea
              className={`${
                theme === "dark" ? `text-white  bg-gray-700` : `text-gray-900`
              } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
              rows={4}
              cols={40}
              value={content}
              name="content"
              id="content"
              onChange={(e) => setContent(e.target.value)}
            />
            <label htmlFor="Post image" className="text-sm font-bold">
              Add photo
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className={`${
                theme === "dark" ? `text-white  bg-gray-700` : `text-gray-900`
              } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-3 rounded border py-1.5 px-2"
              >
                <span className="justify-end ">Post</span>
                <BsFillSendFill />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
