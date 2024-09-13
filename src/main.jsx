import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Provider from './Provider/Provider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='open-sans-font'>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </div>
  </React.StrictMode>,
)
