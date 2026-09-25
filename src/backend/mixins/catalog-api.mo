import Map "mo:core/Map";
import Types "../types/catalog";
import CatalogLib "../lib/catalog";

mixin (
  products : Map.Map<Types.Id, Types.Product>,
  contactMessages : Map.Map<Types.Id, Types.ContactMessage>,
  state : { var nextContactMessageId : Nat },
) {
  /// Lists products with optional category filter, name search, and sort order.
  public query func listProducts(filter : Types.ProductFilter) : async [Types.Product] {
    CatalogLib.listProducts(products, filter);
  };

  /// Returns a product by id, or null when it does not exist.
  public query func getProduct(id : Types.Id) : async ?Types.Product {
    CatalogLib.getProduct(products, id);
  };

  /// Returns a product by slug, or null when it does not exist.
  public query func getProductBySlug(slug : Text) : async ?Types.Product {
    CatalogLib.getProductBySlug(products, slug);
  };

  /// Returns the distinct product categories.
  public query func listCategories() : async [Text] {
    CatalogLib.listCategories(products);
  };

  /// Returns the featured products.
  public query func listFeaturedProducts() : async [Types.Product] {
    CatalogLib.listFeaturedProducts(products);
  };

  /// Submits a contact message and returns the stored record.
  public shared func submitContactMessage(
    name : Text,
    email : Text,
    phone : Text,
    subject : Text,
    message : Text,
  ) : async Types.ContactMessage {
    CatalogLib.submitContactMessage(contactMessages, state, name, email, phone, subject, message);
  };
};
