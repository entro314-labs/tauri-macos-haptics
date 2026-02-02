/*
 * Bindings for tauri_macos_haptics
 * https://github.com/entro314-labs/tauri-macos-haptics/
 *
 * Provides haptic feedback functionality for macOS Tauri applications through
 * the NSHapticFeedbackManager API.
 *
 * @packageDocumentation
 */
import { invoke } from "@tauri-apps/api/core";

const CMD_PERFORM = "plugin:tauri-macos-haptics|perform";
const CMD_IS_SUPPORTED = "plugin:tauri-macos-haptics|is_supported";

let pluginSupported: boolean | null = null;

/**
 * Represents the different types of haptic feedback patterns available on macOS.
 *
 * Each pattern provides a different tactile sensation appropriate for specific interactions.
 *
 * @see {@link https://developer.apple.com/documentation/appkit/nshapticfeedbackmanager/feedbackpattern | Apple's NSHapticFeedbackPattern Documentation}
 *
 * @example
 * ```typescript
 * import { HapticFeedbackPattern, perform } from 'tauri-macos-haptics-api';
 *
 * // Use Alignment when dragging objects into position
 * await perform(HapticFeedbackPattern.Alignment);
 *
 * // Use LevelChange when moving between discrete levels
 * await perform(HapticFeedbackPattern.LevelChange);
 *
 * // Use Generic for general purpose feedback
 * await perform(HapticFeedbackPattern.Generic);
 * ```
 */
export enum HapticFeedbackPattern {
  /**
   * A haptic feedback pattern for alignment operations.
   *
   * Use this when the user is dragging an object into alignment with another object,
   * such as:
   * - Aligning shapes in a drawing application
   * - Snapping to grid positions
   * - Reaching minimum/maximum bounds
   * - Positioning objects at preferred locations
   */
  Alignment = 0,

  /**
   * A haptic feedback pattern for discrete level changes.
   *
   * Use this when transitioning between discrete levels or states, such as:
   * - Adjusting volume or brightness in steps
   * - Switching between preset values
   * - Moving through a multi-level accelerator
   *
   * This pattern is specifically designed for multilevel accelerator buttons.
   */
  LevelChange = 1,

  /**
   * A general-purpose haptic feedback pattern.
   *
   * Use this when no other specific pattern applies, or for general
   * confirmation of user actions.
   */
  Generic = 2,
}

/**
 * Specifies when haptic feedback should be provided to the user.
 *
 * @see {@link https://developer.apple.com/documentation/appkit/nshapticfeedbackmanager/performancetime | Apple's PerformanceTime Documentation}
 *
 * @example
 * ```typescript
 * import { HapticFeedbackPattern, PerformanceTime, perform } from 'tauri-macos-haptics-api';
 *
 * // Immediate feedback
 * await perform(HapticFeedbackPattern.Generic, PerformanceTime.Now);
 *
 * // Feedback synchronized with next draw
 * await perform(HapticFeedbackPattern.Alignment, PerformanceTime.DrawCompleted);
 * ```
 */
export enum PerformanceTime {
  /**
   * The system chooses the most appropriate time for feedback.
   *
   * This allows the system to optimize the timing based on current
   * conditions and user preferences.
   */
  Default = 0,

  /**
   * Provide haptic feedback immediately.
   *
   * Use this for instant response to user actions.
   */
  Now = 1,

  /**
   * Provide haptic feedback after the next screen update completes.
   *
   * Use this to synchronize haptic feedback with visual changes,
   * ensuring the tactile sensation occurs when the visual update
   * is visible to the user.
   */
  DrawCompleted = 2,
}

/**
 * Custom error class for haptic feedback related errors.
 *
 * @example
 * ```typescript
 * try {
 *   await perform(HapticFeedbackPattern.Generic);
 * } catch (error) {
 *   if (error instanceof HapticError) {
 *     console.error('Haptic feedback failed:', error.message);
 *   }
 * }
 * ```
 */
export class HapticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HapticError";
  }
}

/**
 * Checks if haptic feedback is supported on the current device.
 *
 * This function caches the result after the first call for better performance.
 * Haptic feedback requires:
 * - macOS 10.11 (OS X El Capitan) or later
 * - Compatible haptic hardware (Force Touch trackpad)
 *
 * @returns A promise that resolves to `true` if haptic feedback is supported, `false` otherwise.
 *
 * @example
 * ```typescript
 * import { isSupported, perform, HapticFeedbackPattern } from 'tauri-macos-haptics-api';
 *
 * if (await isSupported()) {
 *   await perform(HapticFeedbackPattern.Generic);
 * } else {
 *   console.log('Haptic feedback not available on this device');
 * }
 * ```
 *
 * @remarks
 * Even when this returns `true`, individual haptic feedback calls may not produce
 * feedback if:
 * - The user is not touching the trackpad
 * - The user has disabled haptics in System Preferences
 * - The hardware doesn't support the requested feedback type
 */
export async function isSupported(): Promise<boolean> {
  if (pluginSupported === null) {
    try {
      pluginSupported = await invoke<boolean>(CMD_IS_SUPPORTED);
    } catch (error) {
      pluginSupported = false;
      console.warn("Failed to check haptic support:", error);
    }
  }
  return pluginSupported;
}

/**
 * Performs haptic feedback with the specified pattern and timing.
 *
 * **⚠️ IMPORTANT USAGE GUIDELINES:**
 * - Only call this in response to user-initiated actions
 * - Accompany haptic feedback with visual feedback (highlights, animations, etc.)
 * - Avoid excessive or unnecessary haptic feedback
 * - Don't use for events that are not user-initiated
 *
 * Excessive haptic feedback may be interpreted as a malfunction and could lead users
 * to disable haptics entirely.
 *
 * @param pattern - The haptic feedback pattern to use (defaults to Generic)
 * @param performanceTime - When to perform the feedback (defaults to Default)
 *
 * @returns A promise that resolves when the feedback has been queued
 *
 * @throws {HapticError} If the haptic feedback fails to perform
 *
 * @example
 * ```typescript
 * import { perform, HapticFeedbackPattern, PerformanceTime } from 'tauri-macos-haptics-api';
 *
 * // Basic usage with defaults
 * await perform();
 *
 * // Specific pattern and timing
 * await perform(HapticFeedbackPattern.Alignment, PerformanceTime.Now);
 *
 * // With error handling
 * try {
 *   await perform(HapticFeedbackPattern.LevelChange);
 * } catch (error) {
 *   console.error('Haptic feedback failed:', error);
 * }
 * ```
 *
 * @remarks
 * The system may override this call in some cases:
 * - If the trackpad is not being touched
 * - If haptics are disabled in system preferences
 * - If the hardware doesn't support the pattern
 *
 * @see {@link https://developer.apple.com/documentation/appkit/nshapticfeedbackperformer/1441738-perform | Apple's performFeedbackPattern Documentation}
 */
export async function perform(
  pattern: HapticFeedbackPattern = HapticFeedbackPattern.Generic,
  performanceTime: PerformanceTime = PerformanceTime.Default
): Promise<void> {
  try {
    await invoke<void>(CMD_PERFORM, {
      pattern,
      performanceTime,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new HapticError(`Failed to perform haptic feedback: ${errorMessage}`);
  }
}
