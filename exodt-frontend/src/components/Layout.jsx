import React from "react";
import Head from "next/head";
import Link from "next/link";
import Topbar from "./Topbar";
import Bottombar from "./Bottombar";
import Leftbar from "./Leftbar";

const Layout = ({ title, content, children }) => {
  return (
    <div className="flex justify-center items-start">
      <div className=" xl:max-w-[1500px] w-full ">
        <Head>
          <title>{title}</title>
        </Head>
        <Topbar />
        <div className="grid grid-cols-6">
          <div className="col-span-2"><Leftbar /></div>
          <div className="col-span-4">{children}</div>
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
