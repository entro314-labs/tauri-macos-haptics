// Exercises the built bindings (dist-js) against Tauri's IPC mocks, so the
// command names and argument shape the Rust side receives are verified.
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

globalThis.window = globalThis;
const { mockIPC, clearMocks } = await import("@tauri-apps/api/mocks");

// Each import gets its own module instance, so the isSupported() cache starts empty.
let instance = 0;
const load = () => import(`../dist-js/index.mjs?instance=${instance++}`);

afterEach(() => clearMocks());

test("perform() sends Generic with the system default timing", async () => {
  const calls = [];
  mockIPC((cmd, args) => {
    calls.push({ cmd, args });
  });
  const { perform } = await load();

  await perform();

  assert.deepEqual(calls, [
    {
      cmd: "plugin:tauri-macos-haptics|perform",
      args: { pattern: 2, performanceTime: 0 },
    },
  ]);
});

test("perform() passes pattern and timing through unchanged", async () => {
  const calls = [];
  mockIPC((cmd, args) => {
    calls.push(args);
  });
  const { perform, HapticFeedbackPattern, PerformanceTime } = await load();

  const cases = [
    [HapticFeedbackPattern.Alignment, PerformanceTime.Now, 0, 1],
    [HapticFeedbackPattern.LevelChange, PerformanceTime.DrawCompleted, 1, 2],
    [HapticFeedbackPattern.Generic, PerformanceTime.Default, 2, 0],
  ];
  for (const [pattern, time] of cases) {
    await perform(pattern, time);
  }

  assert.deepEqual(
    calls,
    cases.map(([, , pattern, performanceTime]) => ({ pattern, performanceTime })),
  );
});

test("perform() rejects with HapticError carrying the backend message", async () => {
  mockIPC(() => {
    throw "Unknown haptic feedback pattern 7";
  });
  const { perform, HapticError } = await load();

  await assert.rejects(perform(7), (error) => {
    assert.ok(error instanceof HapticError);
    assert.equal(error.name, "HapticError");
    assert.match(error.message, /Unknown haptic feedback pattern 7/);
    assert.equal(error.cause, "Unknown haptic feedback pattern 7");
    return true;
  });
});

test("isSupported() returns the backend result and caches it", async () => {
  const calls = [];
  mockIPC((cmd) => {
    calls.push(cmd);
    return true;
  });
  const { isSupported } = await load();

  assert.equal(await isSupported(), true);
  assert.equal(await isSupported(), true);
  assert.deepEqual(calls, ["plugin:tauri-macos-haptics|is_supported"]);
});

test("isSupported() resolves false when the backend reports no support", async () => {
  mockIPC(() => false);
  const { isSupported } = await load();

  assert.equal(await isSupported(), false);
});

test("isSupported() rejects with HapticError and retries when the command fails", async () => {
  let fail = true;
  mockIPC(() => {
    if (fail) throw "tauri-macos-haptics.is_supported not allowed";
    return true;
  });
  const { isSupported, HapticError } = await load();

  await assert.rejects(isSupported(), (error) => {
    assert.ok(error instanceof HapticError);
    assert.match(error.message, /not allowed/);
    assert.equal(error.cause, "tauri-macos-haptics.is_supported not allowed");
    return true;
  });

  fail = false;
  assert.equal(await isSupported(), true);
});
