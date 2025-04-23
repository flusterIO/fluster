import 'package:fluster/core/storage/kv/engines/key_value_storage_engine.dart';

// RESUME: Implement the key-value storage engine here, so it can be easily swapped with surreal in the future.
class SharedPreferencesEngine extends KeyValueStorageEngine {
  const SharedPreferencesEngine();

  @override
  bool exists(String id) {
    // TODO: implement exists
    throw UnimplementedError();
  }

  @override
  Future<bool> readBool(String id) {
    // TODO: implement readBool
    throw UnimplementedError();
  }

  @override
  Future<double> readDouble(String id) {
    // TODO: implement readDouble
    throw UnimplementedError();
  }

  @override
  Future<String> readString(String id) {
    // TODO: implement readString
    throw UnimplementedError();
  }

  @override
  Future<bool> saveBool(String id, bool newValue) {
    // TODO: implement saveBool
    throw UnimplementedError();
  }

  @override
  Future<double> saveDouble(String id, double newValue) {
    // TODO: implement saveDouble
    throw UnimplementedError();
  }

  @override
  Future<String> saveString(String id, String newValue) {
    // TODO: implement saveString
    throw UnimplementedError();
  }
}
