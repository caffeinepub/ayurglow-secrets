import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BlogPostView, Comment, ImageMeta, InlineImage } from '../backend';

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export function useGetPublishedPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView[]>({
    queryKey: ['publishedPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPostsForAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView[]>({
    queryKey: ['allPostsAdmin'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllPostsForAdminPage();
      } catch {
        try {
          return await actor.getAllPosts();
        } catch {
          return await actor.getPublishedPosts();
        }
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

// Keep legacy export for backward compatibility
export function useGetAllVisiblePosts() {
  return useGetAllPostsForAdmin();
}

export function useGetPost(postId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView | null>({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPost(postId);
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

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

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      title: string;
      slug: string;
      category: string;
      content: string;
      excerpt: string;
      readTime: bigint;
      author: string;
      tags: string[];
      featuredImage: ImageMeta | null;
      inlineImages: InlineImage[];
      isPublished: boolean;
      publishImmediately: boolean;
      publicationDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPost(
        params.id,
        params.title,
        params.slug,
        params.category,
        params.content,
        params.excerpt,
        params.readTime,
        params.author,
        params.tags,
        params.featuredImage,
        params.inlineImages,
        params.isPublished,
        params.publishImmediately,
        params.publicationDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allPostsAdmin'] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      title: string;
      slug: string;
      category: string;
      content: string;
      excerpt: string;
      readTime: bigint;
      author: string;
      tags: string[];
      featuredImage: ImageMeta | null;
      inlineImages: InlineImage[];
      isPublished: boolean;
      publishImmediately: boolean;
      publicationDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePost(
        params.id,
        params.title,
        params.slug,
        params.category,
        params.content,
        params.excerpt,
        params.readTime,
        params.author,
        params.tags,
        params.featuredImage,
        params.inlineImages,
        params.isPublished,
        params.publishImmediately,
        params.publicationDate,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allPostsAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.slug] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allPostsAdmin'] });
    },
  });
}

export function useSetPublishedState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      isPublished: boolean;
      publishedDate: bigint | null;
      publicationDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setPublishedState(
        params.id,
        params.isPublished,
        params.publishedDate,
        params.publicationDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allPostsAdmin'] });
    },
  });
}

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { postId: string; author: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addComment(params.postId, params.author, params.content);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
    },
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: { name: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
