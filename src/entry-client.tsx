// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

mount(() => <StartClient />, document.getElementById("app")!);

console.log("After mount")

async function dashSleep(ms) {
    await window.DashGov.utils.sleep(ms)
    console.log(`Slept for ${ms/1000} seconds`)
}

dashSleep(1000)
    .then(() => console.log("Working: DashGov is on Window"))
    .catch((err) => console.error("Failed: in dashSleep", err))

console.log("End of entry-client");