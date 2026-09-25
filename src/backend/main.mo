import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import Map "mo:core/Map";
import CatalogTypes "types/catalog";
import CatalogMixin "mixins/catalog-api";
import ApiDocMixin "mixins/api-doc";
import TextListValue "lib/text-list-value";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let products : Map.Map<CatalogTypes.Id, CatalogTypes.Product>;
  let contactMessages : Map.Map<CatalogTypes.Id, CatalogTypes.ContactMessage>;
  let state : { var nextContactMessageId : Nat };

  include CatalogMixin(products, contactMessages, state);
  include ApiDocMixin();

  include Expose({
    entities = [
      products.toEntity("product", "Product", "id")
        .sample({
          id = 0;
          name = "";
          slug = "";
          category = "";
          price = 0;
          description = "";
          material = "";
          size = "";
          motif = "";
          images = [];
          featured = false;
          createdAt = 0;
        })
        .public_()
        .build(),
      contactMessages.toEntity("contactMessage", "ContactMessage", "id")
        .sample({
          id = 0;
          name = "";
          email = "";
          phone = "";
          subject = "";
          message = "";
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
