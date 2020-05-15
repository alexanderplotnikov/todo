const createNewProject = (title, description, dueDate, priority) => {
    const prop = {
        title,
        description,
        dueDate,
        priority,
        // getTitle: () => {return title} 
    }
    const getters = {
        getTitle: () => {return prop.title},
        getDesc: () => {return prop.description},
        getDueDate: () => {return prop.dueDate},
        getPriority: () => {return prop.priority},

    }
    return Object.assign({}, prop, getters); 
};

let obj = createNewProject("swe", "project 1 due tmrw", "10/06/2020", "high");
console.log(obj);
console.log(obj.getTitle());
