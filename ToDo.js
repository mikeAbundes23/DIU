
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskListUncompleted = document.getElementById('toDoList');
const taskListCompleted = document.getElementById('completedList');

/* Contadores */
const completedCount = document.getElementById('completed-count');
const uncompletedCount = document.getElementById('uncompleted-count');
let numUncompleted = 0;
let numCompleted = 0;
let taskIdCounter = 0; // Inicializa el contador de IDs

/* Actualizar el contenido de los contadores */
function updateTaskCounters() { 
    uncompletedCount.textContent = numUncompleted;
    completedCount.textContent = numCompleted;
}

/* Maneja el cambio de lista de una tarea de acuerto al estado del checkbox. */
function handleCheckboxChange(event, taskItem) {
    const checkbox = event.target;

    if (checkbox.checked) {
        numUncompleted--;
        numCompleted++;
        updateTaskCounters();
        taskListUncompleted.removeChild(taskItem); 
        taskListCompleted.appendChild(taskItem); 
    } else {
        numCompleted--;
        numUncompleted++;
        updateTaskCounters();
        taskListCompleted.removeChild(taskItem);
        taskListUncompleted.appendChild(taskItem); 
    }
}

/* Maneja la eliminación de la tarea dependiento en que lista se encuentra */
function handleDelteTask(taskItem) {
    const parentList = taskItem.parentElement; //Obtener que lista contiene la tarea

    if (parentList === taskListUncompleted) {
        numUncompleted--;
    } else if (parentList === taskListCompleted) {
        numCompleted--;
    }

    updateTaskCounters();
    parentList.removeChild(taskItem);
}

// Función para agregar una nueva tarea
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName !== '') { 
        numUncompleted++;   
        updateTaskCounters();
        
        const divContainer = document.createElement('div');
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-1';
        checkbox.id = `checkbox-${taskIdCounter}`; // Asigna un ID único al checkbox

        // Contenido de la tarea
        const labelContent = document.createElement('label');
        labelContent.className = 'form-check-label';
         // Asigna el atributo 'for' al ID del checkbox para que al hacer clic en el texto se marque/desmarque el checkbox
        labelContent.setAttribute('for', checkbox.id);
        labelContent.textContent = taskName;

        divContainer.appendChild(checkbox);
        divContainer.appendChild(labelContent);

        // Botón para eliminar la tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ms-2';
        deleteBtn.textContent = 'Delete';

        taskItem.appendChild(divContainer);
        taskItem.appendChild(deleteBtn);

        // Agregar eventos para eliminar y marcar como completada una tarea
        deleteBtn.addEventListener('click', () => handleDelteTask(taskItem));
        checkbox.addEventListener('change', (event) => handleCheckboxChange(event, taskItem));

        // Agregar la tarea a la lista de tareas no completadas por defecto
        taskListUncompleted.appendChild(taskItem);

        taskInput.value = '';
    }
}

// Agregar una tarea al hacer clic en el botón
addTaskBtn.addEventListener('click', addTask);

// También agregar la tarea al presionar Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
