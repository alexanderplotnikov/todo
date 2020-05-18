import {createNewNote} from "./createNewNote.js" 
import {createNewProj} from "./createNewProj.js"


// TESTING
let obj = createNewNote("swe", "project 1 due tmrw", "10/06/2020", "high", "0", 1);
let obj2 = createNewNote("design", "project 1 due tmrw", "10/06/2020", "high", "1", 2);
let obj3 = createNewNote("hw", "project 1 due tmrw", "10/06/2020", "high", "0", 3);
let obj4 = createNewNote("scuba", "project 1 due tmrw", "10/06/2020", "high", "0", 4);
let notesArr = [obj, obj2, obj3, obj4]

const submit = document.querySelector(".btn");
const delProj = document.querySelector(".btnDelProj");
delProj.setAttribute("data-attr", 0);
delProj.addEventListener('click', (e) => {
    const projAttr = e.target.getAttribute("data-attr");
    deleteProject(projAttr);
});
function deleteProject(projAttr){
    for(let idx = notesArr.length - 1; 0 <= idx; idx--) {
        let item = notesArr[idx];
        if (projAttr === item["id"]){
            notesArr.splice(idx, 1);
        };
    }; 
    console.log(notesArr)
}
function deleteNote(btnId, domElem){
    notesArr.forEach((elem) => {
        if (btnId == elem["noteId"]){
            let index = notesArr.indexOf(elem);
            notesArr.splice(index, 1);
            domElem.remove();
        };
    });
}
const tr = document.querySelector(`tr[data-attr]`);
submit.addEventListener("click", (e) => {;
    const projAttr = tr.getAttribute('data-attr');
    const table = document.querySelector('TABLE');
    
    (function renderPage(){
        notesArr.forEach((elem) => {
            if (projAttr === elem["id"]){
                const tr2 = document.createElement('TR');
                const emTd = document.createElement('TD');
                tr2.appendChild(emTd);
                const td = document.createElement('TD');
                const btn = document.createElement('BUTTON');
                btn.setAttribute(`data-attr`, elem["noteId"])
                btn.addEventListener('click', (e) => {
                    let btnId = e.target.getAttribute("data-attr");
                    deleteNote(btnId, tr2);
                });
                btn.innerHTML = 'x'
                td.innerHTML = renderTodo(elem);
                td.append(btn);
                tr2.appendChild(td);
                table.appendChild(tr2);
            };
   
       });
    })();
    
})

const renderTodo = (elem) => {
    const title = elem.title;
    const desc = elem.description;
    const dueDate = elem.dueDate;
    const priority = elem.priority;
    return `<td>${title} Summary: ${desc} 
            Due on: ${dueDate} | 
            Priority: ${priority}
            </td>`
}
