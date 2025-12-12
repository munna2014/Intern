import React from "react";
import getPost from "@/lib/getPost";
import getPostComment from "@/lib/getPostComment";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const postPromise = getPost(id);
  const commentsPromise = getPostComment(id);

  const [post, comments] = await Promise.all([postPromise, commentsPromise]);

  return {
    title: post.title,
    description: post.body,
  };
}

export default async function Postpage({ params }) {
  const { id } = await params;

  const postPromise = getPost(id);
  const commentsPromise = getPostComment(id);

  const [post, comments] = await Promise.all([postPromise, commentsPromise]);

  return (
    <div className="p-5">
      <h1 className="text-2xl text-blue-500 font-bold">{post.title}</h1>

      <p className="mt-5">{post.body}</p>
      <hr />

      <div className="mt-10">
        <h1>Comments</h1>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
