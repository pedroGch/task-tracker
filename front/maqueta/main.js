let task_array = [
  {
    id:1 ,
    title: 'Hacer la cama',
    description:'una descripcion',
    completed: false,
    state: 'uncomplete',
    created_at: '',
    finished_at: '',

  },
  {
    id:2 ,
    title: 'dar de comer a los animales',
    description:'una descripcion',
    completed: false,
    state: 'uncomplete',
    created_at: '',
    finished_at: '',

  },
  {
    id:3 ,
    title: 'checkear el email del trabajo',
    description:'una descripcion',
    completed: false,
    state: 'uncomplete',
    created_at: '',
    finished_at: '',

  },
  {
    id:4 ,
    title: 'limpiar el pasillo',
    description:'una descripcion',
    completed: false,
    state: 'uncomplete',
    created_at: '',
    finished_at: '',

  },
];
let completed_task_array = [];

let task_section     = document.querySelector('.task_section');
let select_kind_task = document.querySelector('#type_task');
let span_task_name   = document.querySelector('.task_name');
let addTaskBtn       = document.querySelector('#addTaskBtn');

addTaskBtn.addEventListener('submit', (e) =>{
  e.preventDefault();
  let task_name = addTaskBtn['0'].value.trim();
  addTaskBtn['0'].value = '';
  (task_name) ? addTask(task_name, task_array) : null 
});

select_kind_task.addEventListener('change', (e) =>{
  let state_task = select_kind_task.value
  console.log(state_task);
  
  (state_task == 1) ? load(task_array, task_section) : load(completed_task_array, task_section) 
  
});



function addTask(task, tasks) {
  task_item = {
    id: tasks.length+1 ,
    title: task,
    description:'una descripcion',
    completed: false,
  }
  tasks.push(task_item);
  load(task_array, task_section);
}

function deleteTask(task_id) {
  const task_array_id = task_array.findIndex((elemento) => elemento.id === task_id);
  if (task_array_id !== -1) {
    task_array.splice(task_array_id, 1);
  };
  load(task_array, task_section);
}

function completeTask(task_id) {
  
  //buscar indice en el arreglo de tareas
  let index_task = task_array.findIndex(objeto => objeto.id === parseInt(task_id));
  //agrego el elemento al arrgelo de tarea completadas
  let task = task_array[index_task];
  task.completed = true;
  completed_task_array.push(task); 
  //elimino el elemento del arreglo
  deleteTask(parseInt(task_id))
}

function loadCompletedTaskEvent(){
  let checkboxes   = document.querySelectorAll('.task_checkbox');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function(event) {
      // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en un checkbox.
      
      completeTask(checkbox.id)
    });
  });

}

function load (tasks, inSection) {
  let chain = '';
  inSection.innerHTML = chain;
  tasks.forEach(task => {
    let checked = task.completed ? 'checked disabled' : '';

    chain += `<div class="task_container">
      <input type="checkbox" class="task_checkbox" ${checked} name="task_${task.id}" id="${task.id}">
      <label for="1" class="sr-only">marcar tarea</label>`
      if (task.completed){
        chain += `<span class="task_name"><del>${task.title}</del></span>
        <button class="delete_task" onclick="deleteTask(${task.id})">Eliminar</button> </div>`
      }else{
        chain += `<span class="task_name">${task.title}</span>
        <button class="delete_task" onclick="deleteTask(${task.id})">Eliminar</button> </div>`
      }
  });
  inSection.innerHTML += chain;
  loadCompletedTaskEvent()
}


load(task_array, task_section);

