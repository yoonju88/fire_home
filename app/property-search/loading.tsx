import { Skeleton } from '@/components/ui/skeleton'
import { HomeIcon } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        <>
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-4xl font-bold p-5">
                    Property search page
                </h1>
            </div>
            <Skeleton className="fixed size-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-950 rounded-full text-white flex justify-center items-center">
                <HomeIcon />
            </Skeleton>
        </>
    )
}
