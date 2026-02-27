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
export interface ImageMeta {
    fit: ImageFit;
    blob: ExternalBlob;
    size: ImageSize;
}
export interface BlogPostView {
    id: string;
    title: string;
    updatedDate?: bigint;
    content: string;
    isPublished: boolean;
    inlineImages: Array<InlineImage>;
    publishedDate?: bigint;
    featuredImage?: ImageMeta;
    slug: string;
    tags: Array<string>;
    createdDate: bigint;
    author: string;
    readTime: bigint;
    publicationDate?: bigint;
    excerpt: string;
    category: string;
    comments: Array<Comment>;
}
export interface Comment {
    content: string;
    author: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export interface InlineImage {
    image: ImageMeta;
    position: bigint;
}
export enum ImageFit {
    contain = "contain",
    cover = "cover",
    original = "original"
}
export enum ImageSize {
    large = "large",
    small = "small",
    medium = "medium"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComment(postId: string, author: string, content: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    canCallerAccessAdminSection(): Promise<boolean>;
    createPost(id: string, title: string, slug: string, category: string, content: string, excerpt: string, readTime: bigint, author: string, tags: Array<string>, featuredImage: ImageMeta | null, inlineImages: Array<InlineImage>, isPublished: boolean, publishImmediately: boolean, publicationDate: bigint | null): Promise<void>;
    deletePost(id: string): Promise<boolean>;
    getAllVisiblePosts(): Promise<Array<BlogPostView>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComments(postId: string): Promise<Array<Comment>>;
    getPost(id: string): Promise<BlogPostView | null>;
    getPublishedPosts(): Promise<Array<BlogPostView>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setPublishedState(id: string, isPublished: boolean, publishedDate: bigint | null, publicationDate: bigint | null): Promise<boolean>;
    updatePost(id: string, title: string, slug: string, category: string, content: string, excerpt: string, readTime: bigint, author: string, tags: Array<string>, featuredImage: ImageMeta | null, inlineImages: Array<InlineImage>, isPublished: boolean, publishImmediately: boolean, publicationDate: bigint | null): Promise<boolean>;
}
