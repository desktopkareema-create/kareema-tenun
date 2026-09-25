import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Cell {
    value: Value;
    name: string;
}
export interface ContactMessage {
    id: Id;
    subject: string;
    name: string;
    createdAt: Timestamp;
    email: string;
    message: string;
    phone: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export type Id = bigint;
export interface Product {
    id: Id;
    motif: string;
    featured: boolean;
    name: string;
    createdAt: Timestamp;
    size: string;
    slug: string;
    description: string;
    category: string;
    price: bigint;
    material: string;
    images: Array<string>;
}
export interface ProductFilter {
    sort?: ProductSort;
    search?: string;
    category?: string;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum ProductSort {
    priceLowToHigh = "priceLowToHigh",
    newest = "newest",
    priceHighToLow = "priceHighToLow"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    execute(qJson: string): Promise<Result>;
    /**
     * / Returns the backend API documentation as Markdown.
     */
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Returns a product by id, or null when it does not exist.
     */
    getProduct(id: Id): Promise<Product | null>;
    /**
     * / Returns a product by slug, or null when it does not exist.
     */
    getProductBySlug(slug: string): Promise<Product | null>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Returns the distinct product categories.
     */
    listCategories(): Promise<Array<string>>;
    /**
     * / Returns the featured products.
     */
    listFeaturedProducts(): Promise<Array<Product>>;
    /**
     * / Lists products with optional category filter, name search, and sort order.
     */
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    schema(): Promise<string>;
    /**
     * / Submits a contact message and returns the stored record.
     */
    submitContactMessage(name: string, email: string, phone: string, subject: string, message: string): Promise<ContactMessage>;
}
