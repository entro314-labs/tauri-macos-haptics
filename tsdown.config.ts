import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'guest-js/index.ts',
  outDir: 'dist-js',
  format: ['esm', 'cjs'],
  // Generate .d.ts via the native TypeScript port (tsgo).
  // Note: rolldown-plugin-dts marks tsgo-based emit as experimental.
  dts: { generator: 'tsgo' },
  clean: true,
  deps: {
    neverBundle: [/^@tauri-apps\/api/],
  },
})
