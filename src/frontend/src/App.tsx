import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import AboutPage from "@/pages/AboutPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import {
  Link,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

function NotFoundPage() {
  return (
    <section
      data-ocid="not_found.page"
      className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-28 text-center lg:px-8"
    >
      <p className="font-mono text-accent text-xs tracking-[0.3em]">404</p>
      <h1 className="mt-6 text-3xl sm:text-4xl">Halaman Tidak Ditemukan</h1>
      <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed">
        Halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada.
        Silakan kembali ke beranda untuk menjelajahi koleksi KAREEMA.
      </p>
      <Button
        asChild
        className="mt-9 rounded-none font-display text-xs tracking-[0.18em] uppercase"
      >
        <Link to="/" data-ocid="not_found.home_button">
          Kembali ke Beranda
        </Link>
      </Button>
    </section>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFoundPage,
});

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

const routeTree = rootRoute.addChildren([
  indexRoute,
  koleksiRoute,
  produkRoute,
  tentangRoute,
  kontakRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
