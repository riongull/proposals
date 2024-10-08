// export default function HomePage() {
//   return (
//     <div class="note--empty-state">
//       <span class="note-text--empty-state">Click a note on the left to view something! 🥺</span>
//     </div>
//   );
// }

import { createAsync } from "@solidjs/router";
import { For, Show } from "solid-js";
import { getProposals } from "~/lib/api";
// import { getDocuments } from "~/lib/api";
// import { getDocuments, getProposals } from "~/lib/api";

import { prePrepare } from "../lib/dashGovPrePrepare";
import { gobjPrepare} from "../lib/dashGobjPrepare";


export default function HomePage() {
  // const docs = createAsync(() => getDocuments())
  const proposals = createAsync(() => getProposals())

  return (
    <div class="note--empty-state">
      <span class="note-text--empty-state">Click a note on the left to view something! 🥺</span>
      <br></br>
      <button onClick={() => prePrepare()}> Pre-Prepare </button>
      <button onClick={() => gobjPrepare()}> Prepare </button>
      <br></br>
      {/* <button onClick={() => getDocuments()}> Get Documents </button> */}
      {/* <button onClick={() => getProposals()}> Get Proposals </button> */}
      
      {/* Show docs */}
      {/* <Show
        when={docs()?.length}
        fallback={<div>Getting docs</div>}
      >
        <p>Documents:</p>
        <ul class="notes-list">
          <For each={docs()}>
            {doc => (
              <li>
                {doc}
              </li>
            )}
          </For>
        </ul>
      </Show> */}

      {/* Show proposals */}
      <Show
        when={proposals()?.length}
        fallback={<div>Getting proposals</div>}
      >
        <br></br>
        <p>Proposals:</p>
        <ul class="notes-list">
          <For each={proposals()}>
            {(proposal, index) => {
              // console.log(index(), proposal)
              return (
              <li><pre>
                {`${index()+1}. ${JSON.parse(proposal.DataString).name}`}
              </pre></li>
            )}}
          </For>
        </ul>
      </Show>
    </div>
  );
}