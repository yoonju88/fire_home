'use client'

import { HeartIcon } from "lucide-react"

export default function ToggleFavoriteButton() {
    return (
        <button className="absolute top-2 right-2 z-10">
            <HeartIcon />
        </button>
    )
}
