import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { BlogPostView, UserProfile } from '../backend';
import { ExternalBlob } from '../backend';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
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
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Admin Access ─────────────────────────────────────────────────────────────

export function useCanAccessAdminSection() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  const principalStr = identity?.getPrincipal().toString() ?? 'anonymous';

  const query = useQuery<boolean>({
    queryKey: ['canAccessAdmin', principalStr],
    queryFn: async () => {
      if (!actor) return false;
      try {
        const result = await actor.canCallerAccessAdminSection();
        return result;
      } catch (err) {
        console.error('Admin access check failed:', err);
        return false;
      }
    },
    enabled: !!actor && !actorFetching && !isInitializing,
    retry: 2,
    retryDelay: 1000,
    staleTime: 30_000,
  });

  return {
    ...query,
    hasAccess: query.data === true,
    isLoading: isInitializing || actorFetching || query.isLoading,
    isFetched: !isInitializing && !actorFetching && !!actor && query.isFetched,
  };
}

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

export function useGetAllVisiblePosts() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const principalStr = identity?.getPrincipal().toString() ?? 'anonymous';

  return useQuery<BlogPostView[]>({
    queryKey: ['allVisiblePosts', principalStr],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVisiblePosts();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

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

export function useGetPostBySlug(slug: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView | null>({
    queryKey: ['postBySlug', slug],
    queryFn: async () => {
      if (!actor) return null;
      const posts = await actor.getPublishedPosts();
      return posts.find((p) => p.slug === slug) ?? null;
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

// ─── Blog Post Mutations ──────────────────────────────────────────────────────

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
      image: ExternalBlob | null;
      imageSize: string | null;
      contentImages: ExternalBlob[];
      isPublished: boolean;
      publishedAt: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.createPost(
        params.id,
        params.title,
        params.slug,
        params.category,
        params.content,
        params.excerpt,
        params.readTime,
        params.author,
        params.tags,
        params.image,
        params.imageSize,
        params.contentImages,
        params.isPublished,
        params.publishedAt,
      );
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
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
      image: ExternalBlob | null;
      imageSize: string | null;
      contentImages: ExternalBlob[];
      isPublished: boolean;
      publishedAt: bigint | null;
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
        params.image,
        params.imageSize,
        params.contentImages,
        params.isPublished,
        params.publishedAt,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
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
    }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.setPublishedState(
        params.id,
        params.isPublished,
        params.publishedDate,
      );
      if (!result) {
        throw new Error('Post not found or failed to update published state');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
    },
  });
}

// ─── Comments ─────────────────────────────────────────────────────────────────

export function useGetComments(postId: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getComments(postId);
    },
    enabled: !!actor && !isFetching && !!postId,
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
    },
  });
}
