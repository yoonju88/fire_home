"use client"

import { Button } from "./ui/button";
import { useRef } from "react";

export type ImageUpload = {
    id: string;
    url: string;
    file?: File;
}

type Props = {
    images?: ImageUpload[]; //현재 업로드된 이미지 목록 (선택적, 초기 값이 없을 수도 있음)
    onImagesChangeAction: (images: ImageUpload[]) => void // 이미지 목록이 변경될 때 실행될 함수 (부모 컴포넌트에서 업데이트 처리)
}


export default function MultiImageUpload({
    images = [],
    onImagesChangeAction,
}: Props) {

    const uploadInputRef = useRef<HTMLInputElement | null>(null)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const newImages = files.map((file, i) => {
            return {
                id: `${Date.now()}-${i}-${file.name}`,
                url: URL.createObjectURL(file),
                file
            }
        })
        onImagesChangeAction([...images, ...newImages])
    }

    return (
        <div className="w-full max-w-3xl max-auto p-4">
            <input
                type="file"
                ref={uploadInputRef}
                multiple
                accept="image/*"
                className='hidden'
                onChange={handleInputChange}
            />
            <Button
                type="button"
                onClick={() => uploadInputRef?.current?.click()}
            >
                Upload images
            </Button>

        </div>
    )
}

