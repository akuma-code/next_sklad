import { UploadResponse } from "../../app/api/upload/route"

export async function uploadImg(file: File | null) {
    try {
        const fd = new FormData()

        if (file) fd.append('file', file)

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: fd
        })

        const result = await response.json() as unknown as UploadResponse

        if (response.ok && file) {
            console.log(result.filename, " succesfuly uploaded")
            console.log({ result })


            return result
        }

        return result
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}