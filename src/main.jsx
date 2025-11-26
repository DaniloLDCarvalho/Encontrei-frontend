import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App'
import './styles.css'
import {queryClient} from "@/lib/queryClient";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} /> {/* Ajuda a debugar as requests */}
        </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>
)
