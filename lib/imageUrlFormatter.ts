
export default function imageUrlFormatter(imagePath: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fire-home-ff343.firebasestorage.app/o/${encodeURIComponent(
        imagePath
    )}?alt=media`
}