const email = document.querySelector('.email')
const password = document.querySelector('.password')
const btnXarey = document.querySelector('.btnXarey')

btnXarey.addEventListener('click', async(e)=>{
  e.preventDefault()
  console.log('hello')
   const data = await axios.get('/data/login')
  const loginData = data.data.some(user=>{
      return (user.email == email.value && user.password == password.value)
  })
  if(loginData === true){
    const eVal = email.value
    sessionStorage.setItem('emailVal', eVal)
      setTimeout(async()=>{
          await axios.post(`/data/user/email`, {email:email.value})

      },10)
     
      window.location.replace('/index.html')
  }
  console.log(loginData)
})
 const signUpButton = document.querySelector('.singUpButton')
 signUpButton.addEventListener('click', (e)=>{
   e.preventDefault()
   window.location.replace('signUp.html')
  })