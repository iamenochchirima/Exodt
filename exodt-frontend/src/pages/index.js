import Latest from "@/components/Feed/Latest";
import Local from "@/components/Feed/Local";
import Top from "@/components/Feed/Top";
import Layout from "@/components/Layout";
import Rightbar from "@/components/Rightbar";
import Topbar from "@/components/Topbar";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { feedTab } = useSelector((state) => state.app);
  
  return (
    <Layout>
      <div className="flex gap-2">
        <div className="relative w-full mid:w-2/3">
          <div className="sticky top-0">
            <Topbar />
          </div>
          <div className="">
            {feedTab === "top" && <Top/>}
            {feedTab === "latest" && <Latest />}
            {feedTab === "local" && <Local />}
          </div>
        </div>
        <div className="hidden mid:block w-1/3">
          <Rightbar />
        </div>
      </div>
    </Layout>
  );
}
