import {createNoteModule} from "./createNoteModal.js"
import {createProjModule} from "./createProjModal.js"
import {todoDOM} from "./todoDOM.js"


const projDOM = (() => {
    const projSidebar = document.querySelector('.projectItems');
    const selectProj = document.querySelector('.projSelectDrop');
    const renderProj = () => {
        let projArr = createProjModule.getProjArr();
        selectProj.innerHTML = '';
        projArr.forEach((elem, index) => {
            let dataId = elem["id"];
            renderOptions(elem, index);
            const count = createNoteModule.getNoteCount(elem);
            const projItem = document.createElement('LI');
            const noteCounter = document.createElement('SPAN');
            projItem.classList.add('projItem'); 
            projItem.setAttribute("data-id", elem["id"])
            noteCounter.classList.add('noteCount');
            noteCounter.innerHTML = `${count}`
            projItem.innerHTML = elem.title;
            projItem.appendChild(noteCounter);
            addDeleteProjIcon(elem, dataId, index, projItem);
            projSidebar.appendChild(projItem);
        });
        function addDeleteProjIcon(elem, dataId, index, projItem){
            if(elem.title == 'Today' || elem.title == 'Upcoming'){
                //skip     
            } else {
                const deleteIcon = document.createElement('I');
                deleteIcon.setAttribute("data-id", dataId);
                deleteIcon.classList.add('material-icons');
                deleteIcon.innerHTML = 'delete_forever';
                projItem.appendChild(deleteIcon);
                deleteIcon.addEventListener("click", (e) => {               
                    createProjModule.deleteProj(index);
                    clearProj();
                    renderProj();
                    todoDOM.renderNoteHeader(0);
                    todoDOM.addRenderNoteListener();
                    e.stopPropagation();
                });
            };
        };   
    };
    const renderOptions = (elem) => {
        if(elem.title == 'Today' || elem.title == 'Upcoming'){
            //skip     
        } else {
            const option = document.createElement('OPTION');
            option.innerHTML = elem.title;            
            option.value = elem.id;
            option.selected = true;
            selectProj.appendChild(option);
        };
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
            todoDOM.addRenderNoteListener();

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
    const updateProjDOM = () => {
        clearProj();
        renderProj();
        todoDOM.addRenderNoteListener();
    };
    return {updateProjDOM}
})();

export {projDOM}