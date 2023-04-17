import Image from "next/image";
import Link from "next/link";

const MinTopbar = () => {
  return (
    <div className="h-[50px] w-full ss:hidden border-b mb-3 mt-3">
      <div className="flex gap-5">
        <div className="w-1/5 flex items-center">
          <Link href="/">
            <Image
              className="sm:hidden"
              src="/logo.png"
              height="50"
              width="50"
              alt="logo"
            />
          </Link>
          <Link href="/">
            <span className="font-robotoBold">Home</span>
          </Link>
        </div>
        <button className="w-4/5 rounded-full border mr-5">Search</button>
      </div>
    </div>
  );
};

export default MinTopbar;
