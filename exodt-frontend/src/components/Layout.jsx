import React from "react";
import Head from "next/head";
import Bottombar from "./Bottombar";
import Leftbar from "./Leftbar";

const Layout = ({ title, content, children }) => {
  return (
    <div className="flex justify-center items-start ss:mx-5 sm:mx-10 md:mx-20 mid:mx-5 lg:mx-20 font-roboto">
      <div className=" xl:max-w-[1500px] w-full ">
        <Head>
          <title>{title}</title>
        </Head>
        <div className="flex h-screen">
          <div className=""><Leftbar/></div>
          <div className="w-full h-full">{children}</div>
        </div>
        <Bottombar />
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Exodt app",
  content: "Layout",
};

export default Layout;
