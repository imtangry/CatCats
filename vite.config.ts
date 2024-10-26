import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import inject from '@rollup/plugin-inject'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), basicSsl()],
    build: {
        outDir: './docs',
        rollupOptions: {
            plugins: [inject({ Buffer: ['buffer/', 'Buffer'] })],
        },
    },
    base: './',
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                })
            ]
        }
    },
})
