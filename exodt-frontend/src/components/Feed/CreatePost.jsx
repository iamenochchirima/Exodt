import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const CreatePost = ({setCreateComp}) => {
    const {theme} = useTheme()
    const [mounted, setMounted] = useState(false);

    const handleClose = () => {
        setCreateComp(false)
    }

    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null;
  return (
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
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
