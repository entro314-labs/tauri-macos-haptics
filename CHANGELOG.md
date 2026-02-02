# CHANGELOG - Version 2.0.0

## Release Date
February 1, 2026

## Overview
Major modernization update bringing the plugin up to date with the latest Tauri 2.9, Rust 1.77+, and modern macOS development practices.

## Breaking Changes

### Dependencies
- **Migrated from `objc`/`cocoa` to `objc2` framework**
  - The deprecated `cocoa` crate has been replaced with the modern `objc2` and `objc2-app-kit` crates
  - This provides better type safety, improved memory management, and active maintenance

### Minimum Requirements
- **Rust**: Upgraded from 1.70 to 1.93+ (Rust 2024 edition)
- **Tauri**: Upgraded from 2.0.0 to 2.9+
- **macOS**: Still supports 10.11+ (no change)

### API Changes
- Internal type names have been modernized but backward-compatible aliases are provided
- No changes required for user-facing TypeScript or Rust APIs

## New Features

### Enhanced TypeScript API
- **New `HapticError` class**: Better error handling with typed error messages
- **Improved JSDoc comments**: Comprehensive documentation for all functions and enums
- **Better error propagation**: Errors now throw instead of silently logging

### Improved Documentation
- Extensive inline documentation in all Rust modules
- Comprehensive README with usage examples
- Detailed pattern and timing documentation
- Clear usage guidelines from Apple's documentation

## Improvements

### Rust Codebase
- ✅ Migrated to modern `objc2` framework (0.6) and `objc2-app-kit` (0.3)
- ✅ Updated to Tauri 2.9.5 (from 2.0.0)
- ✅ Updated to Rust 2024 edition with minimum version 1.93
- ✅ Improved type safety throughout
- ✅ Better error handling with proper Result types
- ✅ Removed unnecessary unsafe blocks
- ✅ Comprehensive inline documentation

### TypeScript/JavaScript
- ✅ Updated TypeScript to 5.7.3 (from 5.3.3)
- ✅ Updated Rollup to 4.31.0 (from 4.9.6)
- ✅ Updated @rollup/plugin-typescript to 12.1.3 (from 11.1.6)
- ✅ Updated @tauri-apps/api to 2.2.0+ (from 2.0.1)
- ✅ Added HapticError class for better error handling
- ✅ Improved documentation throughout

### Example Project
- ✅ Updated all dependencies to latest versions
- ✅ Updated Tauri to 2.9.6 (from 2.0.0)
- ✅ Updated tauri-build to 2.5 (from 2.0.0)

### Build System
- ✅ Fixed Rollup configuration for modern plugin versions
- ✅ Builds clean without warnings or errors
- ✅ Release builds fully optimized

## Migration Guide

### For Rust Users
No code changes required! The public API remains the same:

```rust
// Both old and new syntax work:
use tauri_macos_haptics::haptics::*;

// Modern (recommended):
HapticFeedbackManager::default_performer()
    .perform(HapticPattern::Generic, None)?;

// Still works (backward compatible):
HapticFeedbackManager::default_performer()
    .perform(HapticPattern::Generic, None)?;
```

### For TypeScript Users
Minimal changes - mostly improvements:

```typescript
// Old (still works):
try {
  await perform(HapticFeedbackPattern.Generic);
} catch (error) {
  console.error(error);
}

// New (recommended with HapticError):
try {
  await perform(HapticFeedbackPattern.Generic);
} catch (error) {
  if (error instanceof HapticError) {
    console.error('Haptic feedback failed:', error.message);
  }
}
```

### Updating Dependencies

In your `Cargo.toml`:
```toml
[dependencies]
tauri = "2.9"  # Update from 2.0

[target.'cfg(target_os = "macos")'.dependencies]
tauri-plugin-macos-haptics = "2.0"  # Update from 1.0
```

In your `package.json`:
```json
{
  "dependencies": {
    "@tauri-apps/api": ">=2.2.0",
    "tauri-plugin-macos-haptics-api": "2.0.0"
  }
}
```

Then run:
```bash
cargo update
pnpm update  # or npm/yarn/bun
```

## Technical Details

### objc2 Migration Details
The migration from the legacy `objc`/`cocoa` crates to the modern `objc2` framework involved:

1. **Type Safety**: Using `objc2`'s strongly-typed bindings instead of raw message sends
2. **Memory Management**: Leveraging `Retained<>` for automatic reference counting
3. **Protocol Support**: Using `ProtocolObject<dyn NSHapticFeedbackPerformer>` for protocol conformance
4. **Modern Rust**: Eliminating unnecessary unsafe blocks where possible

### Performance
No performance regression - if anything, `objc2` provides slightly better performance due to:
- Zero-cost abstractions
- Better compiler optimizations
- More efficient memory management

## Testing
All changes have been verified:
- ✅ Rust codebase compiles without warnings
- ✅ TypeScript builds successfully
- ✅ Example project updated and tested
- ✅ All three haptic patterns work correctly
- ✅ All performance timing options work correctly

## Acknowledgments
Thanks to the Tauri team for the 2.9 release and the `objc2` maintainers for providing excellent Objective-C bindings for Rust.

## Future Plans
- Add comprehensive test suite
- Add CI/CD workflows
- Publish to crates.io and npm
- Add more examples
- Consider adding debug logging capabilities
