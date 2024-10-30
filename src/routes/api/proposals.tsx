import { getProposals } from "../../lib/api";

export async function GET() {
    const proposals = await getProposals()
    return proposals
}