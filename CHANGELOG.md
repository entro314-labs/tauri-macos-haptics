# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The crate and the npm package
share one version.

## [Unreleased]

## [5.0.0] - 2026-11-03

### ⚠ BREAKING CHANGES

- isSupported() rejects instead of resolving false when ([782515a](https://github.com/entro314-labs/tauri-macos-haptics/commit/782515a))
- HapticFeedbackManager::perform returns () instead of ([157186f](https://github.com/entro314-labs/tauri-macos-haptics/commit/157186f))

### Features

- register the plugin on every platform and surface failed support checks ([782515a](https://github.com/entro314-labs/tauri-macos-haptics/commit/782515a))
- keep the IPC error as HapticError's cause ([c1b0079](https://github.com/entro314-labs/tauri-macos-haptics/commit/c1b0079))
- add macOS haptics support with commands and types ([bfec38f](https://github.com/entro314-labs/tauri-macos-haptics/commit/bfec38f))

### Bug Fixes

- **example:** set a Content Security Policy ([61175e4](https://github.com/entro314-labs/tauri-macos-haptics/commit/61175e4))
- **example:** line the slider steps and value bubble up with the thumb ([af48d1b](https://github.com/entro314-labs/tauri-macos-haptics/commit/af48d1b))
- **example:** follow the system dark mode and unclutter the slider ([bfe318d](https://github.com/entro314-labs/tauri-macos-haptics/commit/bfe318d))
- **example:** apply the release profile and drop unused crates ([90b6ce3](https://github.com/entro314-labs/tauri-macos-haptics/commit/90b6ce3))
- **commands:** build warning-free on non-macOS targets ([c0a3091](https://github.com/entro314-labs/tauri-macos-haptics/commit/c0a3091))
- **release:** put the crate back on the npm package's version line ([f5664ed](https://github.com/entro314-labs/tauri-macos-haptics/commit/f5664ed))
- **example:** handle rejected slider haptics like the other controls ([46e5cec](https://github.com/entro314-labs/tauri-macos-haptics/commit/46e5cec))
- **example:** use the local JS bindings instead of the npm release ([01bee67](https://github.com/entro314-labs/tauri-macos-haptics/commit/01bee67))
- **example:** migrate to SolidStart 2 so the example builds again ([f09f5f4](https://github.com/entro314-labs/tauri-macos-haptics/commit/f09f5f4))
- **deps:** stop forcing tauri default features and drop unused serde ([12e47f0](https://github.com/entro314-labs/tauri-macos-haptics/commit/12e47f0))
- **commands:** reject unknown haptic pattern and timing values ([3b6a1a2](https://github.com/entro314-labs/tauri-macos-haptics/commit/3b6a1a2))
- **build:** point dts generation at typescript@next's tsgo binary ([6e19101](https://github.com/entro314-labs/tauri-macos-haptics/commit/6e19101))
- update Rust version to 1.77+ and change edition to 2021 in documentation and configuration files ([d1fdba4](https://github.com/entro314-labs/tauri-macos-haptics/commit/d1fdba4))
- update package metadata and set publish to false in example Cargo.toml ([e27bc2d](https://github.com/entro314-labs/tauri-macos-haptics/commit/e27bc2d))

### Dependencies

- **deps:** update npm and Cargo dependencies across root and example ([0766f02](https://github.com/entro314-labs/tauri-macos-haptics/commit/0766f02))
- **deps:** remove unused @tailwindcss/postcss from the plugin package ([c8157ce](https://github.com/entro314-labs/tauri-macos-haptics/commit/c8157ce))
- **deps:** update Tauri JS packages to 2.12 ([5348522](https://github.com/entro314-labs/tauri-macos-haptics/commit/5348522))
- **deps:** update JS dependencies and track TypeScript next ([a680085](https://github.com/entro314-labs/tauri-macos-haptics/commit/a680085))

### Documentation

- **changelog:** lead the unreleased notes with the breaking changes ([11273be](https://github.com/entro314-labs/tauri-macos-haptics/commit/11273be))
- **changelog:** consolidate into one Keep a Changelog file ([d6c1d6b](https://github.com/entro314-labs/tauri-macos-haptics/commit/d6c1d6b))
- document the test commands and the example's install step ([86759bd](https://github.com/entro314-labs/tauri-macos-haptics/commit/86759bd))
- **example:** add the example's own install step to the manual setup ([4cf3664](https://github.com/entro314-labs/tauri-macos-haptics/commit/4cf3664))
- correct support-detection claims and stale requirements ([12f918a](https://github.com/entro314-labs/tauri-macos-haptics/commit/12f918a))

### Code Refactoring

- **example:** position traffic lights natively and drop tauri-plugin-decorum ([4c9e6ab](https://github.com/entro314-labs/tauri-macos-haptics/commit/4c9e6ab))
- make Rust perform infallible and default to system timing ([157186f](https://github.com/entro314-labs/tauri-macos-haptics/commit/157186f))
- update example in lib.rs to use new tauri::Builder syntax ([a601f6d](https://github.com/entro314-labs/tauri-macos-haptics/commit/a601f6d))
- replace Rollup configuration with tsdown for building TypeScript project ([58e5ba1](https://github.com/entro314-labs/tauri-macos-haptics/commit/58e5ba1))

### Continuous Integration

- check the crate and JS bindings on macOS and Windows ([1ce5e46](https://github.com/entro314-labs/tauri-macos-haptics/commit/1ce5e46))

### Tests

- cover the JS bindings' IPC contract with node:test ([d30fe35](https://github.com/entro314-labs/tauri-macos-haptics/commit/d30fe35))

### Styles

- **example:** apply the example's Prettier config ([ff3218c](https://github.com/entro314-labs/tauri-macos-haptics/commit/ff3218c))

### Miscellaneous Chores

- update @tauri-apps/api and related dependencies ([be9999c](https://github.com/entro314-labs/tauri-macos-haptics/commit/be9999c))
- **example:** sync Cargo.lock with the 4.0.0 plugin crate ([7f55b03](https://github.com/entro314-labs/tauri-macos-haptics/commit/7f55b03))
- keep the CI workflow out of the published crate ([84f4a6b](https://github.com/entro314-labs/tauri-macos-haptics/commit/84f4a6b))
- track Cargo.lock for the crate and the example ([9d54f6b](https://github.com/entro314-labs/tauri-macos-haptics/commit/9d54f6b))
- **example:** regenerate Tauri ACL schemas without decorum ([333884b](https://github.com/entro314-labs/tauri-macos-haptics/commit/333884b))
- **example:** drop the orphaned vite-env.d.ts and tests include ([9eb573e](https://github.com/entro314-labs/tauri-macos-haptics/commit/9eb573e))
- keep the npm build files out of the published crate ([decee69](https://github.com/entro314-labs/tauri-macos-haptics/commit/decee69))
- keep the JS test suite out of the published crate ([ffb5c35](https://github.com/entro314-labs/tauri-macos-haptics/commit/ffb5c35))
- updated various packages to newer versions ([7cb0c52](https://github.com/entro314-labs/tauri-macos-haptics/commit/7cb0c52))
- update rust-version to 1.97.1 and Node.js recommendation to 24.19.0+ ([1ac235c](https://github.com/entro314-labs/tauri-macos-haptics/commit/1ac235c))
- bump version to 2.0.5 and update dependencies in package.json and pnpm-lock.yaml ([b545b8e](https://github.com/entro314-labs/tauri-macos-haptics/commit/b545b8e))
- update deps in rust and js packages ([7feb6ae](https://github.com/entro314-labs/tauri-macos-haptics/commit/7feb6ae))
- update TypeScript target to esnext and add new files ([0e6cab4](https://github.com/entro314-labs/tauri-macos-haptics/commit/0e6cab4))
- bump version to 2.0.1 in Cargo.toml ([a4c944d](https://github.com/entro314-labs/tauri-macos-haptics/commit/a4c944d))

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

[Unreleased]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@5.0.0...HEAD
[5.0.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@4.0.2...tauri-macos-haptics-api@5.0.0
[4.0.2]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@4.0.1...tauri-macos-haptics-api@4.0.2
[4.0.1]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@4.0.0...tauri-macos-haptics-api@4.0.1
[4.0.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@3.2.3...tauri-macos-haptics-api@4.0.0
[3.2.3]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@3.2.2...tauri-macos-haptics-api@3.2.3
[3.2.2]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@3.2.1...tauri-macos-haptics-api@3.2.2
[3.2.1]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@3.2.0...tauri-macos-haptics-api@3.2.1
[3.2.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@3.0.0...tauri-macos-haptics-api@3.2.0
[3.0.0]: https://github.com/entro314-labs/tauri-macos-haptics/compare/tauri-macos-haptics-api@2.0.1...tauri-macos-haptics-api@3.0.0
[2.0.1]: https://github.com/entro314-labs/tauri-macos-haptics/releases/tag/tauri-macos-haptics-api@2.0.1
