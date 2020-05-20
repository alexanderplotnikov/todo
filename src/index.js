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
            let filtered = notesArr.filter(note => parseInt((new Date(note.dueDate) - Date.now()) / 1000 / 60 / 60) < distance);
            return filtered.length;
        }
        else{
            let filtered = notesArr.filter(note => note.id == proj.id);
            return filtered.length;
        }    
    };
    return {getNoteCount};
})();
const projDOM = (() => {
    const addProj = document.querySelector(".addProject");

    const renderProj = (() => {
        const projSidebar = document.querySelector('.projectItems');
        let projArr = createProjModule.getProjArr();
        projArr.forEach(elem => {
            const count = createNoteModule.getNoteCount(elem);
            console.log(count)
            const projItem = document.createElement('LI');
            const noteCounter = document.createElement('SPAN');
            noteCounter.classList.add('noteCount');
            noteCounter.innerHTML = `${count}`
            projItem.innerHTML = elem.title;
            projItem.appendChild(noteCounter);
            projSidebar.appendChild(projItem);
        });
    })();
    addProj.addEventListener("click", () => {
        createProjModule.addProj("Proj1");

        console.log(createProjModule.getProjArr())
    });
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
