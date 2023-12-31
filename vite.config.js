import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { BASE } from './src/utilities/constants'
 
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base:`/${BASE}/`,
    define: {
      __RAPID_API_KEY__: JSON.stringify(env.REACT_APP_RAPID_API_KEY),
      __RAPID_API_BASE_URL__:JSON.stringify(env.REACT_APP_RAPID_API_BASE_URL),
      __RAPID_API_HOST__:JSON.stringify(env.REACT_APP_RAPID_API_HOST)
    },
  }
})
