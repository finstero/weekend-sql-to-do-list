console.log('Hello JS!');

$(onLoad);

function onLoad(){
    console.log('hello jquery!');
    $(".dropdown-toggle").dropdown();
    getTasks();

    //click listeners
    $('#taskButton').on('click', addTask);
    $('#displayTasks').on('click', '.deleteTask', deleteHandler);
    // $('#displayTasks').on('click', '.markComplete', markComplete);
}

function deleteHandler(){
    console.log('clicked delete');
    deleteTask($(this).data("id"));
}

function deleteTask(taskId){
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
      }).then (response => {
        console.log('deleted task');
        getTasks();
      }).catch( err => {
        alert('there was a problem deleting that task. try again.', err);
      });
}

function addTask(){
    console.log('add task button clicked');
    let newTask = {};
    newTask.task = $('#taskIn').val();
    newTask.notes = $('#notesIn').val();

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then ( response => {
        console.log('post response from server', response);
        getTasks();
    })
    .catch( error => {
        console.log('error in post', error);
        alert('unable to add task. try again later');
    });
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    })
    .then ( response => {
        console.log('get response', response);
        renderTasks(response);
    })
    .catch ( error => {
        console.log('error in get', error);
    })
}

function renderTasks(tasks) {
    $('#displayTasks').empty();
    for (let task of tasks) {
        $('#displayTasks').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.priority}</td>
                <td>${task.notes}</td>
                <td><button class="markComplete" data-id="${task.id}" data-complete="${task.complete}">Mark Completed</button></td>
                <td><button class="deleteTask" data-id="${task.id}">Delete Task</button></td>
            </tr>
        `)
    }
}