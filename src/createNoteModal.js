import {createNewNote} from "./createNewNote.js" 
import {format} from 'date-fns'

const createNoteModule = (function(){
    //let notesArr = [];
    let noteId = 0;

    const saveNotesArr = (notesArr) => {return localStorage.setItem('notes', JSON.stringify(notesArr));}
    // getProjArr returns an array
    const getNotesArr = () => {return JSON.parse( localStorage.getItem('notes') );};
    const init = (() => {
        let notesArr = getNotesArr();
        if(!notesArr){
            notesArr = [];
        }
        saveNotesArr(notesArr);
    })();
    const getUpcomingNotes = () => {
        const distance = 72; //Hours to the past to capture Upcoming
        let notesArr = getNotesArr();
        let filtered = notesArr.filter(note => 
            parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) < distance && 
            parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) > 0
            ); // to exlude count for Today
        saveNotesArr(notesArr);
        return filtered;
    };
    const getTodayNotes = () => {
        let notesArr = getNotesArr();
        let today = format(Date.now(), 'LLL dd, yyyy');
        let filtered = notesArr.filter(note => note.dueDate == today)
        return filtered;
    };
    const getProjIdNotes = (projId) => {
        let notesArr = getNotesArr();
        let filtered = notesArr.filter(note => note.id == projId)
        return filtered;
    };
    const getNoteCount = (proj) => {
        let notesArr = getNotesArr();
        if(proj.title == 'Today'){ //Today
            return getTodayNotes().length;
        }else if(proj.title == 'Upcoming'){
            return getUpcomingNotes().length;
        }else{
            let filtered = notesArr.filter(note => note.id == proj.id);
            return filtered.length;
        };
    };
    const getExactNote = (noteId) => {
        let notesArr = getNotesArr();
        let filtered = notesArr.filter(note => note.noteId == noteId)
        return filtered[0];
    };
    const indexOfNote = (noteId) => {
        let notesArr = getNotesArr();
        noteId = parseInt(noteId);
        return notesArr.findIndex(x => x.noteId === noteId);
    };
    const updateNote = (noteId, title, desc, dueDate, priority, projId) => {
        let notesArr = getNotesArr();
        const targetObj = notesArr[indexOfNote(noteId)];
        console.log(notesArr)
        targetObj.title = title;
        targetObj.description = desc;
        targetObj.dueDate = dueDate;
        targetObj.priority = priority;
        targetObj.id = projId;
        saveNotesArr(notesArr);
    };
    const addNoteToArr = (title, desc, dueDate, priority, projId) => {
        let notesArr = getNotesArr();
        notesArr.push(createNewNote(title, desc, dueDate, priority, projId, noteId++));
        saveNotesArr(notesArr);
    };
    const switchComplete = (noteId) => {
        let notesArr = getNotesArr();
        const targetObj = notesArr[indexOfNote(noteId)];
        targetObj.complete = !targetObj.complete;
        saveNotesArr(notesArr)
    };
    const deleteNote = (btnId) => {
        let notesArr = getNotesArr();
        notesArr.forEach((elem) => {
            if (btnId == elem["noteId"]){
                let index = notesArr.indexOf(elem);
                notesArr.splice(index, 1);
            };
        });
        saveNotesArr(notesArr);
    };
    return {switchComplete, updateNote, getExactNote, deleteNote, getNoteCount, getNotesArr, getTodayNotes, getUpcomingNotes, getProjIdNotes, addNoteToArr};
})();

export {createNoteModule}