const email = document.querySelector('.email')
const password = document.querySelector('.password')
const btnXarey = document.querySelector('.btnXarey')
const alertPart = document.querySelector('.alertPart')
console.log(email, password, btnXarey, alertPart)
window.addEventListener('DOMContentLoaded', ()=>{
    email.value = ''
    password.value=''
})
btnXarey.addEventListener('click', async(e)=>{
e.preventDefault()
    console.log('bn')
    if(email.value !=='' && password.value !==''){
        sessionStorage.setItem('singEm', email.value)
        setTimeout(async()=>{
            await axios.post('/api/signup', {email:email.value, password:password.value})
        }, 10)
       alertPart.innerHTML = `<div class="alert alert-success alert-dismissible">
       <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
       <strong>GULL!</strong>WAA LA ABUURAY ACCOUNT-KA CUSUB HAMBALYO.
     </div>`
     setTimeout(()=>{
         window.location.replace('menu.html')

     },2000)
     
    }
})

const loginButton = document.querySelector('.loginButton')
loginButton.addEventListener('click', (e)=>{
    e.preventDefault()
    window.location.replace('login.html')
})