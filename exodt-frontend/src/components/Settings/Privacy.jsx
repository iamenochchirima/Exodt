import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useTheme } from "next-themes";

const Privacy = () => {

  const { theme } = useTheme();

  return (
    <div className="p-3 text-primary">
      <div className="flex items-center justify-between">
        <div className="pb-3">
          <h3 className={`${
              theme === "light" ? `text-secondary` : `text-dimWhite` }`}>Messaging</h3>
          <h4 className="">Manage how messaging privacy</h4>
        </div>
        <AiOutlineRight size={18} />
      </div>
      <hr />
      <div className="flex items-center justify-between py-3">
        <h3 className={`${
              theme === "light" ? `text-secondary` : `text-dimWhite` }`}>Privacy policy</h3>
        <HiOutlineExternalLink size={18} />
      </div>
    </div>
  );
};

export default Privacy;
