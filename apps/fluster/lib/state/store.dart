import 'package:async_redux/async_redux.dart';
import 'package:fluster/state/global/global_state.dart';

final globalReduxStore = Store<GlobalAppState>(
  initialState: GlobalAppState.initialState(),
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
