import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/catalog";

module {
  /// Returns every product, applying the optional category filter, name search,
  /// and sort order.
  public func listProducts(
    products : Map.Map<Types.Id, Types.Product>,
    filter : Types.ProductFilter,
  ) : [Types.Product] {
    let term = switch (filter.search) {
      case (?s) { s.toLower() };
      case null { "" };
    };
    let category = filter.category;

    let matched = products.values().filter(
      func(product) {
        let categoryOk = switch (category) {
          case (?c) { product.category == c };
          case null { true };
        };
        let searchOk = term == "" or product.name.toLower().contains(#text term);
        categoryOk and searchOk;
      }
    );

    let sorted = matched.toArray().sort(
      func(a, b) {
        switch (filter.sort) {
          case (?#priceLowToHigh) { Nat.compare(a.price, b.price) };
          case (?#priceHighToLow) { Nat.compare(b.price, a.price) };
          case _ { Nat.compare(b.createdAt, a.createdAt) };
        };
      }
    );
    sorted;
  };

  /// Returns a single product by its numeric id.
  public func getProduct(
    products : Map.Map<Types.Id, Types.Product>,
    id : Types.Id,
  ) : ?Types.Product {
    products.get(id);
  };

  /// Returns a single product by its URL slug.
  public func getProductBySlug(
    products : Map.Map<Types.Id, Types.Product>,
    slug : Text,
  ) : ?Types.Product {
    products.values().find(func(product) = product.slug == slug);
  };

  /// Returns the distinct category names present in the catalog.
  public func listCategories(products : Map.Map<Types.Id, Types.Product>) : [Text] {
    let seen = Map.empty<Text, Bool>();
    for (product in products.values()) {
      seen.add(product.category, true);
    };
    seen.keys().toArray().sort();
  };

  /// Returns the products flagged as featured.
  public func listFeaturedProducts(products : Map.Map<Types.Id, Types.Product>) : [Types.Product] {
    products.values().filter(func(product) = product.featured).toArray().sort(
      func(a, b) = Nat.compare(b.createdAt, a.createdAt)
    );
  };

  /// Stores a contact message and returns the stored record.
  public func submitContactMessage(
    contactMessages : Map.Map<Types.Id, Types.ContactMessage>,
    state : { var nextContactMessageId : Nat },
    name : Text,
    email : Text,
    phone : Text,
    subject : Text,
    message : Text,
  ) : Types.ContactMessage {
    if (name.trim(#char ' ') == "") {
      Runtime.trap("Nama wajib diisi");
    };
    if (email.trim(#char ' ') == "") {
      Runtime.trap("Email wajib diisi");
    };
    if (message.trim(#char ' ') == "") {
      Runtime.trap("Pesan wajib diisi");
    };

    let id = state.nextContactMessageId;
    state.nextContactMessageId := id + 1;

    let record : Types.ContactMessage = {
      id;
      name;
      email;
      phone;
      subject;
      message;
      createdAt = (Time.now() / 1_000_000).toNat();
    };
    contactMessages.add(id, record);
    record;
  };
};
