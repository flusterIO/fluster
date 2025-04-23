import 'package:async_redux/async_redux.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/util/state_logger.dart';

final globalReduxStore = Store<GlobalAppState>(
  initialState: GlobalAppState.initialState(),
  actionObservers: [DevelopmentStateLogger()],
  // middleware: [
  // The following middleware both achieve the same goal: Load search
  // results from github in response to SearchActions.
  //
  // One is implemented as a normal middleware, the other is implemented as
  // an epic for demonstration purposes.
  // SearchMiddleware(GithubClient()),
  // EpicMiddleware<SearchState>(SearchEpic(GithubClient())),
  // ],
);
