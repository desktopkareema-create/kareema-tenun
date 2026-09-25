import type { ProductFilter } from "@/backend";
import type { ContactMessage, Product } from "@/types";
import { ProductSort } from "@/types";

/**
 * A typed local stand-in for the canister actor the app's hooks receive from
 * `useActor`. It implements exactly the public methods the frontend calls, so a
 * test can assert on the filter the UI sent and control the data returned
 * without a network or a replica.
 *
 * This is a mock, not the backend: a suite built on it passes identically
 * against a canister whose methods are unimplemented stubs. The PocketIC lane
 * is what exercises the real canister.
 */
export interface ActorMock {
  listProducts(filter: ProductFilter): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  listCategories(): Promise<string[]>;
  listFeaturedProducts(): Promise<Product[]>;
  submitContactMessage(
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
  ): Promise<ContactMessage>;
}

export interface ActorMockOptions {
  products?: Product[];
  categories?: string[];
  featured?: Product[];
  /** Returned by `getProductBySlug`; `null` models a missing product. */
  productBySlug?: Product | null;
  /** When set, `submitContactMessage` rejects with this error. */
  submitError?: Error;
}

export interface ActorMockHandle {
  actor: ActorMock;
  /** Every `listProducts` filter the UI has sent, in call order. */
  listProductsCalls: ProductFilter[];
  /** Every `submitContactMessage` argument tuple, in call order. */
  submitCalls: [string, string, string, string, string][];
}

/**
 * Applies the same filter/sort semantics the backend documents, so a journey
 * that filters or sorts sees a realistic result set rather than a fixed list.
 */
function applyFilter(products: Product[], filter: ProductFilter): Product[] {
  const term = (filter.search ?? "").toLowerCase();
  const category = filter.category;

  const matched = products.filter((product) => {
    const categoryOk = category === undefined || product.category === category;
    const searchOk = term === "" || product.name.toLowerCase().includes(term);
    return categoryOk && searchOk;
  });

  return [...matched].sort((a, b) => {
    switch (filter.sort) {
      case ProductSort.priceLowToHigh:
        return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
      case ProductSort.priceHighToLow:
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
      default:
        return a.createdAt > b.createdAt
          ? -1
          : a.createdAt < b.createdAt
            ? 1
            : 0;
    }
  });
}

export function createActorMock(
  options: ActorMockOptions = {},
): ActorMockHandle {
  const products = options.products ?? [];
  const categories =
    options.categories ?? [...new Set(products.map((p) => p.category))].sort();
  const featured = options.featured ?? products.filter((p) => p.featured);
  const listProductsCalls: ProductFilter[] = [];
  const submitCalls: [string, string, string, string, string][] = [];

  const actor: ActorMock = {
    async listProducts(filter) {
      listProductsCalls.push(filter);
      return applyFilter(products, filter);
    },
    async getProductBySlug(slug) {
      if (options.productBySlug !== undefined) return options.productBySlug;
      return products.find((product) => product.slug === slug) ?? null;
    },
    async listCategories() {
      return categories;
    },
    async listFeaturedProducts() {
      return featured;
    },
    async submitContactMessage(name, email, phone, subject, message) {
      submitCalls.push([name, email, phone, subject, message]);
      if (options.submitError) throw options.submitError;
      return {
        id: BigInt(submitCalls.length),
        name,
        email,
        phone,
        subject,
        message,
        createdAt: 1758326400000n,
      };
    },
  };

  return { actor, listProductsCalls, submitCalls };
}
