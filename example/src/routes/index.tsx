import { open } from "@tauri-apps/plugin-shell";
import { createSignal, onMount } from "solid-js";
import {
  HapticFeedbackPattern,
  perform,
  PerformanceTime,
  isSupported,
} from "tauri-macos-haptics-api";
import StepSlider from "~/components/step-slider";
import Github from "~/icons/github";

export default function () {
  const [isEnabled, setIsEnabled] = createSignal(false);
  const [volume, setVolume] = createSignal(5);
  const [supported, setSupported] = createSignal(false);
  const [supportStatus, setSupportStatus] = createSignal<
    "checking" | "supported" | "unsupported"
  >("checking");

  const refreshSupport = async () => {
    try {
      const result = await isSupported();
      console.log("Haptics supported:", result);
      setSupported(result);
      setSupportStatus(result ? "supported" : "unsupported");
      return result;
    } catch (err) {
      console.error("Failed to check haptics support:", err);
      setSupported(false);
      setSupportStatus("unsupported");
      return false;
    }
  };

  const ensureSupport = async () => {
    if (supportStatus() === "checking") {
      await refreshSupport();
    }
    return supported();
  };

  // Check support on mount (client-only)
  onMount(() => {
    refreshSupport();
  });

  const handleToggle = async () => {
    setIsEnabled(!isEnabled());
    if (await ensureSupport()) {
      console.log("Triggering LevelChange haptic for toggle");
      perform(HapticFeedbackPattern.LevelChange, PerformanceTime.Now)
        .then(() => console.log("Haptic performed successfully"))
        .catch((err) => console.error("Haptic error:", err));
    }
  };

  const handleVolumeChange = async (delta: number) => {
    const newVolume = Math.max(0, Math.min(10, volume() + delta));
    if (newVolume !== volume()) {
      setVolume(newVolume);
      if (await ensureSupport()) {
        console.log("Triggering LevelChange haptic for volume:", newVolume);
        perform(HapticFeedbackPattern.LevelChange, PerformanceTime.Now)
          .then(() => console.log("Volume haptic performed"))
          .catch((err) => console.error("Volume haptic error:", err));
      }
    }
  };

  const handleButtonClick = async () => {
    if (await ensureSupport()) {
      console.log("Triggering Generic haptic for button");
      perform(HapticFeedbackPattern.Generic, PerformanceTime.Now)
        .then(() => console.log("Button haptic performed"))
        .catch((err) => console.error("Button haptic error:", err));
    }
  };

  return (
    <div class="app-shell">
      {/* Sidebar */}
      <aside class="app-sidebar">
        <div data-tauri-drag-region class="app-sidebar-header titlebar-left">
          <h1 class="app-sidebar-title">Haptics Demo</h1>
        </div>

        <nav class="app-sidebar-nav">
          <button class="sidebar-item active">
            Patterns
          </button>
          <button
            onClick={() => open("https://github.com/entro314-labs/tauri-macos-haptics")}
            class="sidebar-item"
          >
            <Github class="h-4 w-4 fill-current" />
            GitHub
          </button>
        </nav>

        <div class="app-status">
          {supportStatus() === "supported" ? (
            <div class="status-row success">
              <div class="status-dot success" />
              <span>Supported</span>
            </div>
          ) : supportStatus() === "unsupported" ? (
            <div class="status-row">
              <div class="status-dot muted" />
              <span>Not Available</span>
            </div>
          ) : (
            <div class="status-row">
              <div class="status-dot muted" />
              <span>Checking…</span>
            </div>
          )}
          {supportStatus() === "supported" && (
            <p class="status-note">
              Touch trackpad while interacting
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main class="app-main">
        <div data-tauri-drag-region class="app-toolbar">
          <h2 class="app-toolbar-title">Haptic Patterns</h2>
        </div>

        <div class="app-content">
          {/* Alignment Pattern - Slider */}
          <section class="app-panel">
            <div class="app-panel-header">
              <div class="app-panel-header-row">
                <h3 class="app-panel-title">Alignment</h3>
                <span class="app-panel-meta">Slider Control</span>
              </div>
              <p class="app-panel-description">
                Provides feedback when aligning to discrete positions
              </p>
            </div>
            <div class="app-panel-body">
              <StepSlider min={0} max={100} step={10} initialValue={50} />
            </div>
          </section>

          {/* Level Change Pattern - Toggle */}
          <section class="app-panel">
            <div class="app-panel-header">
              <div class="app-panel-header-row">
                <h3 class="app-panel-title">Level Change</h3>
                <span class="app-panel-meta">Toggle Switch</span>
              </div>
              <p class="app-panel-description">
                Triggers when transitioning between states
              </p>
            </div>
            <div class="app-panel-body app-center">
              <button
                type="button"
                class="toggle-switch"
                classList={{ active: isEnabled() }}
                onClick={handleToggle}
                aria-label="Toggle switch"
              >
                <div class="toggle-track" />
                <div class="toggle-thumb" />
              </button>
            </div>
          </section>

          {/* Level Change Pattern - Stepper */}
          <section class="app-panel">
            <div class="app-panel-header">
              <div class="app-panel-header-row">
                <h3 class="app-panel-title">Level Change</h3>
                <span class="app-panel-meta">Stepper Control</span>
              </div>
              <p class="app-panel-description">
                Feedback for incrementing through discrete values
              </p>
            </div>
            <div class="app-panel-body">
              <div class="stepper-row">
                <button
                  type="button"
                  class="stepper-button"
                  onClick={() => handleVolumeChange(-1)}
                  disabled={volume() <= 0}
                  aria-label="Decrease"
                >
                  −
                </button>
                <div class="stepper-value">
                  <div class="stepper-value-number">
                    {volume()}
                  </div>
                  <div class="stepper-value-label">
                    Volume Level
                  </div>
                </div>
                <button
                  type="button"
                  class="stepper-button"
                  onClick={() => handleVolumeChange(1)}
                  disabled={volume() >= 10}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
          </section>

          {/* Generic Pattern - Buttons */}
          <section class="app-panel">
            <div class="app-panel-header">
              <div class="app-panel-header-row">
                <h3 class="app-panel-title">Generic</h3>
                <span class="app-panel-meta">Action Buttons</span>
              </div>
              <p class="app-panel-description">
                General-purpose feedback for any user action
              </p>
            </div>
            <div class="app-panel-body">
              <div class="app-button-row">
                <button
                  type="button"
                  class="action-button primary"
                  onClick={handleButtonClick}
                >
                  Primary Action
                </button>
                <button
                  type="button"
                  class="action-button secondary"
                  onClick={handleButtonClick}
                >
                  Secondary
                </button>
                <button
                  type="button"
                  class="action-button success"
                  onClick={handleButtonClick}
                >
                  Success
                </button>
                <button
                  type="button"
                  class="action-button danger"
                  onClick={handleButtonClick}
                >
                  Danger
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
