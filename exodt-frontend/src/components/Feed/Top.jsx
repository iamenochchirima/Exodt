import {
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
} from "@/redux/api/generalApi";
import Image from "next/image";
import React, {useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { closePostCreated } from "@/redux/slices/postsSlice";
import PostCard from "./PostCard";
import { useDeletePostMutation } from "@/redux/api/authApi";

const Top = () => {
  const [deletePost] = useDeletePostMutation()
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


  const handleDeletePost = async (id) => {
    try {
      const result = await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="mt-5">
      {posts?.map((post) => (
        <PostCard key={post.id} {...{ post, theme, handleDeletePost }} />
      ))}
    </div>
  );
};

export default Top;
