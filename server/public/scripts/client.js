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

}