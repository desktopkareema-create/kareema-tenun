import OQL "mo:caffeineai-oql";

module {
  /// Derives an OQL row value for a `[Text]` field, which has no built-in
  /// `_toRow`. The list is joined into a single searchable text column.
  public func _toRow(self : [Text]) : OQL.Value {
    #text(self.values().join(", "));
  };
};
