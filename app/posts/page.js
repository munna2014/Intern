import React from 'react'
import getAllPosts from '@/lib/getAllPosts';
import Link from 'next/link';
export default async function Posts() {

  const posts = await getAllPosts();


  return (
    <> 
    <div className='text-2xl font-bold p-5'>All Posts</div>

    <ul className=' p-5 list-inside gap-5'>
      {posts.map((post) => (
        <li key={post.id}><Link href={`/posts/${post.id}`}>{post.title}</Link></li>
      ))}
    </ul>
     </>    
  );
} 