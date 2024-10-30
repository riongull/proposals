import { getDocuments } from "../../lib/dapi";

export async function GET() {
    const docs = await getDocuments()
    return docs
}