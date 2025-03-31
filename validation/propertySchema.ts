import { z } from "zod"

const postcodeRegexes = {
    UK: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i,
    DE: /^\d{5}$/,            // 독일 (5자리 숫자)
    FR: /^\d{5}$/,            // 프랑스 (5자리 숫자)
    ES: /^\d{5}$/,            // 스페인 (5자리 숫자)
    IT: /^\d{5}$/,            // 이탈리아 (5자리 숫자)
    NL: /^\d{4}\s?[A-Z]{2}$/i, // 네덜란드 (4자리 숫자 + 공백 + 2자리 문자)
    BE: /^\d{4}$/,            // 벨기에 (4자리 숫자)
    CH: /^\d{4}$/,            // 스위스 (4자리 숫자)
    SE: /^\d{3}\s?\d{2}$/,    // 스웨덴 (3자리 + 공백 + 2자리 숫자)
    NO: /^\d{4}$/,            // 노르웨이 (4자리 숫자)
    DK: /^\d{4}$/,            // 덴마크 (4자리 숫자)
    PT: /^\d{4}-\d{3}$/,      // 포르투갈 (4자리-3자리)
    PL: /^\d{2}-\d{3}$/,      // 폴란드 (2자리-3자리)
    AT: /^\d{4}$/,            // 오스트리아 (4자리 숫자)
    FI: /^\d{5}$/,            // 핀란드 (5자리 숫자)
    CZ: /^\d{3}\s?\d{2}$/,    // 체코 (3자리 + 공백 + 2자리 숫자)
    HU: /^\d{4}$/,            // 헝가리 (4자리 숫자)
}

export const propertyDataSchema = z.object({
    address1: z.string().min(1, "Addess line 1 must contain a value"),
    address2: z.string().optional(),
    city: z.string().min(3, "City must contain al leat 3 characters"),
    postcode: z.string().refine((postcode) => {
        const postcodeRegexFr = /^\d{5}$/
        return postcodeRegexFr.test(postcode)
    }, "Invalid EU postcode"),
    price: z.coerce.number().positive("Price must be greater than 0."),
    description: z.string().min(40, "Description must contain al least 40 characters"),
    bedrooms: z.coerce.number().min(0, "Bedrooms must be al least 0"),
    bathrooms: z.coerce.number().min(0, "Bathrooms must be al least 0"),
    status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
})


export const propertyImagesSchema = z.object({
    images: z.array(
        z.object({
            id: z.string(),
            url: z.string(),
            file: z.instanceof(File).optional(),
        })
    ),
});


export const propertySchema = propertyDataSchema.and(propertyImagesSchema);
