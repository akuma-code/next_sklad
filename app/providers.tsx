
'use client'
import type * as React from 'react'
import { HydrationBoundary, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import { getQueryClient } from './get-query-client'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={ queryClient } >
      <HydrationBoundary state={ dehydrate(queryClient) }>
        <LocalizationProvider dateAdapter={ AdapterDayjs } adapterLocale='ru'>

          { children }
        </LocalizationProvider>
        <ReactQueryDevtools client={ queryClient } />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}