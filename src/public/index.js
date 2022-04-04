let socket = io();

let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log')
let user=null;

//log.innerHTML=""

const nickname = document.getElementById('nickname')
const errorLog = document.getElementById('errorLog')
const nickForm = document.getElementById('nickForm')
const containerChat = document.getElementById('containerChat')
//login app
nickname.addEventListener('keyup',(e)=>{
    if (e.key === "Enter"){
        
        if(nickname.value.trim().length===0){//reviso si hay algo escrito
            errorLog.innerHTML= `No ingreso ningun parametro, Vuelva a intentar`
            errorLog.className= 'error'
         // socket.emit('message', {user, message: chatBox.value.trim()} )
         }else{
             user = nickname.value.trim()
             nickForm.style.display= 'none'
             containerChat.classList.remove('containerChat')
             log.scrollTop = log.scrollHeight;
             console.log(user)
         }
    }
})
chatBox.addEventListener('keyup', event=>{
    if (event.key === "Enter"){
        if(chatBox.value.trim().length>0){//reviso si hay algo escrito
            socket.emit('message', {user, message: chatBox.value.trim()} )
            chatBox.value = ""
        }
    }
})




//sockets eventos
socket.on('log', data =>{
    let message = "";
        data.forEach(log =>{
            if(log.user === user){
                console.log('es igual el user')
                // div class="w-auto p-3" style="background-color: #eee;">Width auto</div>
                message= message +`<div class="row aling-items-end" >
                                        <div class="col text-end  bd-highlight"">
                                            <strong>${log.user} dice:</strong>
                                            <p>${log.message}</p>
                                        </div>
                                    </div>`
            }else{
                console.log('No igual el user')
                message= message +`<div class="" >
                                        <div class="comentarios burbuja2">
                                            <span>${log.user} dice:</span>
                                            <p>${log.message}</p>
                                        </div>
                                    </div>`

            }
            //message= message+ `${log.user} dice: ${log.message}</br>`
        })
    log.innerHTML=message
    log.scrollTop = log.scrollHeight;
})
