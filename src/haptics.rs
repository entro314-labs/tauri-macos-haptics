use objc2::rc::Retained;
use objc2::runtime::ProtocolObject;
use objc2_app_kit::{NSHapticFeedbackManager, NSHapticFeedbackPerformer};

// Re-export the types from objc2_app_kit for convenience
pub use objc2_app_kit::NSHapticFeedbackPattern as HapticPattern;
pub use objc2_app_kit::NSHapticFeedbackPerformanceTime as PerformanceTime;

/// Wrapper for the NSHapticFeedbackManager Objective-C class using modern objc2 framework.
///
/// This provides a safe and idiomatic Rust interface to macOS haptic feedback system.
///
/// # Example
/// **IMPORTANT**: Use this only in response to user-initiated actions.
/// Ideally, visual feedback, such as a highlight or appearance of an alignment guide, should accompany the feedback.
///
/// ```rust,no_run
/// fn provide_feedback() {
///     #[cfg(target_os = "macos")]
///     {
///         use tauri_macos_haptics::haptics::*;
///         // Performs a generic haptic feedback immediately.
///         let _ = HapticFeedbackManager::default_performer()
///             .perform(HapticPattern::Generic, None);
///     }
/// }
/// ```
///
/// Note: Haptic feedback is only supported on macOS 10.11 (OS X El Capitan) and above.
///
/// See [Apple's documentation](https://developer.apple.com/documentation/appkit/nshapticfeedbackmanager)
pub struct HapticFeedbackManager {
    performer: Retained<ProtocolObject<dyn NSHapticFeedbackPerformer>>,
}

impl HapticFeedbackManager {
    /// Returns the default performer for haptic feedback.
    ///
    /// This corresponds to the [defaultPerformer](https://developer.apple.com/documentation/appkit/nshapticfeedbackmanager/1441752-defaultperformer) class method.
    ///
    /// # Returns
    /// A new `HapticFeedbackManager` instance configured with the system's default performer.
    pub fn default_performer() -> Self {
        let performer = NSHapticFeedbackManager::defaultPerformer();
        Self { performer }
    }

    /// Performs haptic feedback with the specified pattern and timing.
    ///
    /// This corresponds to the [performFeedbackPattern:performanceTime:](https://developer.apple.com/documentation/appkit/nshapticfeedbackperformer/1441738-perform) method.
    ///
    /// # IMPORTANT!
    /// Call this method only in response to user-initiated actions. Ideally, visual feedback,
    /// such as a highlight or appearance of an alignment guide, should accompany the feedback.
    ///
    /// # Arguments
    /// * `pattern` - The haptic feedback pattern to use (Alignment, LevelChange, or Generic)
    /// * `performance_time` - When to perform the haptic feedback. If None, defaults to `Now`
    ///
    /// # Returns
    /// A Result indicating success or an error if the operation failed.
    ///
    /// # Example
    /// ```rust,no_run
    /// # use tauri_macos_haptics::haptics::*;
    /// let manager = HapticFeedbackManager::default_performer();
    /// manager.perform(HapticPattern::Alignment, Some(PerformanceTime::Now))?;
    /// # Ok::<(), tauri::Error>(())
    /// ```
    pub fn perform(
        &self,
        pattern: HapticPattern,
        performance_time: Option<PerformanceTime>,
    ) -> Result<(), tauri::Error> {
        let ptime = performance_time.unwrap_or(PerformanceTime::Now);
        self.performer
            .performFeedbackPattern_performanceTime(pattern, ptime);
        Ok(())
    }
}
