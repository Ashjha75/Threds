import { decodeToken, fetchData } from "./tokenData";
export function formatCreatedAtDate(createdAt: string, type: number) {
    switch (type) {
        case 1:
            return new Date(createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
        case 2:
            return new Date(createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })


    }

}

