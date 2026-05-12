import Link from 'next/link'
import { Post } from '@/src/types/post';

interface PostListProps {
  posts: Post[];
}

function PostList({ posts } : PostListProps) {
  return (
    <section className="post-list" aria-label="Daftar berita terbaru">
        {posts.map((post) => (
          <article key={post.id} className="post-item">
            <h2>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.body}</p>
          </article>
        ))}
      </section>
  )
}


export default PostList