export class DefaultMap<K, V> extends Map<K, V> {
  constructor(
    private defaultValue: V,
    entries?: readonly (readonly [K, V])[] | null,
  ) {
    super(entries);
  }

  get(key: K) {
    return super.get(key) ?? this.defaultValue;
  }
}
