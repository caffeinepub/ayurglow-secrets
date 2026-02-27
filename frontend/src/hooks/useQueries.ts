import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { BlogPostView, ExternalBlob } from '../backend';

// ─── Admin Access Query ───────────────────────────────────────────────────────

export function useCanAccessAdminSection() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  const query = useQuery<boolean>({
    queryKey: ['canAccessAdmin', identity?.getPrincipal().toString() ?? 'anonymous'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.canCallerAccessAdminSection();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorFetching && !isInitializing,
    retry: false,
    staleTime: 30000,
  });

  return {
    ...query,
    isLoading: isInitializing || actorFetching || query.isLoading,
    isFetched: !!actor && !isInitializing && !actorFetching && query.isFetched,
  };
}

// ─── Blog Post Queries ────────────────────────────────────────────────────────

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

export function useGetAllPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPostView[]>({
    queryKey: ['allPosts'],
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
      if (!id) return null;
      const result = await actor.getPost(id);
      return result ?? null;
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
      if (!slug) return null;
      try {
        const posts = await actor.getPublishedPosts();
        const found = posts.find((p) => p.slug === slug);
        return found ?? null;
      } catch (err) {
        console.error('Error fetching post by slug:', err);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

// ─── Blog Post Mutations ──────────────────────────────────────────────────────

interface CreatePostParams {
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
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePostParams) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createPost(
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
        params.contentImages
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
    },
  });
}

interface UpdatePostParams {
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
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdatePostParams) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updatePost(
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
        params.contentImages
      );
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', params.id] });
      queryClient.invalidateQueries({ queryKey: ['postBySlug'] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
    },
  });
}

export function usePublishPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, publishedDate }: { id: string; publishedDate: bigint | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.publishPost(id, publishedDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['postBySlug'] });
    },
  });
}

export function useUnpublishPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unpublishPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['postBySlug'] });
    },
  });
}

// ─── Comment Queries ──────────────────────────────────────────────────────────

export function useGetComments(postId: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      if (!actor) return [];
      if (!postId) return [];
      return actor.getComments(postId);
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      author,
      content,
    }: {
      postId: string;
      author: string;
      content: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addComment(postId, author, content);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
}

// ─── User Profile Queries ─────────────────────────────────────────────────────

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
