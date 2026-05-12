import { Post } from "@/src/types/post";

export async function getLatestPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch latest posts");
  }

  return response.json();
}

export async function getPostById(id: number): Promise<Post> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}

export async function getAllPost(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch latest posts");
  }

  return response.json();
}