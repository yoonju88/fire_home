"use server"
import { revalidatePath } from "next/cache"
//로그인이 성공하면 사용자 Favourite lists를 해당 페이지에서 revalidate 
export const loginSuccess = async () => {
    revalidatePath("/property-search")
}