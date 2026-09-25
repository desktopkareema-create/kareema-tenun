import { createActor } from "@/backend";
import type { ProductFilter } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(filter: ProductFilter = {}) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: [
      "products",
      filter.category ?? null,
      filter.search ?? null,
      filter.sort ?? null,
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductBySlug(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProductBySlug(slug);
    },
    enabled: !!actor && !isFetching && slug.length > 0,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface ContactMessageInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function useSubmitContactMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      if (!actor) throw new Error("Backend belum siap. Coba lagi sebentar.");
      return actor.submitContactMessage(
        input.name,
        input.email,
        input.phone,
        input.subject,
        input.message,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },
  });
}
