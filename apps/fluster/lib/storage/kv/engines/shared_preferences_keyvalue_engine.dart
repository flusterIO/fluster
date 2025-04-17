import 'package:fluster/storage/kv/engines/key_value_storage_engine.dart';


// TODO: Implement the key-value storage engine here, so it can be easily swapped with surreal in the future.
class SharedPreferencesEngine<T> extends KeyValueStorageEngine<T> {
    const SharedPreferencesEngine({required super.defaultValue, required super.uniqueKey});

  @override
  bool exists() {
    // TODO: implement exists
    throw UnimplementedError();
  }

  @override
  Future<T> read() {
    // TODO: implement read
    throw UnimplementedError();
  }

  @override
  Future<T> save() {
    // TODO: implement save
    throw UnimplementedError();
  }

  @override
  Future<T> update(T newValue) {
    // TODO: implement update
    throw UnimplementedError();
  }
}
