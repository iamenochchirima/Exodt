import Image from "next/image";
import { faker } from "@faker-js/faker";
import { MdCreate, MdNotifications } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";

const Bottombar = () => {
  return (
    <div className="w-full h-[50px] border-t ss:hidden fixed bottom-0 ">
      <ul className="px-10 py-3 flex justify-between">
        <li className="relative h-[30px] w-[30px]">
          <Image
            className="rounded-full"
            src={faker.image.avatar()}
            style={{
              objectFit: "cover",
            }}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 95vw,
              90"
            alt="profile image"
          />
        </li>
        <li className="text-2xl">
          <MdCreate />
        </li>
        <li className="text-2xl">
          <AiOutlineMessage />
        </li>
        <li className="text-2xl">
          <MdNotifications />
        </li>
      </ul>
    </div>
  );
};

export default Bottombar;
