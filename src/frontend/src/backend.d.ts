import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface BlogPostView {
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
    image?: ExternalBlob;
    comments: Array<Comment>;
}
export interface Comment {
    content: string;
    author: string;
    timestamp: bigint;
}
export interface backendInterface {
    addComment(postId: string, author: string, content: string): Promise<boolean>;
    createPost(id: string, title: string, slug: string, category: string, content: string, excerpt: string, readTime: bigint, author: string, publishedDate: bigint, tags: Array<string>, isPublished: boolean, image: ExternalBlob | null): Promise<void>;
    deletePost(id: string): Promise<void>;
    getAllPosts(): Promise<Array<BlogPostView>>;
    getComments(postId: string): Promise<Array<Comment>>;
    getPost(id: string): Promise<BlogPostView | null>;
    getPublishedPosts(): Promise<Array<BlogPostView>>;
    updatePost(id: string, title: string, slug: string, category: string, content: string, excerpt: string, readTime: bigint, author: string, publishedDate: bigint, tags: Array<string>, isPublished: boolean, image: ExternalBlob | null): Promise<void>;
}
