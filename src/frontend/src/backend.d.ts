import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    publishedDate: bigint;
    slug: string;
    tags: Array<string>;
    author: string;
    readTime: bigint;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    createPost(id: string, title: string, slug: string, category: string, content: string, excerpt: string, readTime: bigint, author: string, publishedDate: bigint, tags: Array<string>, isPublished: boolean): Promise<void>;
    deletePost(id: string): Promise<void>;
    getAllPosts(): Promise<Array<BlogPost>>;
    getPost(id: string): Promise<BlogPost | null>;
    getPublishedPosts(): Promise<Array<BlogPost>>;
    updatePost(id: string, title: string, slug: string, category: string, content: string, excerpt: string, readTime: bigint, author: string, publishedDate: bigint, tags: Array<string>, isPublished: boolean): Promise<void>;
}
