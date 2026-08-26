import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用相对路径，保证部署到 GitHub Pages 子路径（如 /repo-name/）时资源能正确加载
  base: './',
})
