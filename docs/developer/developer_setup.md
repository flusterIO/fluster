# Developer Environment Setup

## Requirements

- [ ] Golang installed and available on the `Path`.
- [ ] Rust installed and with all available cargo commands available on the `Path`.
- [ ] [dotenvx](https://dotenvx.com/) installed. Available through Homebrew and a simple curl command.
- [ ] The dart package `test_cov_console` is used in some scripts as a globally available package to create a decent cli output while running tests.
- [ ] [Tsx](https://www.npmjs.com/package/tsx) is used during part of the build script to execute typescript files. It needs to be available on your path, as any globally installed npm package likely already is.
- [ ] Use pnpm as your node package manager. This isn't really a strict requriement, but pnpm is referenced explictly in a few shebangs and package.json files, so it'll likely save you a headache.
- [ ] The [typeshare](https://crates.io/crates/typeshare) cli is used to generate cross-language types from rust during the build process. That will need to be installed and available locally.
- [ ] [gomarkdoc](https://github.com/princjef/gomarkdoc) is used to generate go documentation in markdown. Some build scripts will fail if this isnot installed globally.

## Environment Variables

- [ ] Create an environment variable, `FLUSTER_NATIVE_ROOT` and point it to the root of your workspace. This is used throughout the build utilities.
