import PostCard from '@/components/PostCard';
import BlogSidebar from '@/components/BlogSidebar';
import { useGetPublishedPosts } from '@/hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function BlogPage() {
  const { data: posts = [], isLoading, error } = useGetPublishedPosts();

  console.log('BlogPage - isLoading:', isLoading);
  console.log('BlogPage - posts:', posts);
  console.log('BlogPage - error:', error);

  if (error) {
    console.error('BlogPage error:', error);
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          <p>Error loading blog posts. Please try again later.</p>
          <p className="text-sm mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ocean-blue mb-3 font-serif">
            Latest Posts
          </h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            Explore our collection of natural health and wellness articles
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-ocean-blue" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-foreground/70 text-base md:text-lg mb-4">No published posts yet.</p>
                <p className="text-sm text-muted-foreground">
                  Posts need to be created and marked as "Published" to appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => {
                  console.log('Rendering post:', post.id, post.title);
                  return <PostCard key={post.id} post={post} />;
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          {posts.length > 0 && (
            <div className="lg:w-80">
              <BlogSidebar posts={posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
