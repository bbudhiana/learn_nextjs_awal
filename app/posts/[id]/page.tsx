import { getPostById } from "@/src/lib/api";

interface PostDetailPageProps {
  params: {
    id: number;
  };
}

async function Page({ params }: PostDetailPageProps) {
  const { id } = await params; //sebelum destrukturisasi : const id = (await params).id;
  const post = await getPostById(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="content">page detail: {post.id}</div>
    </article>
  );
}

export default Page;