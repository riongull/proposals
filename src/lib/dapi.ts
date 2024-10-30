// import { GObject } from "../lib/dashGov";
import {client} from '../lib/dashClient'

// const gobjPrepare = () => {
//   console.log("gobjPrepare", GObject)
// }

type DocumentMessages = [{
  message : String
}]

export const getDocuments = async () => {
  try {
    console.log("getting documents")
    const resultDocs = await client.platform.documents.get(
      'tutorialContract.note',
      { limit: 5 }
    )
    const documentMessages: DocumentMessages = resultDocs.map((d: any) => d.toJSON().message)
    console.log("documents", documentMessages)
    // setDocs(fixedDocs)
    return documentMessages
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}