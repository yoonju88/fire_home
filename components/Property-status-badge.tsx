import { PropertyStatus } from "@/types/propertyStatus"
import { Badge } from "./ui/badge"

const statusLabel: Record<PropertyStatus, string> = {
    "for-sale": "For Sale",
    "withdrawn": "Withdrawn",
    "draft": "Draft",
    "sold": "Sold",
}

const variant: Record<
    PropertyStatus,
    "primary" | "destructive" | "secondary" | "success" | "default"

> = {
    "for-sale": "primary",
    "withdrawn": "destructive",
    "draft": "secondary",
    "sold": "success",
}

export default function PropertyStatusBadge({
    status,
    className,
}: {
    status: PropertyStatus | undefined
    className?: string;
}) {
    if (!status) {
        return <Badge variant="secondary" className={className}>Unknown</Badge>;
    }

    const label = statusLabel[status]
    const badgeVariant = variant[status]


    return (
        <Badge
            variant={badgeVariant}
            className={className}
        >
            {label}
        </Badge>
    )
}
