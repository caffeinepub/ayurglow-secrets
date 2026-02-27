import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BlogPostView, ImageMeta, InlineImage } from '../backend';

export interface CreatePostParams {
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
}

export interface UpdatePostParams {
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
}

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

  return useQuery<BlogPostView[]>({
    queryKey: ['allVisiblePosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
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

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreatePostParams>({
    mutationFn: async (params: CreatePostParams): Promise<void> => {
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
        params.featuredImage,
        params.inlineImages,
        params.isPublished,
        params.publishImmediately,
        params.publicationDate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
    },
    onError: (error: Error) => {
      console.error('Create post error:', error);
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, UpdatePostParams>({
    mutationFn: async (params: UpdatePostParams): Promise<boolean> => {
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
        params.publicationDate
      );
    },
    onSuccess: (_data, params) => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', params.id] });
    },
    onError: (error: Error) => {
      console.error('Update post error:', error);
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
    },
    onError: (error: Error) => {
      console.error('Delete post error:', error);
    },
  });
}

export function useSetPublishedState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, { id: string; isPublished: boolean; publishedDate: bigint | null; publicationDate?: bigint | null }>({
    mutationFn: async ({ id, isPublished, publishedDate, publicationDate = null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setPublishedState(id, isPublished, publishedDate, publicationDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['allVisiblePosts'] });
    },
    onError: (error: Error) => {
      console.error('Set published state error:', error);
    },
  });
}

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, { postId: string; author: string; content: string }>({
    mutationFn: async ({ postId, author, content }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addComment(postId, author, content);
    },
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error: Error) => {
      console.error('Add comment error:', error);
    },
  });
}

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

export function useCanCallerAccessAdminSection() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['canAccessAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.canCallerAccessAdminSection();
    },
    enabled: !!actor && !isFetching,
  });
}

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
