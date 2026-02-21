import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HealthRemediesPage from './pages/HealthRemediesPage';
import SkinCarePage from './pages/SkinCarePage';
import HairCarePage from './pages/HairCarePage';
import BlogPage from './pages/BlogPage';
import CreateBlogPostPage from './pages/CreateBlogPostPage';
import EditBlogPostPage from './pages/EditBlogPostPage';
import AdminPostsPage from './pages/AdminPostsPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Health Remedies Detail Pages
import ImmunityBoostingPage from './pages/health-remedies/ImmunityBoostingPage';
import DigestionGutHealthPage from './pages/health-remedies/DigestionGutHealthPage';
import WeightManagementPage from './pages/health-remedies/WeightManagementPage';
import DiabetesBPSupportPage from './pages/health-remedies/DiabetesBPSupportPage';
import StressSleepSolutionsPage from './pages/health-remedies/StressSleepSolutionsPage';

// Skin Care Detail Pages
import NaturalGlowPage from './pages/skin-care/NaturalGlowPage';
import AcnePimplesPage from './pages/skin-care/AcnePimplesPage';
import PigmentationDarkSpotsPage from './pages/skin-care/PigmentationDarkSpotsPage';
import AntiAgingPage from './pages/skin-care/AntiAgingPage';
import DIYFacePacksPage from './pages/skin-care/DIYFacePacksPage';

// Hair Care Detail Pages
import HairFallTreatmentPage from './pages/hair-care/HairFallTreatmentPage';
import HairGrowthPage from './pages/hair-care/HairGrowthPage';
import DandruffScalpCarePage from './pages/hair-care/DandruffScalpCarePage';
import GreyHairSolutionsPage from './pages/hair-care/GreyHairSolutionsPage';
import OilsMasksPage from './pages/hair-care/OilsMasksPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

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

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const createBlogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/create',
  component: CreateBlogPostPage,
});

const editBlogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/edit/$id',
  component: EditBlogPostPage,
});

const blogPostDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPostDetailPage,
});

const adminPostsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/posts',
  component: AdminPostsPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsOfServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: TermsOfServicePage,
});

// Health Remedies Detail Routes
const immunityBoostingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/immunity-boosting',
  component: ImmunityBoostingPage,
});

const digestionGutHealthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/digestion-gut-health',
  component: DigestionGutHealthPage,
});

const weightManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/weight-management',
  component: WeightManagementPage,
});

const diabetesBPSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/diabetes-bp-support',
  component: DiabetesBPSupportPage,
});

const stressSleepSolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health-remedies/stress-sleep-solutions',
  component: StressSleepSolutionsPage,
});

// Skin Care Detail Routes
const naturalGlowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/natural-glow',
  component: NaturalGlowPage,
});

const acnePimplesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/acne-pimples',
  component: AcnePimplesPage,
});

const pigmentationDarkSpotsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skin-care/pigmentation-dark-spots',
  component: PigmentationDarkSpotsPage,
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

// Hair Care Detail Routes
const hairFallTreatmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/hair-fall-treatment',
  component: HairFallTreatmentPage,
});

const hairGrowthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/hair-growth',
  component: HairGrowthPage,
});

const dandruffScalpCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hair-care/dandruff-scalp-care',
  component: DandruffScalpCarePage,
});

const greyHairSolutionsRoute = createRoute({
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
  healthRemediesRoute,
  skinCareRoute,
  hairCareRoute,
  blogRoute,
  createBlogPostRoute,
  editBlogPostRoute,
  blogPostDetailRoute,
  adminPostsRoute,
  privacyPolicyRoute,
  termsOfServiceRoute,
  // Health Remedies Detail Routes
  immunityBoostingRoute,
  digestionGutHealthRoute,
  weightManagementRoute,
  diabetesBPSupportRoute,
  stressSleepSolutionsRoute,
  // Skin Care Detail Routes
  naturalGlowRoute,
  acnePimplesRoute,
  pigmentationDarkSpotsRoute,
  antiAgingRoute,
  diyFacePacksRoute,
  // Hair Care Detail Routes
  hairFallTreatmentRoute,
  hairGrowthRoute,
  dandruffScalpCareRoute,
  greyHairSolutionsRoute,
  oilsMasksRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
