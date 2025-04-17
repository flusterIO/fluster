abstract class KeyValueStorageEngine<T> {
    final String uniqueKey;
    final T defaultValue;
    const KeyValueStorageEngine({required this.uniqueKey, required this.defaultValue});

    /// Returns a boolean indicating whether or not the value is stored in the database.
    bool exists();
    Future<T> read();
    Future<T> save();
    Future<T> update(T newValue);
}
