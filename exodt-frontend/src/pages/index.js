import Feed from "@/components/Feed"
import Layout from "@/components/Layout"
import Rightbar from "@/components/Rightbar"

export default function Home() {
 

  return (
  <Layout>
   <div className="flex">
    <div className="w-full h-full"><Feed/></div>
    <div className=""><Rightbar /></div>
   </div>
  </Layout>
  )
}
