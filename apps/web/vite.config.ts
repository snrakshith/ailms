import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
 plugins:[react()],
 // Use the root monorepo .env so optional Google sign-in works in local development.
 envDir:'../..',
 server:{host:'0.0.0.0',port:5173,proxy:{'/api':{target:process.env.VITE_DEV_API_ORIGIN || 'http://localhost:4000',changeOrigin:true},'/health':{target:process.env.VITE_DEV_API_ORIGIN || 'http://localhost:4000',changeOrigin:true}}},
 build:{target:'es2022',sourcemap:'hidden',rollupOptions:{output:{manualChunks(id){if(id.includes('node_modules/@tanstack/react-query'))return 'query';if(id.includes('node_modules/react')||id.includes('node_modules/react-dom')||id.includes('node_modules/react-router-dom'))return 'vendor';}}}},
 test:{environment:'jsdom',setupFiles:['./src/tests/setup.ts'],include:['src/**/*.test.{ts,tsx}'],css:true},
});
