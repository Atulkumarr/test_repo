// target all the element 
let wrapper = document.querySelector(".wrapper")
let content_parent = document.querySelector(".content_parent")
let noteTitle = document.querySelector("#noteTitle")
let noteDesc = document.querySelector("#noteDesc")
let addNote = document.querySelector("#addNote")
let My_form = document.querySelector("#My_form")
let modal_title = document.querySelector(".modal-title")
//Data Array
let dataArray = JSON.parse(localStorage.getItem('DataList')) || []
// Get date 
$(document).ready(function(){


var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var AcDate = new Date();
var simpleDate = AcDate.getDate();
var dateYear = AcDate.getFullYear()
var dateMonth = AcDate.getMonth()
var monthName = month[dateMonth]

var FullDate = monthName + "," + simpleDate + " " + dateYear

// clear function 
// function clear_function (){
//     wrapper.innerHTML = ''
// } 



// addNote eventlistener 
addNote.addEventListener("click", (e) => {
    e.preventDefault()
    var noteTitleVal = noteTitle.value
    var noteDescVal = noteDesc.value

    dataArray.push({
        noteTitle: noteTitleVal,
        noteDesc: noteDescVal,
        date: FullDate
    })

    modal_title.innerHTML = "Add your Note"
    addNote.innerHTML = "Add your Note"
    if (noteTitleVal || noteDescVal) {
        let template = `<div class="noteBox">
        <h2>${noteTitleVal}</h2>
        <p>${noteDescVal}</p>
        <div class="bottomBox">
            <div class="row">
                <div class="col-6">
                    <p>${FullDate}</p>
                </div>
                <div class="col-6 bottom_dropdown">
                    <div class="dropdown">
                        <i class="fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" arial-expanded="false"></i>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a href="#" class="dropdown-item edit_btn">Edit</a></li>
                            <li id="deleteBtn"><a href="#" class="dropdown-item delete" >Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        content_parent.innerHTML = content_parent.innerHTML + template 
    }

        localStorage.setItem("DataList", JSON.stringify(dataArray))
        let noteBoxDiv = document.querySelectorAll(".noteBox")// target li from the class
        let arrayfrom = Array.from(noteBoxDiv)// convert node list into array
        arrayfrom.forEach((data, index) => {
            data.setAttribute("id", index)// added id on the li
        })
        My_form.reset();
        $('#exampleModal').modal('hide');
})



dataArray.forEach((data, index) => {
    content_parent.innerHTML = content_parent.innerHTML + `<div class="noteBox">
    <h2>${data.noteTitle}</h2>
    <p>${data.noteDesc}</p>
    <div class="bottomBox">
        <div class="row">
            <div class="col-6">
                <p>${data.date}</p>
            </div>
            <div class="col-6 bottom_dropdown">
                <div class="dropdown">
                    <i class="fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" arial-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onclick="UpdateNote(${index}, '${data.noteTitle}','${data.noteDesc}', ' edit_btn')"><a href="#" class="dropdown-item">Edit</a></li>
                        <li id="deleteBtn"><a href="#" class="dropdown-item delete" >Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `
})
}); 





// Edit note function

function UpdateNote(index,title,desc){
    console.log(index,title,desc)
    $('#update_modal').modal('show');
    noteTitle.value = title
    noteDesc.value = desc
   
    modal_title.innerHTML = "Update your Note"
    addNote.innerHTML = "Update your Note"

    const update = document.querySelector('#updateNote')

    let update_note_dec = document.querySelector('#updatenoteDesc')
    let update_note_title = document.querySelector('#updatenoteTitle')


    update.addEventListener('click', function(){
        // clear_function()
        content_parent.innerHTML = ''

    $('#update_modal').modal('hide');
     dataArray[index].noteTitle  =  update_note_title.value
     dataArray[index].noteDesc  =  update_note_dec.value
    console.log(dataArray)    


dataArray.forEach((data, index) => {
    content_parent.innerHTML = content_parent.innerHTML + `<div class="noteBox">
    <h2>${data.noteTitle}</h2>
    <p>${data.noteDesc}</p>
    <div class="bottomBox">
        <div class="row">
            <div class="col-6">
                <p>${data.date}</p>
            </div>
            <div class="col-6 bottom_dropdown">
                <div class="dropdown">
                    <i class="fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" arial-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onclick="UpdateNote(${index}, '${data.noteTitle}','${data.noteDesc}', ' edit_btn')"><a href="#" class="dropdown-item">Edit</a></li>
                        <li id="deleteBtn"><a href="#" class="dropdown-item delete" >Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `
})
    })   
    
    
}