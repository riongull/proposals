import { action, cache, redirect } from "@solidjs/router";
import { format, isToday } from "date-fns";
import { marked } from "marked";
import { storage } from "./db";
import type { Note } from "./types";

export const getProposals = async () => {    
    console.log("getting proposals")
        // typically http://localhost:19998/
    let baseUrl = "https://trpc.digitalcash.dev/";
    let basicAuth = btoa(`user:pass`);
    let payload = JSON.stringify({
        "method": "gobject",
        "params": [
            "list"
        ]
    });
    let resp = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${basicAuth}`,
            "Content-Type": "application/json",
        },
        body: payload,
    });

    let data = await resp.json();
    if (data.error) {
        let err = new Error(data.error.message);
        Object.assign(err, data.error);
        throw err;
    }
    // console.log("data.result", data.result)
    let propsArray = Object.values(data.result);
    console.log("proposals", propsArray)
    // setProposals(propsArray)
    return propsArray;
}

export const getNotes = cache(async (searchText: string) => {
  "use server";
  return (((await storage.getItem("notes:data")) as Note[]) || [])
    .filter(note => !searchText || note.title.toLowerCase().includes(searchText.toLowerCase()))
    .map(note => {
      const updatedAt = new Date(note.updatedAt);
      return {
        ...note,
        updatedAt: isToday(updatedAt) ? format(updatedAt, "h:mm bb") : format(updatedAt, "M/d/yy")
      };
    });
}, "notes");

export const getNote = cache(async (id: number) => {
  "use server";
  return (((await storage.getItem("notes:data")) as Note[]) || []).find(note => note.id === id);
}, "note");

export const getNotePreview = cache(async (id: number) => {
  "use server";
  const note = (((await storage.getItem("notes:data")) as Note[]) || []).find(
    note => note.id === id
  );
  if (!note) return;
  note.body = await marked(note.body); // added await to fix type error
  note.updatedAt = format(new Date(note.updatedAt), "d MMM yyyy 'at' h:mm bb");
  return note;
}, "note-preview");

export const saveNote = action(async (id: number | undefined, formData: FormData) => {
  "use server";
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  let [{ value: notes }, { value: index }] = (await storage.getItems([
    "notes:data",
    "notes:counter"
  ])) as [{ key: string; value: Note[] }, { key: string; value: number }];
  // default value for first write
  notes = notes || [];
  index = index || 0;

  if (id == undefined) {
    await Promise.all([
      storage.setItem("notes:data", [
        ...notes,
        { id: index, title, body, updatedAt: new Date().toISOString() }
      ]),
      storage.setItem("notes:counter", index + 1)
    ]);
    return redirect(`/notes/${index}`);
  }
  await storage.setItem(
    "notes:data",
    notes.map(note => {
      if (note.id !== id) return note;
      return { id, title, body, updatedAt: new Date().toISOString() };
    })
  );
  return redirect(`/notes/${id}`);
});

export const deleteNote = action(async (id: number) => {
  "use server";
  const notes = (await storage.getItem("notes:data")) as Note[];
  await storage.setItem(
    "notes:data",
    notes.filter(note => note.id !== id)
  );
});
