# macOS Haptics Plugin - Example App

This is a demonstration application showcasing the [tauri-macos-haptics](https://github.com/entro314-labs/tauri-macos-haptics) plugin in action with a modern SolidStart + Tauri setup.

<p align="center">
  <img src="plugin-demo.png" alt="Screenshot of the haptics example app" width="600" />
</p>

## What This Example Demonstrates

This example app showcases all the core features of the macOS Haptics plugin:

- **Step Slider**: Demonstrates `HapticFeedbackPattern.Alignment` - provides haptic feedback when dragging to align with discrete step positions
- **Toggle Switch**: Shows `HapticFeedbackPattern.LevelChange` - triggers haptic feedback when transitioning between on/off states
- **Support Detection**: Shows how to check if haptic feedback is available on the current device
- **Error Handling**: Implements proper error handling with the `HapticError` class

## System Requirements

⚠️ **macOS Only**: This plugin and example only work on macOS systems with haptic-capable hardware (Force Touch trackpad).

- **macOS**: 10.11 (OS X El Capitan) or later
- **Hardware**: Force Touch trackpad or compatible haptic hardware
- **Rust**: 1.77 or later (Rust 2021 edition)
- **Tauri**: 2.9 or later
- **Node.js**: 18+ recommended

## Running the Example

The example uses [PNPM](https://pnpm.io) as the package manager. You can also use npm, yarn, or bun with appropriate syntax adjustments.

### Quick Start

From the **root of the repository**:

```sh
pnpm run-example
```

This command will:
1. Build the TypeScript bindings for the plugin
2. Navigate to the example directory
3. Start the Tauri development server

### Manual Steps

If you prefer to run steps manually:

1. **Install dependencies** (from repository root):
   ```sh
   pnpm install
   ```

2. **Build the plugin bindings**:
   ```sh
   pnpm build
   ```

3. **Navigate to example and run**:
   ```sh
   cd example
   pnpm tauri dev
   ```

## Project Structure

```
example/
├── src/                      # SolidStart frontend code
│   ├── routes/
│   │   └── index.tsx        # Main page with haptics demo
│   └── components/
│       └── step-slider.tsx  # Slider component with haptics
├── src-tauri/               # Tauri backend (Rust)
│   ├── src/
│   │   ├── main.rs          # Entry point
│   │   └── lib.rs           # Plugin initialization
│   ├── Cargo.toml           # Rust dependencies
│   ├── tauri.conf.json      # Tauri configuration
│   └── capabilities/
│       └── main.json        # Plugin permissions
└── package.json             # Node dependencies
```

## Code Examples from This App

### Initializing the Plugin (Rust)

```rust
// src-tauri/src/lib.rs
use tauri::Builder;
use tauri_macos_haptics;

pub fn run() {
    let mut builder = Builder::default();

    #[cfg(target_os = "macos")]
    {
        builder = builder.plugin(tauri_macos_haptics::init());
    }

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Using Haptics in Frontend (TypeScript)

```typescript
// Step Slider with Alignment haptics
import {
  isSupported,
  perform,
  HapticFeedbackPattern,
  PerformanceTime
} from 'tauri-macos-haptics-api';

// Check device support
const supported = await isSupported();

if (supported) {
  // Trigger alignment haptic when dragging
  await perform(
    HapticFeedbackPattern.Alignment,
    PerformanceTime.Now
  );

  // Trigger level change haptic for toggle
  await perform(
    HapticFeedbackPattern.LevelChange,
    PerformanceTime.Now
  );
}
```

## Features Used

### SolidJS + SolidStart
- Modern reactive framework with excellent TypeScript support
- Vinxi for optimized builds
- File-based routing

### Tailwind CSS v4
- Modern utility-first CSS framework
- Configured for optimal Dark Mode support
- Smooth animations for UI transitions

### Tauri v2.9
- Native macOS integration
- Small binary size with optimized build settings
- Secure IPC between frontend and Rust backend

## Build Optimization

This example uses production-ready optimization settings in `Cargo.toml`:

```toml
[profile.release]
panic = "abort"   # No panic unwinding for smaller binary
codegen-units = 1 # Better optimization
lto = true        # Link-time optimization
opt-level = "s"   # Optimize for size
strip = true      # Remove debug symbols
```

These settings result in:
- Smaller binary size (~2-3MB on macOS)
- Faster startup time
- Reduced memory footprint

## Building for Production

To create a production build:

```sh
cd example
pnpm tauri build
```

The built application will be in `src-tauri/target/release/bundle/`.

## Permissions

The app requires the `tauri-macos-haptics:default` permission, which is configured in `src-tauri/capabilities/main.json`:

```json
{
  "permissions": [
    "tauri-macos-haptics:default"
  ]
}
```

This grants access to:
- `tauri-macos-haptics:allow-is-supported` - Check device support
- `tauri-macos-haptics:allow-perform` - Trigger haptic feedback

## Learn More

- **Plugin Repository**: [github.com/entro314-labs/tauri-macos-haptics](https://github.com/entro314-labs/tauri-macos-haptics)
- **Plugin Documentation**: See main [README.md](../README.md)
- **Tauri Docs**: [v2.tauri.app](https://v2.tauri.app/)
- **SolidStart Docs**: [start.solidjs.com](https://start.solidjs.com/)
- **Apple's Haptics Guide**: [NSHapticFeedbackManager](https://developer.apple.com/documentation/appkit/nshapticfeedbackmanager)

## Troubleshooting

### Haptics Not Working?

1. **Check Hardware**: Haptics require a Force Touch trackpad
2. **System Preferences**: Ensure haptics are enabled in System Preferences → Trackpad
3. **Touch Required**: Make sure you're touching the trackpad when triggering feedback
4. **Check Console**: Open the developer console (View → Developer → Toggle DevTools) for error messages

### Build Errors?

1. **Clean Build**: `cargo clean && pnpm tauri build`
2. **Update Dependencies**: `cargo update && pnpm update`
3. **Check Rust Version**: `rustc --version` (should be 1.77+)

## Contributing

Found issues or have improvements? Please contribute to the main repository:
https://github.com/entro314-labs/tauri-macos-haptics/issues

## License

MIT License - see [LICENSE](../LICENSE) for details.
