import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;

class StringSimilarityResult<T> {
  final T data;
  final double similarity;
  const StringSimilarityResult({required this.data, required this.similarity});
  static Iterable<T> fromArray<T>(
    List<T> items,
    String compareTo,
    String Function(T) getString,
    { double? threshold }
  ) {
    if(compareTo == "") {
     return items; 
    }
    final data = <StringSimilarityResult>[];
    final finalThreshold = threshold ?? 0.0;
    var similarity = 0.0;
    for (var item in items) {
      similarity = native.getTextSimilarity(a: getString(item), b: compareTo);
      if (similarity >= finalThreshold) {
        data.add(StringSimilarityResult(data: item, similarity: similarity));
      }
    }
    data.sort((a, b) => b.similarity.compareTo(a.similarity));
    return data.map((x) => x.data as T);
  }
}
