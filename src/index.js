const createNewNote = (title, description, dueDate, priority, id, complete = false) => {
    const prop = {
        description,
        dueDate,
        priority,
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
const createNewProj = (title, id) => ({
    title,
    id,
    getTitle: () => title
});

let obj = createNewNote("swe", "project 1 due tmrw", "10/06/2020", "high", "1");
let obj2 = createNewNote("design", "project 1 due tmrw", "10/06/2020", "high", "1");
let obj3 = createNewNote("hw", "project 1 due tmrw", "10/06/2020", "high", "1");

const notesArr = [obj, obj2, obj3]
console.log(notesArr.indexOf(obj2));
notesArr.splice(2, 1);
console.log(notesArr)
let proj = createNewProj("Project 1", 3);
const submit = document.querySelector(".btn");
const tr = document.querySelector(`tr[data-attr]`);
submit.addEventListener("click", (e) => {
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
                btn.setAttribute(`data-attr`, projAttr)
                btn.addEventListener('click', (e) => {
                   let index = notesArr.indexOf(elem);
                   notesArr.splice(index, 1);
                   tr2.remove();
                    console.log(notesArr)
                })
                btn.innerHTML = 'x'
                td.innerHTML = renderTodo(elem);
                td.append(btn);
                tr2.appendChild(td);
                table.appendChild(tr2);
            }
   
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
