import {createNewProj} from "./createNewProj.js"
import {createNoteModule} from "./createNoteModal.js"
const createProjModule = (function(){ 
    //param is an array of project objects
    const saveProjArr = (projArr) => {return localStorage.setItem('projects', JSON.stringify(projArr));}
    // getProjArr returns an array
    const getProjArr = () => {return JSON.parse( localStorage.getItem('projects') );};
    const init = (() => {
        let projArr = getProjArr();
        if(!projArr){
            projArr = [{title: 'Today', id: 0 }, {title: 'Upcoming', id: 1 }];
        }
        saveProjArr(projArr);
    })();
    const addProj = (title) => {
        let projArr = getProjArr();
        let lastId = projArr.slice(-1)[0].id;
        projArr.push(createNewProj(title, ++lastId));
        localStorage.setItem('projects', JSON.stringify(projArr));
        return projArr.slice(-1)[0] 
    };
    const indexOfProj = (projId) => {
        let projArr = getProjArr();
        projId = parseInt(projId);
        return projArr.findIndex(x => x.id === projId);
    };
    const deleteProj = (index) => {
        let projArr = getProjArr();
        let projId = projArr[index]["id"];
        let notesArr = createNoteModule.getNotesArr();
        for(let idx = notesArr.length - 1; 0 <= idx; idx--) {        
            if (projId == notesArr[idx]["id"]){
                createNoteModule.deleteNote(notesArr[idx]["noteId"]);
            };
        };
        for(let idx = 0; idx < projArr.length; idx++) {
            if (projId == projArr[idx]["id"]){
                projArr.splice(idx, 1);
            };
        }; 
        saveProjArr(projArr);       
    };
    return {indexOfProj, addProj, getProjArr, deleteProj};
}());

export {createProjModule}