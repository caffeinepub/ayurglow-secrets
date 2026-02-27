import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import HealthRemediesPage from './pages/HealthRemediesPage';
import SkinCarePage from './pages/SkinCarePage';
import HairCarePage from './pages/HairCarePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AdminPostsPage from './pages/AdminPostsPage';
import CreateBlogPostPage from './pages/CreateBlogPostPage';
import EditBlogPostPage from './pages/EditBlogPostPage';
import AdminRoute from './components/AdminRoute';

// Health Remedies sub-pages
import ImmunityBoostPage from './pages/health-remedies/ImmunityBoostPage';
import DigestionPage from './pages/health-remedies/DigestionPage';
import WeightManagementPage from './pages/health-remedies/WeightManagementPage';
import DiabetesBPPage from './pages/health-remedies/DiabetesBPPage';
import StressSleepPage from './pages/health-remedies/StressSleepPage';

// Skin Care sub-pages
import NaturalGlowPage from './pages/skin-care/NaturalGlowPage';
import AcneTreatmentPage from './pages/skin-care/AcneTreatmentPage';
import PigmentationPage from './pages/skin-care/PigmentationPage';
import AntiAgingPage from './pages/skin-care/AntiAgingPage';
import DIYFacePacksPage from './pages/skin-care/DIYFacePacksPage';

// Hair Care sub-pages
import HairFallTreatmentPage from './pages/hair-care/HairFallTreatmentPage';
import HairGrowthPage from './pages/hair-care/HairGrowthPage';
import DandruffScalpCarePage from './pages/hair-care/DandruffScalpCarePage';
import GreyHairSolutionsPage from './pages/hair-care/GreyHairSolutionsPage';
import OilsMasksPage from './pages/hair-care/OilsMasksPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// Root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Page routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPostDetailPage,
});

const healthRemediesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies',
  component: HealthRemediesPage,
});

const skinCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care',
  component: SkinCarePage,
});

const hairCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care',
  component: HairCarePage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: TermsOfServicePage,
});

// Admin route (admin-only: delete, publish/unpublish)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminRoute>
      <AdminPostsPage />
    </AdminRoute>
  ),
});

const adminPostsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/posts',
  component: () => (
    <AdminRoute>
      <AdminPostsPage />
    </AdminRoute>
  ),
});

// Create/Edit post routes — accessible to any authenticated user
const createPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/create-post',
  component: CreateBlogPostPage,
});

const editPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/edit-post/$id',
  component: EditBlogPostPage,
});

// Health Remedies sub-routes
const immunityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/immunity-boost',
  component: ImmunityBoostPage,
});

const digestionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/digestion',
  component: DigestionPage,
});

const weightManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/weight-management',
  component: WeightManagementPage,
});

const diabetesBPRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/diabetes-bp',
  component: DiabetesBPPage,
});

const stressSleepRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/stress-sleep',
  component: StressSleepPage,
});

// Skin Care sub-routes
const naturalGlowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/natural-glow',
  component: NaturalGlowPage,
});

const acneTreatmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/acne-treatment',
  component: AcneTreatmentPage,
});

const pigmentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/pigmentation',
  component: PigmentationPage,
});

const antiAgingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/anti-aging',
  component: AntiAgingPage,
});

const diyFacePacksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/diy-face-packs',
  component: DIYFacePacksPage,
});

// Hair Care sub-routes
const hairFallRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/hair-fall-treatment',
  component: HairFallTreatmentPage,
});

const hairGrowthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/hair-growth',
  component: HairGrowthPage,
});

const dandruffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/dandruff-scalp-care',
  component: DandruffScalpCarePage,
});

const greyHairRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/grey-hair-solutions',
  component: GreyHairSolutionsPage,
});

const oilsMasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/oils-masks',
  component: OilsMasksPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  blogRoute,
  blogPostRoute,
  healthRemediesRoute,
  skinCareRoute,
  hairCareRoute,
  privacyRoute,
  termsRoute,
  adminRoute,
  adminPostsRoute,
  createPostRoute,
  editPostRoute,
  immunityRoute,
  digestionRoute,
  weightManagementRoute,
  diabetesBPRoute,
  stressSleepRoute,
  naturalGlowRoute,
  acneTreatmentRoute,
  pigmentationRoute,
  antiAgingRoute,
  diyFacePacksRoute,
  hairFallRoute,
  hairGrowthRoute,
  dandruffRoute,
  greyHairRoute,
  oilsMasksRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
