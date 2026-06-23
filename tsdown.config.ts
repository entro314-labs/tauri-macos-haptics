import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'guest-js/index.ts',
  outDir: 'dist-js',
  format: ['esm', 'cjs'],
  // Generate .d.ts via the native TypeScript port (tsgo) from @typescript/native-preview.
  // Note: rolldown-plugin-dts marks tsgo-based emit as experimental.
  dts: { tsgo: true },
  clean: true,
  deps: {
    neverBundle: [/^@tauri-apps\/api/],
  },
})
