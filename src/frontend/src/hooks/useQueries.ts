import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BlogPostView, Comment } from '../backend';
import { ExternalBlob } from '../backend';

// Query hook to get all posts (published and drafts)
export function useGetAllPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView[]>({
    queryKey: ['allPosts'],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.getAllPosts();
      return posts;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: true,
  });
}

// Query hook to get only published posts
export function useGetPublishedPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView[]>({
    queryKey: ['publishedPosts'],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.getPublishedPosts();
      return posts;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: true,
  });
}

// Query hook to get a single post by ID
export function useGetPost(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView | null>({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPost(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// Mutation hook to create a new post
export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: {
      id: string;
      title: string;
      slug: string;
      category: string;
      content: string;
      excerpt: string;
      readTime: bigint;
      author: string;
      publishedDate: bigint;
      tags: string[];
      isPublished: boolean;
      image: ExternalBlob | null;
      contentImages: ExternalBlob[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createPost(
        post.id,
        post.title,
        post.slug,
        post.category,
        post.content,
        post.excerpt,
        post.readTime,
        post.author,
        post.publishedDate,
        post.tags,
        post.isPublished,
        post.image,
        post.contentImages
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
    },
  });
}

// Mutation hook to update an existing post
export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: {
      id: string;
      title: string;
      slug: string;
      category: string;
      content: string;
      excerpt: string;
      readTime: bigint;
      author: string;
      publishedDate: bigint;
      tags: string[];
      isPublished: boolean;
      image: ExternalBlob | null;
      contentImages: ExternalBlob[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updatePost(
        post.id,
        post.title,
        post.slug,
        post.category,
        post.content,
        post.excerpt,
        post.readTime,
        post.author,
        post.publishedDate,
        post.tags,
        post.isPublished,
        post.image,
        post.contentImages
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
    },
  });
}

// Mutation hook to delete a post
export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
    },
  });
}

// Query hook to get comments for a post
export function useGetComments(postId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getComments(postId);
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

// Mutation hook to add a comment
export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, author, content }: { postId: string; author: string; content: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addComment(postId, author, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
    },
  });
}
