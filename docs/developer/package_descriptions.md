# Package Descriptions

## Fluster Cli

`fluster_cli`

A work in progress that will be a quick utility to access specific data from the command line.

## Fluster Grpc

`fluster_grpc`

This is a placeholder for now, but will be the middle-man between the `crate::api::data_interface::database` and `fluster_native_interface` package when remote deployment is available.

## Fluster Internal Workspace

`fluster_internal_workspace`

This package is just some useful Golang utilities that are used by the build script.

## Fluster Logger

`fluster_logger`

Just like the name implies, this package creates a file system based logger on the user's main system, while remote instances (the user's mobile device) send their logs to the main system to be logged accordingly.

## Fluster Models

`fluster_models`

This is the core of Fluster, as far as data structure. This package in many ways acts as a schema for Fluster's SurrealDb instance, and generates about half of the types used by cross-language packages. The other ~half comes from the Grpc package.

## Fluster Native Interface

`fluster_native_interface`

This package is the engine of sorts behind Fluster. It's relatively small, but all of the heavy lifting that would usually handled by Dart in Flutter appliciations is now handled by this packages, or by one of it's dependencies listed here. This package will be deployed as part of every application, regardless of platform for significant performance benefits.

Enabling this interface with rust means Fluster can pass user Numpy packages ported to C natively in their plot functions, and output can be generated with unmatched performance and reliability.

## Fluster Py03

`fluster_py03`

This package is used by the `fluster_native_interface` package to implement various AI and machine learning related tasks, given the industry's inexplicable preference for Python. In time it will also grow to be accessible to developers as an interface to their own Fluster data.

## Fluster Ts

`fluster_ts`

This package is the user facing typescript package. This should not be confused with `fluster_embedded_typescript` which is used internally by Fluser to embed React components where applicable.

## Fluster Embedded Typescript

`fluster_embedded_typescript`

This app is used internally by Fluster to render React components in a webview where applicable. The parsing of mdx is actually passed off to node, as there is currently no mdx parser written in rust that will work with the remark and rehype ecosystem, which is crucial for the capabilities of Fluster.

## Fluster Embedded Components

`fluster_embedded_components`

These are Fluster's native embeddable React components. These are embedded in the rendered mdx, _not_ the Rust binary like `fluster_embedded_typescript` is.
