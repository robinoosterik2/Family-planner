import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
            script: {
                defineModel: true,
                propsDestructure: true,
            },
        }),
    ],
    server: {
        host: process.env.VITE_HOST || '0.0.0.0',
        port: parseInt(process.env.VITE_PORT || '5173'),
        hmr: {
            host: process.env.VITE_HMR_HOST || 'localhost',
            port: parseInt(process.env.VITE_HMR_PORT || '5173'),
        },
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
