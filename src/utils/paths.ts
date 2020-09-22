const ROOT = '/'
 const NOTE = '/note'
 const NOTE_ID = '/note/:id'
 const makeNoteId = (id?:string):string => id ? NOTE_ID.replace(':id', id) : ROOT

export const PATHS = {
    ROOT,
    NOTE,
    NOTE_ID,
    makeNoteId,
}