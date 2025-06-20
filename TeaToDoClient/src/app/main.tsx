import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './checkbox.css'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './providers/queryClient.ts'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@/shared/components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
