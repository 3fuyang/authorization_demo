import { defineConfig } from "vite-plugin-windicss"

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'bgr 20s linear infinite alternate'
      },
      keyframes: {
        bgr: {
          '100%': {
            filter: 'hue-rotate(360deg)'
          }
        }
      }
    }
  }
})