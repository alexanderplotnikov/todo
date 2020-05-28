import {createNoteModule} from "./createNoteModal.js"
import {createProjModule} from "./createProjModal.js"
import {projDOM} from "./projDOM.js"
const todoDOM = (() => {
    const noteContent = document.querySelector('.noteContent');
    const noteHeader = document.querySelector('.noteItemHeader');
    const editTaskBtn = document.querySelector('.editTaskBtn');
    
    const renderNoteHeader = (projId) =>{
        let index = createProjModule.indexOfProj(projId);
        let projArr = createProjModule.getProjArr();
        let projTitle = projArr[index];
        clearTodo();
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
        };
        
        notesArr.forEach((elem, index) => {
            const noteItem = document.createElement('DIV');
            noteItem.classList.add('noteItem');
            noteItem.innerHTML = noteHTML(elem);
            noteContent.appendChild(noteItem);
        });
        const noteText = document.querySelectorAll('.noteText');
        const completeNote = document.querySelectorAll('.completeNote');
        const completeIcon = document.querySelectorAll('.completeIcon');
        notesArr.forEach((elem, index) => {
            if(elem.complete){
                noteText[index].classList.add('strike');
                completeIcon[index].classList.remove('hide');
            };
        });
        
        for (let i = 0; i < completeNote.length; i++){
            completeNote[i].addEventListener("click", (e) => {
                completeIcon[i].classList.toggle('hide');
                noteText[i].classList.toggle('strike');
                createNoteModule.switchComplete(e.target.getAttribute('note-id'));
            });
        }; 
        
        let deleteNoteBtn = document.querySelectorAll('.deleteNote');
        deleteNoteBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                createNoteModule.deleteNote(e.target.getAttribute('note-id'));
                renderNoteHeader(projId);
                projDOM.updateProjDOM();
            });
        }); 
        let editNoteBtn = document.querySelectorAll('.editNote');
        editNoteBtn.forEach((btn) => { // edit icon button
            btn.addEventListener("click", (e) => {
                const noteId = e.target.getAttribute('note-id');
                const note = createNoteModule.getExactNote(noteId);
                addNote.editFormUpdate(note);
                editTaskBtn.setAttribute("note-id", noteId);
                editTaskBtn.classList.remove('hide');
                addTaskBtn.classList.add('hide');
                addNote.noteInputPrompt();
                renderNoteHeader(projId);
                projDOM.updateProjDOM();
            });
        });
    };
    const cancelNoteBtn = document.querySelector('.cancelTaskBtn');
    const addNotePrompt = document.querySelector('.addNotePrompt');
    const addNoteBtn = document.querySelector('.addNote');
    const addTaskBtn = document.querySelector('.addTaskBtn');
    const addNote = (() => {
        function noteInputPrompt(){
            addNotePrompt.classList.toggle('hide');     
        };
        let title = document.querySelector('#titleNote');
        let desc = document.querySelector('#descNote');
        let dueDate = document.querySelector('#dueDate');
        let priority = document.querySelector('#priority');
        let projId = document.querySelector('#projId');
        function clearNoteInput(...args) {
            args.forEach((elem) => {
                elem.value = null;
            });
        };
        cancelNoteBtn.addEventListener("click", () => {noteInputPrompt();})
        addNoteBtn.addEventListener("click", () => {
            noteInputPrompt();
            editTaskBtn.classList.add('hide');
            addTaskBtn.classList.remove('hide');
            clearNoteInput(title, desc, dueDate, priority, projId);
        });
        addTaskBtn.addEventListener("click", () => {
            noteInputPrompt();  
            createNoteModule.addNoteToArr(title.value, desc.value, dueDate.value, priority.value, projId.value);
            renderNoteHeader(projId.value);
            projDOM.updateProjDOM();
        });
        editTaskBtn.addEventListener("click", (e) => {
            addNote.noteInputPrompt();
            let noteId = e.target.getAttribute('note-id');
            createNoteModule.updateNote(noteId, title.value, desc.value, dueDate.value, priority.value, projId.value);
            renderNoteHeader(projId.value);
            projDOM.updateProjDOM();
        });
        const editFormUpdate = (obj) => {
            title.value = obj.title;
            desc.value = obj.description;
            dueDate.value = obj.dueDate;
            priority.value = obj.priority;
            projId.value = obj.id;
        };
        return {noteInputPrompt, editFormUpdate}
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
            <span note-id = ${noteId} class = "completeNote"><i note-id = ${noteId} class="material-icons completeIcon hide">check_circle</i></span>
            <p class = "noteText">
                ${title}
            </p>
            <div class = "noteItemIcons">
                <i note-id = ${noteId} class="editNote material-icons">edit</i>
                <i note-id = ${noteId} class="deleteNote material-icons">delete_forever</i>  
            </div>`
    };
    renderNoteHeader(0);
    addRenderNoteListener();
    return {addRenderNoteListener, renderNote, renderNoteHeader};
})();

export {todoDOM}