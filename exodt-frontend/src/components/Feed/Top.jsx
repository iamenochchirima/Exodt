import {
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
} from "@/redux/api/generalApi";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { format } from "timeago.js";
import { Menu, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { closePostCreated } from "@/redux/slices/postsSlice";

const Top = () => {
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetAllPostsQuery();
  const [
    fetchPosts,
    { data: lazyPosts, isSuccess: success, error: lazyError },
  ] = useLazyGetAllPostsQuery();
  const { theme, setTheme } = useTheme();
  const { postCreated } = useSelector((state) => state.posts);

  useEffect(() => {
    if (data) {
      setPosts(data);
      console.log("posts here", posts);
    }
  }, [data]);

  useEffect(() => {
    if (postCreated) {
      fetchPosts();
      dispatch(closePostCreated());
    }
  }, [postCreated]);

  useEffect(() => {
    if (lazyPosts) {
      setPosts(lazyPosts);
    }
  }, [lazyPosts]);

  console.log(postCreated)

  return (
    <div className="mt-5">
      {posts?.map((post) => (
        <div key={post.id} className="border p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className=" h-[35px] w-[35px] rounded-full">
                <Image
                  className="rounded-full"
                  src={post.profile_image}
                  height={55}
                  width={55}
                  sizes="(max-width: 768px) 100vw"
                  alt="profile picture"
                />
              </div>

              <Link href={`/${encodeURIComponent(post.username)}/`}>
                {post.username}
              </Link>
              <h3> {format(post.created)}</h3>
            </div>
            <Menu>
              <Menu.Button>
                <BsThreeDots size={25} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={` ${
                    theme === "light" ? `bg-white` : `bg-gray-500`
                  } absolute right-0 botton-10 z-10 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="py-1">
                    <Menu.Item>
                      <button
                        className={` ${
                          theme === "light"
                            ? `text-gray-800 hover:bg-gray-200`
                            : `text-white hover:bg-gray-700`
                        } block px-4 py-2 text-sm`}
                      >
                        Edit
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex justify-center">
            {post.image && <Image src={post.image} alt="post image" height={200} width={200} />}
          </div>
          <div className="pt-3">
            {post.content && <p className="font-robotoLight">{post.content}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Top;
