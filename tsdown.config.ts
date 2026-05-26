import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'guest-js/index.ts',
  outDir: 'dist-js',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  deps: {
    neverBundle: [/^@tauri-apps\/api/],
  },
})
