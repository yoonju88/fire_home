import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import FiltersForm from './filters-form'

export default function PropertySearch() {
    return (
        <div className="max-w-screen-lg mx-auto">
            <h1 className="text-4xl font-bold p-5">
                Property search page
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <FiltersForm />
                </CardContent>
            </Card>
        </div>
    )
}
