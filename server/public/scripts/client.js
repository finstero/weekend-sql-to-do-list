console.log('Hello JS!');

$(onLoad);

function onLoad(){
    console.log('hello jquery!');
    $(".dropdown-toggle").dropdown();
    getTasks();
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
}