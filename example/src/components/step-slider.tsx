import { createSignal, For } from "solid-js";
import {
  HapticFeedbackPattern,
  isSupported,
  perform,
  PerformanceTime,
} from "tauri-macos-haptics-api";

export default function StepSlider(props: {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
}) {
  const [sliderValue, setSliderValue] = createSignal(props.initialValue ?? props.min);
  const [isDragging, setIsDragging] = createSignal(false);

  const updateSlider = async (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);

    if (isDragging() && (await isSupported()) && sliderValue() !== value) {
      perform(HapticFeedbackPattern.Alignment, PerformanceTime.Now);
    }

    setSliderValue(value);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const generateSteps = () => {
    return Array.from(
      { length: (props.max - props.min) / props.step + 1 },
      (_, i) => props.min + i * props.step,
    );
  };

  const percentage = () => ((sliderValue() - props.min) / (props.max - props.min)) * 100;

  return (
    <div class="slider-stack">
      <div class="slider-row">
        <span class="slider-label text-right">
          {props.min}
        </span>
        <div class="slider-track">
          <input
            type="range"
            min={props.min}
            max={props.max}
            value={sliderValue()}
            class="slider"
            step={props.step}
            onInput={updateSlider}
            onMouseDown={(_) => {
              setIsDragging(false);
            }}
            onMouseMove={(_) => {
              if (!isDragging()) {
                setIsDragging(true);
              }
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          {/* Value indicator */}
          <div
            class="absolute -top-10 left-0 transform -translate-x-1/2 pointer-events-none transition-all duration-200"
            style={{ left: `${percentage()}%` }}
          >
            <div class="slider-bubble">
              {sliderValue()}
            </div>
            <div class="slider-bubble-arrow" />
          </div>
        </div>
        <span class="slider-label text-left">
          {props.max}
        </span>
      </div>
      {/* Step markers */}
      <div class="slider-marker-row">
        <For each={generateSteps()}>
          {(step) => (
            <div class="flex flex-col items-center gap-1">
              <div
                class="slider-marker"
                classList={{
                  active: sliderValue() >= step,
                }}
              />
              <span
                class="slider-marker-label"
                classList={{
                  active: sliderValue() === step,
                }}
              >
                {step}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
