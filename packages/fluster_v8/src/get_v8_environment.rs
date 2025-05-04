use v8::ContextOptions;

fn test_fn() {}

/// Reeturns the straightforward v8 context, without all of the Fluster specific modifications
/// applied.
pub fn run_javascript_min(code_string: &str, n_threads: u32) {
    let platform = v8::new_default_platform(n_threads, true).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();
    let mut isolate = v8::Isolate::new(Default::default());

    let handle_scope = &mut v8::HandleScope::new(&mut isolate);

    let context = v8::Context::new(handle_scope, ContextOptions::default());
    let scope = &mut v8::ContextScope::new(handle_scope, context);
    let code = v8::String::new(scope, code_string).unwrap();
    let script = v8::Script::compile(scope, code, None).unwrap();
    let res = script.run(scope).unwrap();
}

/// Returns a v8 engine with all of Fluster's functions applied and made to be accessibile
/// globally.
pub fn run_javascript_full(code_string: &str, n_threads: u32) {
    let platform = v8::new_default_platform(n_threads, true).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();
    let mut isolate = v8::Isolate::new(Default::default());

    let handle_scope = &mut v8::HandleScope::new(&mut isolate);

    let context = v8::Context::new(handle_scope, ContextOptions::default());
    let scope = &mut v8::ContextScope::new(handle_scope, context);
    let code = v8::String::new(scope, code_string).unwrap();
    let script = v8::Script::compile(scope, code, None).unwrap();
    let res = script.run(scope).unwrap();
}
