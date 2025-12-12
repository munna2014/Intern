import React from 'react'
import Link from 'next/link'


const blogs =[{
   
  id:1,
  title:"Blog 1",
  description:"This is blog 1",
  author:"John Doe",
  date:"2022-01-01",
  content:"This is the content of blog 1"},

  {
    id:2,
    title:"Blog 2",
    description:"This is blog 2",
    author:"John Doe",
    date:"2022-01-01",
    content:"This is the content of blog 2"
  },

  {
    id:3,
    title:"Blog 3",
    description:"This is blog 3",
    author:"John Doe",
    date:"2022-01-01",
    content:"This is the content of blog 3"
  }
]

export default function Blogs() {
  return (

    <main className="mt-10">
      <div>This is the Blog page</div>
     <ul>
      {blogs.map(blog=>(
        <li className='mb-5 mt-2' key={blog.id}> <Link href={`/blogs/${blog.id}`}>{blog.title}</Link></li>
      ))}
     </ul>
    </main>
  )
}
