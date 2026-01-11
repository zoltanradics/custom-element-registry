import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
  // Configuration for dev server (serves the demo)
  if (command === 'serve') {
    return {
      root: 'demo',
      server: {
        port: 3000,
        open: true
      }
    };
  }

  // Configuration for building the library
  return {
    build: {
      lib: {
        entry: './src/custom-element-registry.js',
        name: 'CustomElementRegistry',
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['@zoltanradics/async-script-loader'],
        output: {
          exports: 'default',
          globals: {
            '@zoltanradics/async-script-loader': 'AsyncScriptLoader'
          }
        }
      }
    },
    plugins: [
      dts({
        rollupTypes: false,
        include: ['src/**/*.js'],
        exclude: ['src/**/*.d.ts']
      })
    ]
  };
});
