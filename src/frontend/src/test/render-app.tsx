import { Layout } from "@/components/Layout";
import AboutPage from "@/pages/AboutPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { expect } from "vitest";

/**
 * Builds the same route tree `App.tsx` declares, but on a memory history so a
 * test can start at any URL and assert on the URL the app navigates to. The
 * route definitions are duplicated here on purpose: `App.tsx` owns the real
 * tree, and a test that imported it would boot the production router with no
 * way to seed a starting location.
 */
function buildRouteTree() {
  const rootRoute = createRootRoute({ component: Layout });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  });
  const koleksiRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/koleksi",
    component: CatalogPage,
  });
  const produkRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/produk/$slug",
    component: ProductDetailPage,
  });
  const tentangRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/tentang",
    component: AboutPage,
  });
  const kontakRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/kontak",
    component: ContactPage,
  });

  return rootRoute.addChildren([
    indexRoute,
    koleksiRoute,
    produkRoute,
    tentangRoute,
    kontakRoute,
  ]);
}

export interface RenderAppResult {
  /** The router instance, typed from the concrete route tree built above. */
  router: ReturnType<typeof buildRouter>;
  /** The current URL path plus query string, e.g. `/koleksi?kategori=Sarung`. */
  currentUrl: () => string;
}

function buildRouter(initialPath: string) {
  return createRouter({
    routeTree: buildRouteTree(),
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}

/**
 * Renders the app at `initialPath` inside a memory-history router and waits for
 * the first route to resolve. Returns the router so a test can read the URL
 * after an interaction.
 *
 * The provider stack mirrors `main.tsx` minus `InternetIdentityProvider`, which
 * the actor mock replaces. Retries are disabled so a rejected mutation surfaces
 * immediately instead of being retried into a timeout.
 */
export async function renderApp(
  initialPath: string,
  ui?: ReactElement,
): Promise<RenderAppResult> {
  const router = buildRouter(initialPath);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      {ui ?? <RouterProvider router={router} />}
    </QueryClientProvider>,
  );

  await waitFor(() => {
    expect(router.state.status).toBe("idle");
  });

  return {
    router,
    currentUrl: () => {
      const { pathname, searchStr } = router.state.location;
      return `${pathname}${searchStr}`;
    },
  };
}

/** Convenience re-export so journey tests do not import RTL directly. */
export { screen, waitFor };
