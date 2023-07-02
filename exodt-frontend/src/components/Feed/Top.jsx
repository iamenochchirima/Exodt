import { useGetAllPostsQuery } from "@/redux/api/generalApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

const Top = () => {
  const { data: posts, isSuccess } = useGetAllPostsQuery();

  useEffect(() => {
    if (posts) {
      console.log("posts here", posts);
    }
  }, [posts]);

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
              <h3>{post.username}</h3>
            </div>
            <h3> {format(post.created)}</h3>
          </div>
          <div className="">
            {post.image && <Image src={post.image} height={200} width={200} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Top;
