import { getLatestPosts } from "@/src/lib/api";
import PostList from "@/src/components/PostList";

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <main>
      <header className="main-heading">
        <h1>Selamat Datang di NextJS News!</h1>
        <p className="subtitle">Situs Berita Terbaru dengan NextJS</p>
      </header>

      <PostList posts={posts} />
    </main>
  );
}
