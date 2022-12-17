console.log('funcionando');


const formulario = document.querySelector('#formulario');
const tituloForm = document.querySelector('#titulo-formulario');
const task = document.querySelector('#tareas');
let tareas = [];



function mostrarHTML () {
    task.innerHTML = ``;
    if(tareas.length < 1) {
        const mensaje = document.createElement('h5');
        mensaje.textContent = 'Sin tareas';
        return
    }
    tareas.forEach((item) => {
        const itemTarea = document.createElement('div');
        itemTarea.classList.add('item-tarea');
        itemTarea.innerHTML = `
        ${item.estado ? (
            `<p class= "completa">${item.tarea}</p>`
        ) : (
            `<p>${item.tarea}</p>`
        ) }
        <div class="botones">
            <button data-id="${item.id}" class="eliminar">Eliminar</button>
            <button data-id="${item.id}" class="completada">Completada</button>
        </div>
        `;
        task.appendChild(itemTarea);
    })
}

function validarFormulario (e) {
    e.preventDefault();
    const tarea = document.querySelector('#tarea').value;
    if (tarea.length < 1) {
        tituloForm.textContent = 'Formulario vacío';
        setTimeout( () => {
            tituloForm.textContent = 'Enlista tus tareas'
        }, 2000);
        return
    }
    const objTarea = {
        id: Date.now(),
        tarea: tarea,
        estado: false,
    }
    tareas = [...tareas, objTarea];
    formulario.reset();
    mostrarHTML();
}


function eliminarTarea (e) {
    if (e.target.classList.contains('eliminar')) {
        const tareaId = Number(e.target.getAttribute("data-id"));
        const newTask = tareas.filter((item) => item.id !== tareaId);
        tareas = newTask;
        mostrarHTML();
    }
}

function tareaCompletada (e) {
    if (e.target.classList.contains('completada')) {
        const tareaId = Number(e.target.getAttribute("data-id"));
        //console.log(tareaId);
        const newTask = tareas.map((item) => {
            if (item.id === tareaId) {
                item.estado = !item.estado;
                return item
            } else {
                return item;
            }
        })
        tareas = newTask;
        mostrarHTML();
    }

}

(() => {
    formulario.addEventListener('submit', validarFormulario);
    task.addEventListener('click', eliminarTarea);
    task.addEventListener('click', tareaCompletada);
} ) ()