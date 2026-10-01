# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The crate and the npm package
share one version.

## [Unreleased]

## [4.0.2] - 2026-10-01

### Changed

- The Rust crate now requires Rust 1.99.0 or newer (minimum supported Rust version raised from 1.98.1). ([be9999c](https://github.com/entro314-labs/tauri-macos-haptics/commit/be9999c))

## [4.0.1] - 2026-09-28

### Fixed

- The example app now sets a Content Security Policy instead of `csp: null`. It allows only the app's own assets, Tauri IPC and `data:` images. The plugin README points to this example, so its configuration can now be copied as a starting point. ([61175e4](https://github.com/entro314-labs/tauri-macos-haptics/commit/61175e4))
- In the example app, the slider's step markers and value bubble now line up with the thumb across the whole track. ([af48d1b](https://github.com/entro314-labs/tauri-macos-haptics/commit/af48d1b))

## [4.0.0] - 2026-09-28

### Changed (breaking)

- Register the plugin on every platform (`[dependencies]`, `.plugin(tauri_macos_haptics::init())` without a `cfg` gate). On other platforms `isSupported()` resolves `false` from the backend and `perform()` rejects.
- JavaScript: `isSupported()` rejects with a `HapticError` when the command cannot be reached (plugin not registered, permission missing) instead of logging a warning and caching `false`. A failed check is no longer cached. Apps that registered the plugin only on macOS must register it everywhere.
- Rust: `HapticFeedbackManager::perform` returns `()` instead of a `Result` that could never be an error. Remove any `?`, `.expect()` or `.unwrap()` on the call.
- Rust: `perform(pattern, None)` now plays at `PerformanceTime::Default` (the system chooses) instead of `Now`, the same default as the JavaScript `perform()`. Pass `Some(PerformanceTime::Now)` for the old timing.

### Added

- `HapticError` keeps the original IPC error as its `cause`.

### Changed

- The published crate no longer contains the npm build files (`package.json`, pnpm lockfile and workspace file, `tsconfig.json`, `tsdown.config.ts`).
- The crate depends on `tauri` with `default-features = false`, matching the official Tauri plugins, so it no longer turns Tauri's default features (including the `wry` runtime) back on in apps that disable them. The unused `serde` dependency was removed.

### Fixed

- The crate is released on the same version as the npm package again. crates.io stayed at 3.1.0 through the 3.2.x releases, so the Rust MSRV change from 3.2.1 reaches crates.io with this release.
- Windows and Linux builds of an app using the plugin no longer print unused-variable warnings from the plugin.
- `isSupported()` / `is_supported()` documentation now states that the result reflects platform support only; macOS offers no public API to detect a Force Touch trackpad, and the previous docs claimed hardware detection that never happened.
- README and example README list the current requirements (Rust 1.98.1, edition 2024, Tauri 2), the correct install version, and the `pnpm example` script that actually exists.
- `perform` now rejects a pattern or performance time outside the documented values (for example `perform(7)`) with an error instead of silently playing `Generic` feedback at the `Default` time. In JavaScript the call rejects with a `HapticError`.

## [3.2.3] - 2026-09-26

### Fixed

- The JavaScript package builds and publishes again with its TypeScript type declarations. The v3.2.2 npm publish failed during type declaration generation, so v3.2.3 is the npm release that contains the v3.2.2 changes. The public API is unchanged. ([6e19101](https://github.com/entro314-labs/tauri-macos-haptics/commit/6e19101))

## [3.2.2] - 2026-09-26

### Changed

- The minimum supported Rust version is now 1.98.1 (was 1.98.0). ([8f9058f](https://github.com/entro314-labs/tauri-macos-haptics/commit/8f9058f))

## [3.2.1] - 2026-09-26

### Changed

- The minimum supported Rust version is now 1.98.1, up from 1.98.0. Projects built with Rust 1.98.0 need to update their toolchain before upgrading. ([8f9058f](https://github.com/entro314-labs/tauri-macos-haptics/commit/8f9058f))

## [3.2.0] - 2026-08-20

### Added
- macOS trackpad haptic feedback: Rust commands plus the TypeScript bindings and types for triggering feedback patterns from a Tauri app. ([bfec38f](https://github.com/entro314-labs/tauri-macos-haptics/commit/bfec38f))
### Changed
- The crate now requires Rust 1.98.0 or newer and builds on edition 2024; Node.js 24.19.0 or newer is recommended for the JavaScript package. ([d1fdba4](https://github.com/entro314-labs/tauri-macos-haptics/commit/d1fdba4), [1ac235c](https://github.com/entro314-labs/tauri-macos-haptics/commit/1ac235c))
- The JavaScript package is now emitted with an `esnext` target, so consumers on older bundlers or runtimes may need to transpile it themselves. ([0e6cab4](https://github.com/entro314-labs/tauri-macos-haptics/commit/0e6cab4))
- The documented setup example uses the current `tauri::Builder` registration syntax. ([a601f6d](https://github.com/entro314-labs/tauri-macos-haptics/commit/a601f6d))

## [3.0.0] - 2026-07-16

Toolchain and dependency release. No API changes.

### Changed

- Minimum Rust version 1.97.0, edition 2024.
- `objc2` 0.6.4 and `objc2-app-kit` 0.3.2.

### Fixed

- The `init()` doc example compiles under `cargo test --doc`; it previously required a `tauri.conf.json`.
- Resolved the `clippy::needless_doctest_main` warning.

## [2.0.1] - 2026-02-01

Modernization of the original `tauri-plugin-macos-haptics` for Tauri 2.

### Changed

- **Breaking:** migrated from the deprecated `objc`/`cocoa` crates to `objc2` 0.6 and `objc2-app-kit` 0.3.
- **Breaking:** minimum Rust version 1.77 and Tauri 2.9.
- `perform()` in JavaScript throws instead of only logging when feedback fails.

### Added

- `HapticError` class for failures from the JavaScript API.
- JSDoc and Rust doc comments for every public item.

[Unreleased]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v4.0.2...HEAD
[4.0.2]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v3.2.3...v4.0.0
[3.2.3]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v3.2.2...v3.2.3
[3.2.2]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v3.2.1...v3.2.2
[3.2.1]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v3.0.0...v3.2.0
[3.0.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/v2.0.1...v3.0.0
[2.0.1]: https://github.com/entro314-labs/tauri-macos-haptics/releases/tag/v2.0.1
