import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type Product = {
    id : Nat;
    name : Text;
    slug : Text;
    category : Text;
    price : Nat;
    description : Text;
    material : Text;
    size : Text;
    motif : Text;
    images : [Text];
    featured : Bool;
    createdAt : Nat;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    createdAt : Nat;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    products : Map.Map<Nat, Product>;
    contactMessages : Map.Map<Nat, ContactMessage>;
    state : { var nextContactMessageId : Nat };
  };

  func product(
    id : Nat,
    name : Text,
    slug : Text,
    category : Text,
    price : Nat,
    description : Text,
    material : Text,
    size : Text,
    motif : Text,
    images : [Text],
    featured : Bool,
    createdAt : Nat,
  ) : Product {
    {
      id;
      name;
      slug;
      category;
      price;
      description;
      material;
      size;
      motif;
      images;
      featured;
      createdAt;
    };
  };

  public func migration(_old : {}) : NewActor {
    let products = Map.empty<Nat, Product>();
    products.add(
      1,
      product(
        1,
        "Sarung Tenun Kedawung",
        "sarung-tenun-kedawung",
        "Sarung",
        1425000,
        "Sarung tenun tangan khas Jepara dengan motif Kedawung yang klasik. Ditenun secara tradisional sehingga setiap helainya memiliki karakter dan kehangatan tersendiri.",
        "Katun tenun ATBM",
        "200 x 110 cm",
        "Kedawung",
        ["/assets/generated/products/sarung-kedawung-1.dim_1024x1280.jpg", "/assets/generated/products/sarung-kedawung-2.dim_1024x1280.jpg", "/assets/generated/products/sarung-kedawung-3.dim_1024x1280.jpg"],
        true,
        1758326400000,
      ),
    );
    products.add(
      2,
      product(
        2,
        "Kain Tenun Ampel",
        "kain-tenun-ampel",
        "Kain",
        1850000,
        "Kain tenun Ampel dengan warna hangat dan tekstur rapat. Cocok untuk bahan busana formal maupun koleksi kain tenun berkualitas.",
        "Katun tenun ATBM",
        "250 x 115 cm",
        "Ampel",
        ["/assets/generated/products/kain-ampel-1.dim_1024x1280.jpg", "/assets/generated/products/kain-ampel-2.dim_1024x1280.jpg", "/assets/generated/products/kain-ampel-3.dim_1024x1280.jpg"],
        true,
        1758240000000,
      ),
    );
    products.add(
      3,
      product(
        3,
        "Selendang Tenun Gapuro Mantingan",
        "selendang-tenun-gapuro-mantingan",
        "Selendang",
        975000,
        "Selendang tenun dengan motif Gapuro Mantingan yang lembut dan jatuh. Ringan dipakai untuk acara resmi maupun sehari-hari.",
        "Katun tenun ATBM",
        "180 x 60 cm",
        "Gapuro Mantingan",
        ["/assets/generated/products/selendang-gapuro-mantingan-1.dim_1024x1280.jpg", "/assets/generated/products/selendang-gapuro-mantingan-2.dim_1024x1280.jpg", "/assets/generated/products/selendang-gapuro-mantingan-3.dim_1024x1280.jpg"],
        false,
        1758153600000,
      ),
    );
    products.add(
      4,
      product(
        4,
        "Kain Tenun Sicengkir",
        "kain-tenun-sicengkir",
        "Kain",
        1650000,
        "Kain tenun Sicengkir dengan susunan motif geometris yang tegas. Ditenun oleh perajin Jepara dengan benang pilihan.",
        "Katun tenun ATBM",
        "240 x 110 cm",
        "Sicengkir",
        ["/assets/generated/products/kain-sicengkir-1.dim_1024x1280.jpg", "/assets/generated/products/kain-sicengkir-2.dim_1024x1280.jpg", "/assets/generated/products/kain-sicengkir-3.dim_1024x1280.jpg"],
        false,
        1758067200000,
      ),
    );
    products.add(
      5,
      product(
        5,
        "Selendang Tenun Belik",
        "selendang-tenun-belik",
        "Selendang",
        890000,
        "Selendang tenun Belik berwarna kalem dengan pinggiran rapi. Pilihan tepat untuk melengkapi penampilan yang anggun.",
        "Katun tenun ATBM",
        "175 x 55 cm",
        "Belik",
        ["/assets/generated/products/selendang-belik-1.dim_1024x1280.jpg", "/assets/generated/products/selendang-belik-2.dim_1024x1280.jpg", "/assets/generated/products/selendang-belik-3.dim_1024x1280.jpg"],
        false,
        1757980800000,
      ),
    );
    products.add(
      6,
      product(
        6,
        "Kemeja Tenun Kedawung",
        "kemeja-tenun-kedawung",
        "Kemeja",
        1250000,
        "Kemeja tenun Kedawung dengan potongan modern dan motif tradisional. Nyaman dipakai untuk acara formal maupun santai.",
        "Katun tenun ATBM",
        "M, L, XL",
        "Kedawung",
        ["/assets/generated/products/kemeja-kedawung-1.dim_1024x1280.jpg", "/assets/generated/products/kemeja-kedawung-2.dim_1024x1280.jpg", "/assets/generated/products/kemeja-kedawung-3.dim_1024x1280.jpg"],
        true,
        1757894400000,
      ),
    );
    products.add(
      7,
      product(
        7,
        "Blus Tenun Ampel",
        "blus-tenun-ampel",
        "Blus",
        1150000,
        "Blus tenun Ampel dengan siluet feminin dan detail motif halus. Ringan dan adem untuk pemakaian sepanjang hari.",
        "Katun tenun ATBM",
        "S, M, L",
        "Ampel",
        ["/assets/generated/products/blus-ampel-1.dim_1024x1280.jpg", "/assets/generated/products/blus-ampel-2.dim_1024x1280.jpg", "/assets/generated/products/blus-ampel-3.dim_1024x1280.jpg"],
        false,
        1757808000000,
      ),
    );
    products.add(
      8,
      product(
        8,
        "Sarung Tenun Gapuro Mantingan",
        "sarung-tenun-gapuro-mantingan",
        "Sarung",
        1575000,
        "Sarung tenun Gapuro Mantingan dengan motif khas yang halus dan warna menenangkan. Ditenun rapi dengan bahan katun pilihan.",
        "Katun tenun ATBM",
        "200 x 110 cm",
        "Gapuro Mantingan",
        ["/assets/generated/products/sarung-gapuro-mantingan-1.dim_1024x1280.jpg", "/assets/generated/products/sarung-gapuro-mantingan-2.dim_1024x1280.jpg", "/assets/generated/products/sarung-gapuro-mantingan-3.dim_1024x1280.jpg"],
        false,
        1757721600000,
      ),
    );
    products.add(
      9,
      product(
        9,
        "Tas Tenun Sicengkir",
        "tas-tenun-sicengkir",
        "Aksesori",
        450000,
        "Tas tenun Sicengkir yang kuat dan ringan, cocok untuk pelengkap gaya sehari-hari dengan sentuhan etnik Jepara.",
        "Katun tenun ATBM",
        "30 x 25 x 10 cm",
        "Sicengkir",
        ["/assets/generated/products/tas-sicengkir-1.dim_1024x1280.jpg", "/assets/generated/products/tas-sicengkir-2.dim_1024x1280.jpg", "/assets/generated/products/tas-sicengkir-3.dim_1024x1280.jpg"],
        false,
        1757635200000,
      ),
    );
    products.add(
      10,
      product(
        10,
        "Ikat Pinggang Tenun Belik",
        "ikat-pinggang-tenun-belik",
        "Aksesori",
        385000,
        "Ikat pinggang tenun Belik dengan motif sederhana namun elegan. Melengkapi busana tenun Anda dengan detail yang pas.",
        "Katun tenun ATBM",
        "Panjang 110 cm",
        "Belik",
        ["/assets/generated/products/ikat-pinggang-belik-1.dim_1024x1280.jpg", "/assets/generated/products/ikat-pinggang-belik-2.dim_1024x1280.jpg", "/assets/generated/products/ikat-pinggang-belik-3.dim_1024x1280.jpg"],
        false,
        1757548800000,
      ),
    );

    {
      accessControlState = AccessControl.initState();
      products;
      contactMessages = Map.empty();
      state = { var nextContactMessageId = 1 };
    };
  };
};
