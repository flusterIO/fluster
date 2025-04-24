# Developer Environment Setup

## Requirements

- [ ] Golang installed and available on the `Path`.
- [ ] Rust installed and with all available cargo commands available on the `Path`.
- [ ] [dotenvx](https://dotenvx.com/) installed. Available through Homebrew and a simple curl command.
- [ ] The dart package `test_cov_console` is used in some scripts as a globally available package to create a decent cli output while running tests.

## Environment Variables

- [ ] Create an environment variable, `FLUSTER_NATIVE_ROOT` and point it to the root of your workspace. This is used throughout the build utilities.
