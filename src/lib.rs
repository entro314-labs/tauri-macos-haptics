use tauri::{
    Runtime,
    plugin::{Builder, TauriPlugin},
};

mod commands;

#[cfg(target_os = "macos")]
pub mod haptics;

/// Initialize the macOS haptics plugin.
///
/// This function should be called in your Tauri app's setup to register the haptic feedback commands.
///
/// # Example
/// ```rust,no_run
/// fn main() {
///     let mut builder = tauri::Builder::default();
///
///     #[cfg(target_os = "macos")]
///     {
///         builder = builder.plugin(tauri_macos_haptics::init());
///     }
///
///     builder
///         .run(tauri::generate_context!())
///         .expect("error while running tauri application");
/// }
/// ```
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("tauri-macos-haptics")
        .invoke_handler(tauri::generate_handler![
            commands::is_supported,
            commands::perform
        ])
        .build()
}

/// Check if haptic feedback is supported on the current system.
///
/// Returns true on macOS systems. Note that NSHapticFeedbackManager was introduced
/// with OS X El Capitan version 10.11 (released in 2015). Modern Rust versions
/// and Tauri applications typically run on much newer macOS versions.
///
/// For non-macOS platforms, this always returns false.
///
/// # Platform Notes
/// - **macOS 10.11+**: Full haptic feedback support on compatible hardware
/// - **Other platforms**: Not supported
///
/// # Example
/// ```rust
/// # #[cfg(target_os = "macos")]
/// if tauri_macos_haptics::is_supported() {
///     // Haptic feedback is available
/// }
/// ```
///
/// See [Apple's documentation](https://developer.apple.com/documentation/appkit/nshapticfeedbackmanager)
pub fn is_supported() -> bool {
    // NSHapticFeedbackManager was introduced with OS X El Capitan version 10.11
    // Since this plugin requires Rust 1.77+ and Tauri 2.9+, which only run on
    // modern systems, we can safely assume macOS 10.11+ is available.
    // The actual haptic feedback may still not occur if:
    // - The user isn't touching the trackpad
    // - The hardware doesn't support haptics
    // - The user has disabled haptics in system preferences
    #[cfg(target_os = "macos")]
    {
        true
    }

    #[cfg(not(target_os = "macos"))]
    {
        false
    }
}
