import Latest from "@/components/Feed/Latest";
import Local from "@/components/Feed/Local";
import Top from "@/components/Feed/Top";
import Layout from "@/components/Layout";
import MinTopbar from "@/components/MinTopbar";
import Rightbar from "@/components/Rightbar";
import Topbar from "@/components/Topbar";
import { useSelector } from "react-redux";

export default function Home() {
  const { feedTab } = useSelector((state) => state.app);

  return (
  
      <div className="flex gap-5">
        <div className="relative w-full mid:w-2/3">
          <div className="sticky top-0">
            <>
              <MinTopbar />
            </>
            <Topbar />
          </div>
          <div className="">
            {feedTab === "top" && <Top />}
            {feedTab === "latest" && <Latest />}
            {feedTab === "local" && <Local />}
          </div>
        </div>
        <div className="hidden relative mid:block w-1/3">
          <div className="sticky top-0">
            <Rightbar />
          </div>
        </div>
      </div>
   
  );
}
