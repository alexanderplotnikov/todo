import {createNewNote} from "./createNewNote.js" 
import {createNewProj} from "./createNewProj.js"

import {lightFormat} from 'date-fns'

'use strict';
// TESTING
let obj = createNewNote("swe", "project 1 due tmrw", "2020-05-21", "high", "2", 2);
let obj2 = createNewNote("design", "project 1 due tmrw", "2020-05-23", "high", "2", 3);
let obj3 = createNewNote("hw", "project 1 due tmrw", "2020-06-30", "high", "2", 4);
let obj4 = createNewNote("scuba", "project 1 due tmrw", "2020-05-23", "high", "2", 5);


const createProjModule = (function(){
    let projArr = [{title: 'Today', id: 0 }, {title: 'Upcoming', id: 1 }, {title: 'Proj1', id: 2 }];
    let projId = 2;
    let noteCount;
    const getProjArr = () => {return projArr};
    const addProj = (title) => {
        projArr.push(createNewProj(title, projId++))
    };
    return {addProj, getProjArr};
}());

const createNoteModule = (function(){
    let notesArr = [obj, obj2, obj3, obj4];
    const getNotesArr = () => {return notesArr};
    const getNoteCount = (proj) => {
        let today = lightFormat(Date.now(), 'yyyy-MM-dd');
        if(proj.title == 'Today'){ //Today
            let filtered = notesArr.filter(note => note.dueDate == today)
            return filtered.length;
        }
        else if(proj.title == 'Upcoming'){
            const distance = 72; //Hours to the past to capture Upcoming
            let filtered = notesArr.filter(note => 
                parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) < distance && 
                parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) > 0); // to exlude count for Today
            return filtered.length;
        }
        else{
            let filtered = notesArr.filter(note => note.id == proj.id);
            return filtered.length;
        };
    };
    return {getNoteCount, getNotesArr};
})();
const projDOM = (() => {
    const renderProj = (() => {
        const projSidebar = document.querySelector('.projectItems');
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
    })();
    const addProj = document.querySelector(".addProject");
    addProj.addEventListener("click", () => {
        createProjModule.addProj("Proj1");

        console.log(createProjModule.getProjArr())
    });
})();
const todoDOM = (() => {
    const noteContent = document.querySelector('.noteContent');
    const renderTodo = () => {
        const projLI = document.querySelectorAll('.projItem');
        const noteHeader = document.querySelector('.noteItemHeader');
        projLI.forEach(elem => {
            elem.addEventListener("click", () => {
                console.log(elem)
                renderNote(elem.getAttribute('data-id'));
                noteHeader.innerHTML = `${elem}`;
            });
        });
        let projId = 0;
        
        console.log(noteContent);
        function renderNote(projId){
            let notesArr = createNoteModule.getNotesArr();
            console.log(projId)
            notesArr.forEach((elem) => {
                if (projId === elem["id"]){
                    const noteItem = document.createElement('DIV');
                    noteItem.classList.add('noteItem');
                    noteItem.innerHTML = noteHTML();
                    noteContent.appendChild(noteItem)
                };
            });
        };
    };
    const clearTodo = () => {
        noteContent.innerHTML = '';
    };
    const noteHTML = () => {
        return `
            <span class = "completeNote"><i class="material-icons">check_circle</i></span>
            <p class = "noteText">
                New Note from JS
            </p>
            <div class = "noteItemIcons">
                <i class="editNote material-icons">edit</i>
                <i class="deleteNote material-icons">delete_forever</i>  
            </div>`
    }
        
    
    renderTodo();
    return {renderTodo};
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
// submit.addEventListener("click", (e) => {
    
//     (function renderPage(){
//         notesArr.forEach((elem) => {
//             if (projAttr === elem["id"]){
//                 //construct html
//                 btn.setAttribute(`data-attr`, elem["noteId"])
//                 btn.addEventListener('click', (e) => {
//                     let btnId = e.target.getAttribute("data-attr");
//                     deleteNote(btnId, domElem);
//                 });                
//             };
//         });
//     })();
    
// });

// const renderTodo = (elem) => {
//     const title = elem.title;
//     const desc = elem.description;
//     const dueDate = elem.dueDate;
//     const priority = elem.priority;
//     return ``
// }
