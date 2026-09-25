import Common "../types/common";

module {
  public type Timestamp = Common.Timestamp;
  public type Id = Common.Id;

  /// A tenun product offered by KAREEMA.
  public type Product = {
    id : Id;
    name : Text;
    slug : Text;
    category : Text;
    /// Price in whole Rupiah, e.g. 1425000 renders as "Rp 1.425.000".
    price : Nat;
    description : Text;
    material : Text;
    size : Text;
    motif : Text;
    /// Image URLs, first entry is the primary image.
    images : [Text];
    featured : Bool;
    createdAt : Timestamp;
  };

  /// A message submitted through the contact form.
  public type ContactMessage = {
    id : Id;
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    createdAt : Timestamp;
  };

  /// Sort order for the product listing.
  public type ProductSort = {
    #newest;
    #priceLowToHigh;
    #priceHighToLow;
  };

  /// Filter and sort options for listing products.
  public type ProductFilter = {
    category : ?Text;
    search : ?Text;
    sort : ?ProductSort;
  };
};
