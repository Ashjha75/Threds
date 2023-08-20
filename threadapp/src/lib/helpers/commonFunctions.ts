export function formatCreatedAtDate(createdAt: string) {
    return new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

}