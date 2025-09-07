'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
    children: React.ReactNode
}

export default function TanStackProvider({children} : Props) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>{ children }<ReactQueryDevtools initialIsOpen={false} /></QueryClientProvider>
    )
}