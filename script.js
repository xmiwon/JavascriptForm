import User from './User.js'
import { validateEmail } from './functions.js'
//Använder den senaste feature för mass deklaration av samma typ av variabel (let)
let email = document.getElementById('email'),
      name = document.getElementById('name'),
      lastname = document.getElementById('lastname'),
      phone = document.getElementById('phone'),
      address = document.getElementById('address'),
      code = document.getElementById('code'),
      city = document.getElementById('city'),
      editBtn = document.getElementById('edit'),
      deleteBtn = document.getElementById('delete')

const array = []
//den här använder jag för att kunna jämföra med en användarid
let findId = '';



document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault()
    let errors = []
//Loopar igenom varenda element som är INPUT
    for (let element of event.target.elements) {
        switch(element.tagName) {
            case 'INPUT':
                errors.push(validateInput(element))
                break;
        }    
    }

 //if error === false
    if(!errors.includes(true)) {
        //Lägger in alla värde från inmatningsfälterna i en class
    const user = new User(email.value, name.value, lastname.value, phone.value, address.value, code.value, city.value)
    let lastIndexArray = array[array.length-1]
    let emailExists = false
       //om array har en längd på 0 så läggs hela user in i listan och exekverar funktionen så ska appenda den värde som har den sista index. Annars loopa och kolla om värdet i inmatningsfältet är densamma som den som finns i classen
    if(array.length === 0) {
        array.push(user)
        lastIndexArray = array[array.length-1]
        addAppend(lastIndexArray)
    } else if (array.length > 0) {
            array.forEach(item => {
            if (email.value === item.email) {
                document.getElementById('email-error').innerText = 'A user with this email address already exists'
                emailExists = true
            } 
        })
        
    if(emailExists === false) {
        array.push(user)
        lastIndexArray = array[array.length-1]
        addAppend(lastIndexArray)
    }



        
    }

       //loopar och rensa
       for(let input of inputs) {
           input.value = ''
       }

    
    editBtn.disabled = false
    deleteBtn.disabled = false
    }
   
    
})

//array uppdaterar bara när du klicka på Submit och då sker det loopen

//Med hjälp av jQuery läggs den senaste inlagda användare till i DOMen med html taggarna som skapas 
function addAppend(lastIndexArray) {
    $("#user-list").append(
        `<div class="${lastIndexArray.id}">
            <div class="flip list-group-item list-group-item-action" id="${lastIndexArray.id}"><span class="span-text">${lastIndexArray.fullName()}</span></div>
            <div class="panel">
                <div id="container-box">       
                    <div><span class="span-text">Id:</span> <span id="span-id">${lastIndexArray.id}</span></div>
                    <div><span class="span-text">Email:</span>: ${lastIndexArray.email}</div>
                    <div><span class="span-text">Phone:</span>: ${lastIndexArray.phone}</div>
                    <div><span class="span-text">Address:</span>: ${lastIndexArray.address}</div>
                    <div><span class="span-text">Zip code:</span> ${lastIndexArray.code}</div>
                    <div><span class="span-text">City:</span> ${lastIndexArray.city}</div>
                </div>
            </div>
        </div></div>`
        );
}

//Denna funktionen gör så att man kan ändra info på en användare. Har gjort så att man inte kan ändra email vilket som blir den unika identiferare
editBtn.addEventListener('click', function(){
    document.getElementById('submit-btn').style.display = "none"
    editBtn.disabled = true
    $("#email").prop('disabled', true)
    //Loopar 
    array.forEach(function (data) {
        if (findId === data.id) {
            //Slänger in data i alla inputfälterna
            email.value = data.email
            name.value = data.name
            lastname.value = data.lastname
            phone.value = data.phone
            address.value = data.address
            code.value = data.code
            city.value = data.city  
        }
       

    })
    //Save change button blir synlig och har en funktion som uppdaterar arrayen där findId matchar en id för en specifik användare
    $('#button-container').append(
        `<button type="button" id="save" class="btn btn-primary">Save changes</button>`
    )
    $('#button-container').on("click", "button", function() {
        array.forEach(function(data, index) {
            //tex om findId = 5 är lika med objectens id så gör detta
            if(findId === data.id) {       
                array[index].name = name.value
                array[index].lastname = lastname.value
                array[index].phone = phone.value
                array[index].address = address.value
                array[index].code = code.value
                array[index].city = city.value       
                   //Här uppdateras taggarna och data för den specifika användare
                $(`.${data.id}`).replaceWith(`
                <div class="${data.id}">
                <div class="flip list-group-item list-group-item-action" id="${data.id}"><span class="span-text">${data.fullName()}</span></div>
                    <div class="panel">
                        <div id="container-box">  
                            <div><span class="span-text">Id:</span> <span id="span-id">${data.id}</span></div>
                            <div><span class="span-text">Email:</span>: ${data.email}</div>
                            <div><span class="span-text">Phone:</span>: ${phone.value}</div>
                            <div><span class="span-text">Address:</span>: ${address.value}</div>
                            <div><span class="span-text">Zip code:</span> ${code.value}</div>
                            <div><span class="span-text">City:</span> ${city.value}</div>
                        </div>
                    </div>
                </div></div>`)
            }   
        })
        //email blir synlig igen och tas bort save knappen. Både edit och submit knappar blir synliga igen
        $("#email").prop('disabled', false)
        $('#save').remove()
        document.getElementById('submit-btn').style.display = "block"
        editBtn.disabled = false
    }) 
}
)
//Här kollar det om findId matchar en användarid och tar bort användaren från arrayen
deleteBtn.addEventListener('click', function() {
    array.forEach(function(data, index) {
        if (findId === data.id) {            
            $(`.${data.id}`).remove()
                array.splice(index, 1)
        }
    })
})





    //En jQuery toggle för animationen när man klickar
    $("body").delegate(".flip", "click", function(){
        $('.panel').not($(this).next(".panel").toggle()).slideUp();
        findUserId(this)
      
      })

