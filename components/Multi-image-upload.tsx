"use client"

import { Button } from "./ui/button";
import { useRef } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import Image from "next/image";
import { Badge } from "./ui/badge";
import { MoveIcon, XIcon } from "lucide-react";

export type ImageUpload = {
    id: string;
    url: string;
    file?: File;
}

type Props = {
    images?: ImageUpload[]; //현재 업로드된 이미지 목록 (선택적, 초기 값이 없을 수도 있음)
    onImagesChangeAction: (images: ImageUpload[]) => void // 이미지 목록이 변경될 때 실행될 함수 (부모 컴포넌트에서 업데이트 처리)
    urlFormatter: (image: ImageUpload) => string
}

export default function MultiImageUpload({
    images = [],
    onImagesChangeAction,
    urlFormatter
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
        });
        onImagesChangeAction([...images, ...newImages])
    }
    // 이미지를 드랙 하여 순서를 변경
    const handleDragEnd = (result: DropResult) => {
        // 드레그가 유호한 목적지에 도착하지 않은 경우 함수 종료
        if (!result.destination) return;

        const items = Array.from(images); // 현재 이미지 목록 복사
        const [reorderdImages] = items.splice(result.source.index, 1) // 드레그 된 이미지 제거        
        items.splice(result.destination.index, 0, reorderdImages) // 새로운 위치에 이미지 추가
        onImagesChangeAction(items) // 변경되 이미지 목록 업데이트
    }
    // 이미지 업로드 리스트에서 삭제
    const handleDelete = (id: string) => {
        const updatedImages = images.filter((image) => image.id !== id)
        onImagesChangeAction(updatedImages)
    }

    return (
        <div className="w-full max-w-3xl m-auto p-4">
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
                className="w-full"
                variant="outline"
            >
                Upload images
            </Button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="property-images" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} >
                            {images.map((image, index) => (
                                <Draggable key={image.id} draggableId={image.id} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className='relative p-2'
                                        >
                                            <div className='bg-gray-100 rounded-lg flex items-center overflow-hidden gap-2'>
                                                <div className="size-16 relative">
                                                    <Image
                                                        src={urlFormatter ? urlFormatter(image) : image.url}
                                                        alt="hi"
                                                        fill
                                                        className="object-cover"

                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-xm font-medium">
                                                        Image {index + 1}
                                                    </p>
                                                    {index === 0 &&
                                                        <Badge variant="success">
                                                            Featured Image
                                                        </Badge>

                                                    }
                                                </div>
                                                <div className="flex items-center p-2">
                                                    <button className="text-orange-500 p-2" onClick={() => handleDelete(image.id)}>
                                                        <XIcon />
                                                    </button>
                                                    <div className="text-blue-400">
                                                        <MoveIcon />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div >
    )
}

