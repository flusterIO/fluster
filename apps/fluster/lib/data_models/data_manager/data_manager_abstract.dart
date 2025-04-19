import 'package:fluster/static/settings/settings_root.dart';

/// These DataManager classes work as the middleman, seperating flutter from the 'backend' in Rust. This is necessary to allow for a seamless transition between local, file system methods working in the most efficient way possible, and a remote grpc instance that maintains all type safety.
abstract class DataManager {
  const DataManager();
  Future<Settings> saveSettings(Settings newSettings);
}
