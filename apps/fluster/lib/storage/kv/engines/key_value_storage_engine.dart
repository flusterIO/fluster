abstract class KeyValueStorageEngine {
  const KeyValueStorageEngine();

  /// Returns a boolean indicating whether or not the value is stored in the database.
  bool exists(String id);
  Future<double> saveDouble(String id, double newValue);
  Future<double> readDouble(String id);
  Future<String> saveString(String id, String newValue);
  Future<String> readString(String id);
  Future<bool> saveBool(String id, bool newValue);
  Future<bool> readBool(String id);
}
