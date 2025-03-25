import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { getPropertyById } from '@/lib/properties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EditPropertyForm from './edit-property-form';


export default async function EditProperty({ params }: { params: Promise<{ propertyId: string }> }) {
    const { propertyId } = await params
    const property = await getPropertyById(propertyId)

    if (!property) {
        return (
            <div>
                <h2>Property not found</h2>
                <p>The property with the given ID could not be found.</p>
            </div>
        )
    }

    return (
        <div>
            <Breadcrumbs items={[{
                href: "/admin-dashboard",
                label: "Dashboard"
            }, {
                label: "Edit Property"
            }]}
            />
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Edit Property
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditPropertyForm
                        id={property.id}
                        address1={property.address1}
                        address2={property.address2}
                        postcode={property.postcode}
                        city={property.city}
                        price={property.price}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        description={property.description}
                        status={property.status}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
