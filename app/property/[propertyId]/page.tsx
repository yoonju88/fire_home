
import { getPropertyById } from '@/lib/properties';
import ReactMarkdown from 'react-markdown'
import {
    BathIcon,
    BedIcon
} from 'lucide-react';
import PropertyStatusBadge from '@/components/Property-status-badge';
import numeral from 'numeral';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import Image from 'next/image';
import BackButton from './back-button';
import imageUrlFormatter from '@/lib/imageUrlFormatter';

//해당 페이지 또는 라우트가 항상 “정적(static)“으로 생성되게 설정하겠다는 뜻
// 빌드할 때 HTML이 미리 생성되고, 사용자가 들어올 땐 서버 없이 빠르게 서비스됨.
//API나 DB 연결 없이, 변하지 않는 페이지에 딱 좋아
export const dynamic = "force-static";

export default async function Property({ params }: { params: Promise<{ propertyId: string }> }) {
    const { propertyId } = await params
    const property = await getPropertyById(propertyId)
    //console.log({ property })
    const addressLines = [
        property?.address1,
        property?.address2,
        property?.city,
        property?.postcode
    ].filter(addressLine => !!addressLine)

    return (
        <div className="grid grid-cols-[1fr_500px]">
            <div>
                {!!property?.images && (
                    <Carousel className="w-full">
                        <CarouselContent>
                            {property?.images.map((image, index) => (
                                <CarouselItem key={image}>
                                    <div className="relative h-[80vh] min-h-80">
                                        <Image
                                            src={imageUrlFormatter(image)}
                                            alt={`Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {property.images.length > 1 && (
                            <>
                                <CarouselPrevious className="translate-x-24 size-12" />
                                <CarouselNext className="-translate-x-24 size-12" />
                            </>
                        )}
                    </Carousel>
                )}
                <div className="property-description max-w-screen-md mx-auto py-10 px-4">
                    <BackButton />
                    <ReactMarkdown >
                        {String(property?.description) || ""}
                    </ReactMarkdown>
                </div>
            </div>
            <div className='bg-sky-200 h-screen sticky top-0 grid place-items-center p-10'>
                <div className='flex flex-col gap-10 w-full'>
                    <PropertyStatusBadge
                        status={property?.status}
                        className='mr-auto text-base'
                    />
                    <h1 className="text-4xl font-semibold">
                        {addressLines.map((addressLine, index) => (
                            <div key={index}>
                                {addressLine}
                                {index < addressLines.length - 1 && ","}
                            </div>
                        ))}
                    </h1>
                    <h2 className="text-3xl font-light">
                        ${numeral(property?.price).format("0,0")}
                    </h2>
                    <div className="flex gap-10">
                        <div className="flex gap-2">
                            <BedIcon /> {property?.bedrooms} Bedrooms
                        </div>
                        <div className="flex gap-2">
                            <BathIcon /> {property?.bathrooms} Bathrooms
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
