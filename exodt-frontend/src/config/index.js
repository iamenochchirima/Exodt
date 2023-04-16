import { AiFillHome, AiOutlineMessage } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import {BsFillPeopleFill, BsSearch } from "react-icons/bs";
import {RiCommunityLine} from 'react-icons/ri'
import { faker } from '@faker-js/faker';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const navlinks = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <AiFillHome />,
  },
  {
    id: 2,
    name: "Messages",
    url: "/messages",
    icon: <AiOutlineMessage />,
  },
  {
    id: 3,
    name: "Groups",
    url: "/groups",
    icon: <MdGroups />,
  },
  {
    id: 4,
    name: "Connections",
    url: "/connections",
    icon: <BsFillPeopleFill />
  },
  {
    id: 5,
    name: "Communities",
    url: "/communities",
    icon: <RiCommunityLine/>
  },
];

export const USERS = [];

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
  };
}

Array.from({ length: 3 }).forEach(() => {
  USERS.push(createRandomUser());
});
