import { defineConfig } from 'tsdown'

// rolldown-plugin-dts (<=0.28.6) only auto-detects the native TypeScript port when
// `typescript` is 7.0.x, so with `typescript@next` (7.1 dev builds) it falls back to the
// classic JS API and crashes. Point it at the tsgo binary shipped by `typescript` directly;
// drop this once the plugin recognizes 7.1+.
const { default: getExePath } = await import(
  new URL('lib/getExePath.js', import.meta.resolve('typescript/package.json')).href
)

export default defineConfig({
  entry: 'guest-js/index.ts',
  outDir: 'dist-js',
  format: ['esm', 'cjs'],
  // Generate .d.ts via the native TypeScript port (tsgo).
  // Note: rolldown-plugin-dts marks tsgo-based emit as experimental.
  dts: { generator: 'tsgo', tsgo: { path: getExePath() } },
  clean: true,
  deps: {
    neverBundle: [/^@tauri-apps\/api/],
  },
})
