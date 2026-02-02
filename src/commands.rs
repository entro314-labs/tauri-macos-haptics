use tauri::command;

#[cfg(target_os = "macos")]
use crate::haptics::*;

/// Convert a u64 value to HapticPattern.
///
/// This is used for the frontend API where patterns are passed as numbers.
///
/// # Mapping
/// * `0` -> Alignment
/// * `1` -> LevelChange
/// * `2` or any other value -> Generic (default)
#[cfg(target_os = "macos")]
fn pattern_from_u64(value: u64) -> HapticPattern {
    match value {
        0 => HapticPattern::Alignment,
        1 => HapticPattern::LevelChange,
        2 => HapticPattern::Generic,
        _ => HapticPattern::Generic, // Default to Generic for unknown values
    }
}

/// Convert a u64 value to PerformanceTime.
///
/// This is used for the frontend API where timing is passed as numbers.
///
/// # Mapping
/// * `0` -> Default (system decides)
/// * `1` -> Now (immediate)
/// * `2` -> DrawCompleted (after next screen update)
/// * Any other value -> Default
#[cfg(target_os = "macos")]
fn performance_time_from_u64(value: u64) -> PerformanceTime {
    match value {
        0 => PerformanceTime::Default,
        1 => PerformanceTime::Now,
        2 => PerformanceTime::DrawCompleted,
        _ => PerformanceTime::Default, // Default for unknown values
    }
}

/// Check if haptic feedback is supported on this system.
///
/// Returns true on macOS 10.11+ systems with haptic-capable hardware.
/// Always returns false on non-macOS platforms.
///
/// # Example (Frontend)
/// ```typescript
/// import { isSupported } from 'tauri-macos-haptics-api';
///
/// if (await isSupported()) {
///   // Safe to use haptic feedback
/// }
/// ```
#[command]
pub async fn is_supported() -> bool {
    crate::is_supported()
}

/// Perform haptic feedback with the specified pattern and timing.
///
/// # Arguments
/// * `pattern` - The haptic feedback pattern (0=Alignment, 1=LevelChange, 2=Generic)
/// * `performance_time` - When to perform (0=Default, 1=Now, 2=DrawCompleted)
///
/// # Returns
/// * `Ok(())` - Feedback was performed successfully
/// * `Err(String)` - An error occurred (with description)
///
/// # Platform Support
/// * macOS: Fully supported on 10.11+ with haptic-capable hardware
/// * Other platforms: Returns error
///
/// # Example (Frontend)
/// ```typescript
/// import { perform, HapticFeedbackPattern, PerformanceTime } from 'tauri-macos-haptics-api';
///
/// await perform(HapticFeedbackPattern.Generic, PerformanceTime.Now);
/// ```
#[command]
pub async fn perform(pattern: u64, performance_time: u64) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        HapticFeedbackManager::default_performer()
            .perform(
                pattern_from_u64(pattern),
                Some(performance_time_from_u64(performance_time)),
            )
            .map_err(|e| e.to_string())
    }

    #[cfg(not(target_os = "macos"))]
    Err("Haptic feedback is only supported on macOS.".to_string())
}
