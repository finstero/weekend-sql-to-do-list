// const { default: swal } = require("sweetalert");

console.log('Hello JS!');

$(onLoad);

function onLoad(){
    // console.log('hello jquery!');
    // grab tasks from database and display on DOM
    getTasks();

    // click listeners
    $('#taskButton').on('click', addTask);
    $('#displayTasks').on('click', '.deleteTask', deleteHandler);
    $('#displayTasks').on('click', '.markComplete', handleComplete);
}

// grabs id in data when mark completed button clicked
// runs markComplete function using grabbed id
function handleComplete(){
    // console.log('clicked marked complete');
    markComplete($(this).data("id"));
}

// put route to change marked complete status in database
function markComplete(taskId){
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {
          completeStatus: 'true'
        }
      })
      .then (response => {
        console.log('marked complete', response);
        getTasks();
      })
      .catch (error => {
        console.log('problem with marking complete', error);
        alert('there was a problem marking task as complete');
      });
}

// grabs id in data when delete button clicked
// runs deleteTask function using grabbed id
// includes alert to confirm delete
function deleteHandler(){
    // console.log('clicked delete');
    let deleteId = $(this).data("id")
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
    })
        .then((willDelete) => {
            if (willDelete) {
            swal("Your task has been deleted!", {
                icon: "success",
            });
            deleteTask(deleteId);
            }
        });
}

// delete route 
function deleteTask(taskId){
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
      })
      .then (response => {
        console.log('deleted task');
        getTasks();
      })
      .catch( err => {
        alert('there was a problem deleting that task. try again.', err);
      });
}

// collects task info as object from inputs.
// post route to send object
function addTask(){
    // console.log('add task button clicked');

    let taskVal = $('#taskIn').val();
    let priorityVal = $( "#priorityIn option:selected" ).text();
    let notesVal = $('#notesIn').val();

    let newTask = {};
    newTask.task = taskVal;
    newTask.priority = priorityVal;
    newTask.notes = notesVal;
    
    // check if user entered something into task and priority. force user to enter before
    // adding task
    if (!taskVal){
        swal('Oops!', 'Please make sure you enter a task.');
    }
    else if (priorityVal == 'priority'){
        swal('Oops!', 'Please make sure you choose a priority.');
    }
    else {
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

    // clear task and notes inputs. set priority select back to default 'select'.
    $('.input').val('');
    $('#priorityIn').val('priority');
}

// get route for getting all tasks from server/db.
// must be used with renderTasks
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

// render all tasks on DOM after getting from server/db.
function renderTasks(tasks) {
    $('#displayTasks').empty();
    for (let task of tasks) {

        // display change based on if task is complete
        if (task.complete == false){
            $('#displayTasks').append(`
                <tr>
                    <td>${task.task}</td>
                    <td>${task.priority}</td>
                    <td class="appendComplete">${task.notes}</td>
                    <td><button class="markComplete btn btn-light btn-sm" data-id="${task.id}" data-complete="${task.complete}">complete</button></td>
                    <td><button class="deleteTask btn btn-light btn-sm" data-id="${task.id}">delete</button></td>
                </tr>
            `);
        }
        else if (task.complete == true){
            $('#displayTasks').append(`
                <tr>
                    <td><del>${task.task}</del></td>
                    <td><del>${task.priority}</del></td>
                    <td><del>${task.notes}</del></td>
                    <td></td>
                    <td><button class="deleteTask btn btn-light btn-sm" data-id="${task.id}">delete</button></td>
                </tr>
        `);
        }
    }
}