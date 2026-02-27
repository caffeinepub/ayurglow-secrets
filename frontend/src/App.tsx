import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import AboutPage from './pages/AboutPage';
import HealthRemediesPage from './pages/HealthRemediesPage';
import SkinCarePage from './pages/SkinCarePage';
import HairCarePage from './pages/HairCarePage';
import WeightManagementPage from './pages/WeightManagementPage';
import LifestyleWellnessPage from './pages/LifestyleWellnessPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AdminPostsPage from './pages/AdminPostsPage';
import CreateBlogPostPage from './pages/CreateBlogPostPage';
import EditBlogPostPage from './pages/EditBlogPostPage';

// Health Remedies sub-pages
import ImmunityBoostPage from './pages/health-remedies/ImmunityBoostPage';
import DigestionPage from './pages/health-remedies/DigestionPage';
import WeightManagementRemediesPage from './pages/health-remedies/WeightManagementPage';
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

// Weight Management sub-pages
import FatBurningDrinksPage from './pages/weight-management/FatBurningDrinksPage';
import MetabolismBoostersPage from './pages/weight-management/MetabolismBoostersPage';
import WeightLossRecipesPage from './pages/weight-management/WeightLossRecipesPage';

// Lifestyle & Wellness sub-pages
import MorningRitualsPage from './pages/lifestyle-wellness/MorningRitualsPage';
import YogaMeditationPage from './pages/lifestyle-wellness/YogaMeditationPage';
import DailyRoutinesPage from './pages/lifestyle-wellness/DailyRoutinesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
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

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const blogRoute = createRoute({ getParentRoute: () => rootRoute, path: '/blog', component: BlogPage });
const blogPostRoute = createRoute({ getParentRoute: () => rootRoute, path: '/blog/$postId', component: BlogPostDetailPage });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage });
const privacyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/privacy', component: PrivacyPolicyPage });
const termsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/terms', component: TermsOfServicePage });

// Admin routes
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: AdminPostsPage });
const createPostRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/create', component: CreateBlogPostPage });
const editPostRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/edit/$postId', component: EditBlogPostPage });

// Category routes
const healthRemediesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/health-remedies', component: HealthRemediesPage });
const skinCareRoute = createRoute({ getParentRoute: () => rootRoute, path: '/skin-care', component: SkinCarePage });
const hairCareRoute = createRoute({ getParentRoute: () => rootRoute, path: '/hair-care', component: HairCarePage });
const weightManagementRoute = createRoute({ getParentRoute: () => rootRoute, path: '/weight-management', component: WeightManagementPage });
const lifestyleWellnessRoute = createRoute({ getParentRoute: () => rootRoute, path: '/lifestyle-wellness', component: LifestyleWellnessPage });

// Health Remedies sub-routes
const immunityRoute = createRoute({ getParentRoute: () => rootRoute, path: '/health-remedies/immunity', component: ImmunityBoostPage });
const digestionRoute = createRoute({ getParentRoute: () => rootRoute, path: '/health-remedies/digestion', component: DigestionPage });
const weightRemediesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/health-remedies/weight-management', component: WeightManagementRemediesPage });
const diabetesBPRoute = createRoute({ getParentRoute: () => rootRoute, path: '/health-remedies/diabetes-bp', component: DiabetesBPPage });
const stressSleepRoute = createRoute({ getParentRoute: () => rootRoute, path: '/health-remedies/stress-sleep', component: StressSleepPage });

// Skin Care sub-routes
const naturalGlowRoute = createRoute({ getParentRoute: () => rootRoute, path: '/skin-care/natural-glow', component: NaturalGlowPage });
const acneRoute = createRoute({ getParentRoute: () => rootRoute, path: '/skin-care/acne-treatment', component: AcneTreatmentPage });
const pigmentationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/skin-care/pigmentation', component: PigmentationPage });
const antiAgingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/skin-care/anti-aging', component: AntiAgingPage });
const diyFacePacksRoute = createRoute({ getParentRoute: () => rootRoute, path: '/skin-care/diy-face-packs', component: DIYFacePacksPage });

// Hair Care sub-routes
const hairFallRoute = createRoute({ getParentRoute: () => rootRoute, path: '/hair-care/hair-fall-treatment', component: HairFallTreatmentPage });
const hairGrowthRoute = createRoute({ getParentRoute: () => rootRoute, path: '/hair-care/hair-growth', component: HairGrowthPage });
const dandruffRoute = createRoute({ getParentRoute: () => rootRoute, path: '/hair-care/dandruff-scalp-care', component: DandruffScalpCarePage });
const greyHairRoute = createRoute({ getParentRoute: () => rootRoute, path: '/hair-care/grey-hair-solutions', component: GreyHairSolutionsPage });
const oilsMasksRoute = createRoute({ getParentRoute: () => rootRoute, path: '/hair-care/oils-masks', component: OilsMasksPage });

// Weight Management sub-routes
const fatBurningRoute = createRoute({ getParentRoute: () => rootRoute, path: '/weight-management/fat-burning-drinks', component: FatBurningDrinksPage });
const metabolismRoute = createRoute({ getParentRoute: () => rootRoute, path: '/weight-management/metabolism-boosters', component: MetabolismBoostersPage });
const weightLossRecipesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/weight-management/weight-loss-recipes', component: WeightLossRecipesPage });

// Lifestyle & Wellness sub-routes
const morningRitualsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/lifestyle-wellness/morning-rituals', component: MorningRitualsPage });
const yogaMeditationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/lifestyle-wellness/yoga-meditation', component: YogaMeditationPage });
const dailyRoutinesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/lifestyle-wellness/daily-routines', component: DailyRoutinesPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  blogPostRoute,
  aboutRoute,
  privacyRoute,
  termsRoute,
  adminRoute,
  createPostRoute,
  editPostRoute,
  healthRemediesRoute,
  skinCareRoute,
  hairCareRoute,
  weightManagementRoute,
  lifestyleWellnessRoute,
  immunityRoute,
  digestionRoute,
  weightRemediesRoute,
  diabetesBPRoute,
  stressSleepRoute,
  naturalGlowRoute,
  acneRoute,
  pigmentationRoute,
  antiAgingRoute,
  diyFacePacksRoute,
  hairFallRoute,
  hairGrowthRoute,
  dandruffRoute,
  greyHairRoute,
  oilsMasksRoute,
  fatBurningRoute,
  metabolismRoute,
  weightLossRecipesRoute,
  morningRitualsRoute,
  yogaMeditationRoute,
  dailyRoutinesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
