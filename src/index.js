import {createNewNote} from "./createNewNote.js" 
import {createNewProj} from "./createNewProj.js"

import {lightFormat} from 'date-fns'

'use strict';
// TESTING
let obj = createNewNote("swe", "project 1 due tmrw", "2020-05-22", "high", "2", 2);
let obj2 = createNewNote("design", "project 1 due tmrw", "2020-05-23", "high", "2", 3);
let obj3 = createNewNote("hw", "project 1 due tmrw", "2020-05-25", "high", "2", 4);
let obj4 = createNewNote("scuba", "project 1 due tmrw", "2020-05-23", "high", "2", 5);


const createProjModule = (function(){
    let projArr = [{title: 'Today', id: 0 }, {title: 'Upcoming', id: 1 }];
    let projId = 2;
    let noteCount;
    const getProjArr = () => {return projArr};
    const addProj = (title) => {
        projArr.push(createNewProj(title, projId++))
        return projArr.slice(-1)[0] 
    };
    return {addProj, getProjArr};
}());

const createNoteModule = (function(){
    let notesArr = [obj, obj2, obj3, obj4];
    const getNotesArr = () => {return notesArr};
    const getUpcomingNotes = () => {
        const distance = 72; //Hours to the past to capture Upcoming
        let filtered = notesArr.filter(note => 
            parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) < distance && 
            parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) > 0); // to exlude count for Today
        return filtered;
    };
    const getTodayNotes = () => {
        let today = lightFormat(Date.now(), 'yyyy-MM-dd');
        let filtered = notesArr.filter(note => note.dueDate == today)
        return filtered;
    };
    const getProjIdNotes = (projId) => {
        let filtered = notesArr.filter(note => note.id == projId)
        return filtered;
    };
    const getNoteCount = (proj) => {
        if(proj.title == 'Today'){ //Today
            return getTodayNotes().length;
        }else if(proj.title == 'Upcoming'){
            return getUpcomingNotes().length;
        }else{
            let filtered = notesArr.filter(note => note.id == proj.id);
            return filtered.length;
        };
    };
    return {getNoteCount, getNotesArr, getTodayNotes, getUpcomingNotes, getProjIdNotes};
})();
const projDOM = (() => {
    const projSidebar = document.querySelector('.projectItems');
    const renderProj = () => {
        let projArr = createProjModule.getProjArr();
        projArr.forEach((elem, index) => {
            const count = createNoteModule.getNoteCount(elem);
            const projItem = document.createElement('LI');
            const noteCounter = document.createElement('SPAN');
            projItem.classList.add('projItem');
            projItem.setAttribute("data-id", index)
            noteCounter.classList.add('noteCount');
            noteCounter.innerHTML = `${count}`
            projItem.innerHTML = elem.title;
            projItem.appendChild(noteCounter);
            projSidebar.appendChild(projItem);
        });
        
    };
    const clearProj = () => {
        projSidebar.innerHTML = '';
    };
    const addProj = document.querySelector(".addProject");
    let alreadyClicked = false;
    addProj.addEventListener("click", (e) => { 
        let projInput = document.querySelector('.addProjInput');
        let addProjWrapper = document.querySelector('.addProjWrapper');
        //if clicked outside input field then hide it
        document.addEventListener('mouseup', function(e) {
            if (!addProjWrapper.contains(e.target)) {
                addProjPromt.classList.add('hide');
                projInput.value = '';
            }
        });
        e.preventDefault();
        let addProjPromt = document.querySelector('.addProjPromt');
        if(alreadyClicked && projInput.value !== ''){
            let lastProj = createProjModule.addProj(projInput.value);
            clearProj();
            renderProj();
            todoDOM.renderNoteHeader(lastProj.id);
            addProjPromt.classList.add('hide'); 
            projInput.value = '';
        } else if (alreadyClicked && projInput.value === ''){
            addProjPromt.classList.toggle('hide');
        } else {
            addProjPromt.classList.remove('hide');
            alreadyClicked = true;
        };
    });
    const renderOnload = (() => {
        renderProj()
    })();
})();

const todoDOM = (() => {
    const noteContent = document.querySelector('.noteContent');
    const noteHeader = document.querySelector('.noteItemHeader');
    const renderNoteHeader = (projId) =>{
        let projArr = createProjModule.getProjArr();
        let projTitle = projArr[projId];
        clearTodo();
        addRenderNoteListener();
        renderNote(projId);
        noteHeader.innerHTML = `${projTitle.title}`;
    };
    const addRenderNoteListener = () => {
        const projLI = document.querySelectorAll('.projItem');
        projLI.forEach(elem => {
            elem.addEventListener("click", () => {
                renderNoteHeader(elem.getAttribute('data-id'));
            });
        });
    };
    function renderNote(projId){
        let notesArr;
        if(projId == 0){
            notesArr = createNoteModule.getTodayNotes();
        }
        else if(projId == 1){
            notesArr = createNoteModule.getUpcomingNotes();
        }
        else{
            notesArr = createNoteModule.getProjIdNotes(projId)
        }
        notesArr.forEach((elem) => {
            const noteItem = document.createElement('DIV');
            noteItem.classList.add('noteItem');
            noteItem.innerHTML = noteHTML(elem); 
            noteContent.appendChild(noteItem)

        });
    };
    function noteInputPromt(){
        
    }
    const addNote = (() => {
        const addNoteBtn = document.querySelector('.addNote');
        addNoteBtn.addEventListener("click", (e) => {
            noteInputPromt();
            
        });
    })();
    const clearTodo = () => {
        noteContent.innerHTML = '';
    };
    const noteHTML = (elem) => {
        const title = elem.title;
        const desc = elem.description;
        const dueDate = elem.dueDate;
        const noteId = elem.noteId;
     
        return `
            <span class = "completeNote"><i class="material-icons">check_circle</i></span>
            <p class = "noteText">
                ${title}
            </p>
            <div class = "noteItemIcons">
                <i note-id = ${noteId} class="editNote material-icons">edit</i>
                <i note-id = ${noteId} class="deleteNote material-icons">delete_forever</i>  
            </div>`
    }
    
    renderNoteHeader(0);
    return {addRenderNoteListener, renderNote, renderNoteHeader};
})();
// delProj.setAttribute("data-attr", 0);
// delProj.addEventListener('click', (e) => {
//     const projAttr = e.target.getAttribute("data-attr");
//     deleteProject(projAttr);
// });
// function deleteProject(projAttr){
//     for(let idx = notesArr.length - 1; 0 <= idx; idx--) {
//         let item = notesArr[idx];
//         if (projAttr === item["id"]){
//             notesArr.splice(idx, 1);
//         };
//     }; 
// };
// function deleteNote(btnId, domElem){
//     notesArr.forEach((elem) => {
//         if (btnId == elem["noteId"]){
//             let index = notesArr.indexOf(elem);
//             notesArr.splice(index, 1);
//             domElem.remove();
//         };
//     });
// };
const deleteNoteModule = (() => {
    const deleteNote = (btnId) => {
        notesArr.forEach((elem) => {
            if (btnId == elem["noteId"]){
                let index = notesArr.indexOf(elem);
                notesArr.splice(index, 1);
                domElem.remove();
            };
        });
    };
    return {deleteNote}
})();