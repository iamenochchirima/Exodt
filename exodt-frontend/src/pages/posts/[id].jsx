import React, { Fragment, useEffect, useState } from "react";
import { useLazyGetFullPostQuery, useLazyGetPostCommentsQuery } from '@/redux/api/generalApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from "timeago.js";
import { Menu, Transition } from "@headlessui/react";
import { BsFillSendFill, BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/redux/api/authApi";
import { useSelector } from "react-redux";
import { useTheme } from 'next-themes';
import { toast } from "react-toastify";
import PostComment from "@/components/Feed/PostComment";

const Post = () => {

  const { theme } = useTheme()
  const [comments, setComments] = useState(null)

  const router = useRouter();
  const { id } = router.query || {};


  const [getPost, { data: post, isSuccess }] =
    useLazyGetFullPostQuery();
  const [deleteComment, {}] = useDeleteCommentMutation()

  const [getPostComments, { data }] =
    useLazyGetPostCommentsQuery();

  useEffect(() => {
    if (data) {
      setComments(data)
    }
  }, [data])

  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 300;
  const [likes, setLikes] = useState(post?.num_likes)

  const [likePost, { data: likeRes, error }] = useLikePostMutation();
  const [unlikePost, { data: unlikeRes, error: unlikeError }] = useUnlikePostMutation();

  const { profileInfo } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("")

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (id) {
      getPost(id);
      getPostComments(id)
    }
  }, [id, getPost]);

  useEffect(() => {
    if (post) {
      if (post.liked_by.includes(profileInfo.id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
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

  const [createPostComment, { isLoading }] = useCreateCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment !== "") {
      const formData = new FormData();
      formData.append("body", comment);
      formData.append("post_id", id);
      try {
        await createPostComment(formData).unwrap().then(() => {
          setComment("")
          getPostComments(id)
          toast.success("Commented!!!", {
            autoClose: 5000,
            position: "top-center",
            hideProgressBar: true,
          });
        });
      } catch (error) {
        console.log("Failed to create post comment", error);
      }
    }
  }

  const handleDeleteComment = async (id) => {
    try {
      const result = await deleteComment(id);
      console.log(result)
      setComments((prevcomments) => prevcomments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      {post && (<div className="border p-3 rounded-lg mt-2">
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
          <Link href={`/posts/${encodeURIComponent(post.id)}/`}>

            <p className="font-robotoLight">
              {isExpanded
                ? post.content
                : `${post.content.slice(0, characterLimit)}...`}
            </p>
          </Link>
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
          <Link href={`/posts/${encodeURIComponent(post.id)}/`} className="flex items-center gap-2">
            <AiOutlineComment size={20} />
            <span>{post.num_comments}</span>
            <span>Comments</span>
          </Link>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label className="text-sm font-bold" htmlFor="Content">
            Comment
          </label>
          <textarea
            className={`${theme === "dark" ? `text-white  bg-gray-700` : `text-gray-900`
              } relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
            rows={4}
            cols={40}
            value={comment}
            name="content"
            id="content"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-3 rounded border py-1.5 px-2"
          >
            <span className="justify-end ">Send comment</span>
            <BsFillSendFill />
          </button>
        </form>
        {/* Comment section */}
        {comments?.map((comment) => (
          <PostComment key={comment.id} {...{ comment, theme, handleDeleteComment }} />
        ))}
      </div>)}
    </>
  )
}

export default Post