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
/// * `2` -> Generic
/// * Any other value -> `Err`
#[cfg(target_os = "macos")]
fn pattern_from_u64(value: u64) -> Result<HapticPattern, String> {
    match value {
        0 => Ok(HapticPattern::Alignment),
        1 => Ok(HapticPattern::LevelChange),
        2 => Ok(HapticPattern::Generic),
        _ => Err(format!(
            "Unknown haptic feedback pattern {value} (expected 0=Alignment, 1=LevelChange, 2=Generic)."
        )),
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
/// * Any other value -> `Err`
#[cfg(target_os = "macos")]
fn performance_time_from_u64(value: u64) -> Result<PerformanceTime, String> {
    match value {
        0 => Ok(PerformanceTime::Default),
        1 => Ok(PerformanceTime::Now),
        2 => Ok(PerformanceTime::DrawCompleted),
        _ => Err(format!(
            "Unknown haptic performance time {value} (expected 0=Default, 1=Now, 2=DrawCompleted)."
        )),
    }
}

/// Check if haptic feedback is supported on this system.
///
/// Returns true on macOS and false on every other platform. This reports platform
/// support only: macOS has no public API to detect a Force Touch trackpad, so feedback
/// can still go unfelt on hardware without one.
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
/// * `Err(String)` - `pattern` or `performance_time` is outside the ranges above,
///   or the platform is not macOS
///
/// # Platform Support
/// * macOS: Supported on 10.11+; feedback is only felt on haptic-capable hardware
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
        let pattern = pattern_from_u64(pattern)?;
        let performance_time = performance_time_from_u64(performance_time)?;
        HapticFeedbackManager::default_performer().perform(pattern, Some(performance_time));
        Ok(())
    }

    #[cfg(not(target_os = "macos"))]
    Err("Haptic feedback is only supported on macOS.".to_string())
}

#[cfg(all(test, target_os = "macos"))]
mod tests {
    use super::*;

    #[test]
    fn pattern_mapping_matches_frontend_enum() {
        let cases = [
            (0, Ok(HapticPattern::Alignment)),
            (1, Ok(HapticPattern::LevelChange)),
            (2, Ok(HapticPattern::Generic)),
        ];
        for (value, expected) in cases {
            assert_eq!(pattern_from_u64(value), expected, "pattern {value}");
        }
        for value in [3, 42, u64::MAX] {
            assert!(
                pattern_from_u64(value).is_err(),
                "pattern {value} must be rejected"
            );
        }
    }

    #[test]
    fn performance_time_mapping_matches_frontend_enum() {
        let cases = [
            (0, Ok(PerformanceTime::Default)),
            (1, Ok(PerformanceTime::Now)),
            (2, Ok(PerformanceTime::DrawCompleted)),
        ];
        for (value, expected) in cases {
            assert_eq!(performance_time_from_u64(value), expected, "time {value}");
        }
        for value in [3, 42, u64::MAX] {
            assert!(
                performance_time_from_u64(value).is_err(),
                "time {value} must be rejected"
            );
        }
    }

    #[test]
    fn perform_rejects_out_of_range_arguments() {
        let cases = [(3, 0), (0, 3), (u64::MAX, u64::MAX)];
        for (pattern, time) in cases {
            let result = tauri::async_runtime::block_on(perform(pattern, time));
            assert!(result.is_err(), "perform({pattern}, {time}) must fail");
        }
    }
}
