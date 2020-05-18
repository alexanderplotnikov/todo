import {createNewProj} from "./createNewProj.js"
const createNewNote = (title, description, dueDate, priority, id, noteId, complete = false) => {
    const prop = {
        description,
        dueDate,
        priority,
        noteId,
        complete,

    }
    const getters = {
        getDesc: () => {return prop.description},
        getDueDate: () => {return prop.dueDate},
        getPriority: () => {return prop.priority},
    }
    const basics = createNewProj(title, id);
    const composite = Object.assign({}, basics)
    return Object.assign({}, composite, prop, getters); 
};

export {createNewNote}