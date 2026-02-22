import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HealthRemediesPage from "./pages/HealthRemediesPage";
import SkinCarePage from "./pages/SkinCarePage";
import HairCarePage from "./pages/HairCarePage";
import BlogPage from "./pages/BlogPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage";
import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import EditBlogPostPage from "./pages/EditBlogPostPage";
import AdminPostsPage from "./pages/AdminPostsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

// Health Remedies subcategory pages
import ImmunityBoostPage from "./pages/health-remedies/ImmunityBoostPage";
import DigestionPage from "./pages/health-remedies/DigestionPage";
import WeightManagementPage from "./pages/health-remedies/WeightManagementPage";
import DiabetesBPPage from "./pages/health-remedies/DiabetesBPPage";
import StressSleepPage from "./pages/health-remedies/StressSleepPage";

// Skin Care subcategory pages
import NaturalGlowPage from "./pages/skin-care/NaturalGlowPage";
import AcneTreatmentPage from "./pages/skin-care/AcneTreatmentPage";
import PigmentationPage from "./pages/skin-care/PigmentationPage";
import AntiAgingPage from "./pages/skin-care/AntiAgingPage";
import DIYFacePacksPage from "./pages/skin-care/DIYFacePacksPage";

// Hair Care subcategory pages
import HairFallTreatmentPage from "./pages/hair-care/HairFallTreatmentPage";
import HairGrowthPage from "./pages/hair-care/HairGrowthPage";
import DandruffScalpCarePage from "./pages/hair-care/DandruffScalpCarePage";
import GreyHairSolutionsPage from "./pages/hair-care/GreyHairSolutionsPage";
import OilsMasksPage from "./pages/hair-care/OilsMasksPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: 1,
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
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const healthRemediesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health-remedies",
  component: HealthRemediesPage,
});

const immunityBoostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health-remedies/immunity-boost",
  component: ImmunityBoostPage,
});

const digestionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health-remedies/digestion",
  component: DigestionPage,
});

const weightManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health-remedies/weight-management",
  component: WeightManagementPage,
});

const diabetesBPRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health-remedies/diabetes-bp",
  component: DiabetesBPPage,
});

const stressSleepRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health-remedies/stress-sleep",
  component: StressSleepPage,
});

const skinCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-care",
  component: SkinCarePage,
});

const naturalGlowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-care/natural-glow",
  component: NaturalGlowPage,
});

const acneTreatmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-care/acne-treatment",
  component: AcneTreatmentPage,
});

const pigmentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-care/pigmentation",
  component: PigmentationPage,
});

const antiAgingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-care/anti-aging",
  component: AntiAgingPage,
});

const diyFacePacksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-care/diy-face-packs",
  component: DIYFacePacksPage,
});

const hairCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair-care",
  component: HairCarePage,
});

const hairFallTreatmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair-care/hair-fall-treatment",
  component: HairFallTreatmentPage,
});

const hairGrowthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair-care/hair-growth",
  component: HairGrowthPage,
});

const dandruffScalpCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair-care/dandruff-scalp-care",
  component: DandruffScalpCarePage,
});

const greyHairSolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair-care/grey-hair-solutions",
  component: GreyHairSolutionsPage,
});

const oilsMasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair-care/oils-masks",
  component: OilsMasksPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogPostDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogPostDetailPage,
});

const createBlogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/create-post",
  component: CreateBlogPostPage,
});

const editBlogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/edit-post/$id",
  component: EditBlogPostPage,
});

const adminPostsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/posts",
  component: AdminPostsPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});

const termsOfServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms-of-service",
  component: TermsOfServicePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  healthRemediesRoute,
  immunityBoostRoute,
  digestionRoute,
  weightManagementRoute,
  diabetesBPRoute,
  stressSleepRoute,
  skinCareRoute,
  naturalGlowRoute,
  acneTreatmentRoute,
  pigmentationRoute,
  antiAgingRoute,
  diyFacePacksRoute,
  hairCareRoute,
  hairFallTreatmentRoute,
  hairGrowthRoute,
  dandruffScalpCareRoute,
  greyHairSolutionsRoute,
  oilsMasksRoute,
  blogRoute,
  blogPostDetailRoute,
  createBlogPostRoute,
  editBlogPostRoute,
  adminPostsRoute,
  privacyPolicyRoute,
  termsOfServiceRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
