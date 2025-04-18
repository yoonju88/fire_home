"use server"
import { auth, firestore } from "@/firebase/server"

export const addFavourite = async (proeprtyId: string, authToken: string) => {
    const verificationToken = await auth.verifyIdToken(authToken)

    if (!verificationToken) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore
        .collection("favourites")
        .doc(verificationToken.uid)
        .set(
            {
                [proeprtyId]: true
            },
            {
                merge: true
            }
        )
}