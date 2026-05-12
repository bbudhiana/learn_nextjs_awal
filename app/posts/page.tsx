import PostList from "@/src/components/PostList";
import { getAllPost } from "@/src/lib/api";

async function page() {
  const posts = await getAllPost();
  return (
    <>
        <div className="main-heading">
            <h2>Daftar Tulisan</h2>
      </div>
      <PostList posts={posts} />
    </>
  )
}

export default page