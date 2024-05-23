const inputBox= document.getElementById("input_box");
const listContainer =document.getElementById("list-con");
const removeAll = document.getElementById("delete-but");

function addTask()
{
    if(inputBox.value === '')
        {
            alert("You must write something");
        }
    else{
        let li= document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
        let edit =document.createElement("edit");
        edit.innerHTML="\u270e";
        li.appendChild(edit);
    }   
    inputBox.value=" "; 
    saveData();
}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.tagName === "EDIT"){
        editTask(e.target.parentElement);
    }
},false);
function editTask(li) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = li.childNodes[0].nodeValue.trim();
    li.insertBefore(input, li.childNodes[0]);
    li.childNodes[1].nodeValue = ""; 

    input.addEventListener("blur", function () {
        li.childNodes[1].nodeValue = input.value;
        li.removeChild(input);
        saveData();
    });

    input.addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            input.blur();
        }
    });

    input.focus();
}
function saveData(){
    
        localStorage.setItem("data",listContainer.innerHTML);
    
   
}
function showData(){
  
    listContainer.innerHTML= localStorage.getItem("data");

  
  
  
}

removeAll.addEventListener("click",function(){
    listContainer.innerHTML="";
    saveData();

});
showData();
