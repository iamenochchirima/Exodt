import React, { Fragment, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/redux/api/authApi";
import { useSelector } from "react-redux";

const Post = ({ post, theme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 100;
  const [likes, setLikes] = useState(post.num_likes)

  const [likePost, { data: likeRes, error }] = useLikePostMutation();
  const [unlikePost, { data: unlikeRes, error: unlikeError }] = useUnlikePostMutation();

  const { profileInfo } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (post.liked_by.includes(profileInfo.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post, profileInfo]);

  const likeUnlike = (id) => {
    const body = {
      "post_id": id
    };
    if (liked) {
      try {
        // Send the unlike request
        unlikePost(body).unwrap().then(() => {
          setLiked(false);
          setLikes(likes - 1);
        }).catch((error) => {
          console.log("Failed to unlike post", error);
        });
      } catch (error) {
        console.log("Failed to unlike post", error);
      }
    } else if (!liked) {
      try {
        likePost(body).unwrap().then(() => {
          setLiked(true);
          setLikes(likes + 1);
        }).catch((error) => {
          console.log("Failed to like post", error);
        });
      } catch (error) {
        console.log("Failed to like post", error);
      }
    }
  };

  return (
    <div className="border p-3 rounded-lg mt-2">
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
              className={` ${theme === "light" ? `bg-white` : `bg-gray-500`
                } absolute right-0 botton-10 z-10 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className="py-1">
                <Menu.Item>
                  <button
                    className={` ${theme === "light"
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
        {post.image && (
          <Image src={post.image} alt="post image" height={200} width={200} />
        )}
      </div>
      <div className="pt-3">
        <p className="font-robotoLight">
          {isExpanded
            ? post.content
            : `${post.content.slice(0, characterLimit)}...`}
        </p>
        {!isExpanded && post.content.length > characterLimit && (
          <button onClick={toggleExpand} className="read-more-button">
            Read more
          </button>
        )}
      </div>
      <div className="flex gap-3 items-center border-t mt-3 p-3">
        <button
          onClick={() => likeUnlike(post.id)}
          className="flex items-center gap-2"
        >
          {liked ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-2">
          <AiOutlineComment size={20} />
          <span>{post.num_comments}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
