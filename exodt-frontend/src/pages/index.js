import Feed from "@/components/Feed";
import Layout from "@/components/Layout";
import Rightbar from "@/components/Rightbar";

export default function Home() {
  return (
    <Layout>
      <div className="flex gap-2">
        <div className="relative w-full mid:w-2/3">
          <div className="sticky top-0 bg-black h-[100px]"></div>
          <div className="h-[1000px]"></div>
        </div>
        <div className="hidden mid:block w-1/3">
          <Rightbar />
        </div>
      </div>
    </Layout>
  );
}
