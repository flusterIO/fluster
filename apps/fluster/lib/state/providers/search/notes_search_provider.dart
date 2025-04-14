import 'package:hooks_riverpod/hooks_riverpod.dart';

// FIXME: Replace all of this with rust generated structs.
class NoteSummary {
    const NoteSummary();
}

class ListOfNoteSummaries {
  late List<NoteSummary> data;
}


final filteredTodos = Provider<ListOfNoteSummaries>((ref) {
  throw UnimplementedError();
  // final filter = ref.watch(todoFilterType.state);
  // final todos = ref.watch(todoListProvider);

  // switch (filter.state) {
  //   case TodoFilterType.completed:
  //     return ListOfTodoModel(
  //       data: todos.data.where((todo) => todo.isCompleted).toList(),
  //     );

  //   case TodoFilterType.active:
  //     return ListOfTodoModel(
  //       data: todos.data.where((todo) => !todo.isCompleted).toList(),
  //     );
  //   case TodoFilterType.pinned:
  //     return ListOfTodoModel(
  //       data: todos.data.where((todo) => todo.isPinned).toList(),
  //     );
  //   case TodoFilterType.all:
  //     return todos;
  // }
});