//En funktion som jämför user.id med varenda items id i en array och sparar den i findId
const findUserId = (user) => {
    array.forEach(item => {
        if (user.id === item.id) {
            findId = item.id
        }
    })
}














//funktion som validerar inmatningsfälterna speciellt för email
const validateInput = (element) => {
    if (element.required) {
        if (element.value.length < 5 && element.value.length > 0 && element.id !== 'email') {   
            alert('Uppfyller ej kravet')     
            return true
        } else if (element.value.length > 4 && element.id !== 'email') {   
            return false
        } else if (element.id === 'email' && validateEmail(element.value) === false) {
            alert('Uppfyller ej kravet för email') 
            return true
        } else if (element.id === 'email' && validateEmail(element.value === true)) {
            return false
        }
    }
}


const inputs = document.getElementsByTagName('input')


for(let input of inputs) {
//Här validerar de övriga inputsfälterna som kräver en viss längd. Om värdet inte möter kravet blir bordern på fältet rött samt visar det en röd varning text. Submit knappen blir utgråad om det möter ej kravet. Jag kunde ha använt en switch sats som är mycket bättre för just sådana här tillfällen, men jag tyckte if satsen var enklare att se och förstå
    input.addEventListener('keyup', (e) => {
        
        if(e.target.value.length < 5 && e.target.value.length > 0 && e.target.type === 'text') {
            document.getElementById(`${e.target.id}-error`).innerText = `Minimum 5 characters`
            document.getElementById(`${e.target.id}`).style.borderColor = 'red'
            document.getElementById('submit-btn').disabled = true;
        }
        else if ((e.target.value.length > 4 || e.target.value.length === 0) && e.target.type === 'text') {
            
            document.getElementById(`${e.target.id}-error`).innerText = ''
            document.getElementById(`${e.target.id}`).style.borderColor = 'black'
            document.getElementById('submit-btn').disabled = false
        }
        else if (e.target.type === 'number') {
            if (e.target.value.length < 10 && e.target.value.length > 0 && e.target.id === 'phone') {
                document.getElementById(`${e.target.id}-error`).innerText = `Minimum 10 characters`
                document.getElementById(`${e.target.id}`).style.borderColor = 'red'
                document.getElementById('submit-btn').disabled = true;
            } else if (e.target.id === 'code' && e.target.value.length < 5) {
                document.getElementById(`${e.target.id}-error`).innerText = `Minimum 5 characters`
            } else {
                document.getElementById(`${e.target.id}`).style.borderColor = 'black'
                document.getElementById(`${e.target.id}-error`).innerText = ``
            }
            
        }
        else if ((e.target.value.length > 10 || e.target.value.length === 0) && e.target.id === 'phone'){
            document.getElementById(`${e.target.id}-error`).innerText = ''
            document.getElementById(`${e.target.id}`).style.borderColor = 'black'
            document.getElementById('submit-btn').disabled = false
        } else if (e.target.type === 'email' && validateEmail(email.value) === false) {
                document.getElementById(`${e.target.id}`).style.borderColor = 'red'
                document.getElementById(`${e.target.id}-error`).innerText = `Invalid email form`
                document.getElementById('submit-btn').disabled = true

        }    else if(validateEmail(email.value) === true) {
            document.getElementById(`${e.target.id}`).style.borderColor = 'black'
            document.getElementById(`${e.target.id}-error`).innerText = ''
            document.getElementById('submit-btn').disabled = false
        }  
    })
}
