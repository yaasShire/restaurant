const tableBody = document.querySelector('.tableBody')
window.addEventListener('DOMContentLoaded', async()=>{
    const singEm = sessionStorage.getItem('singEm')
    const emailValue = sessionStorage.getItem('emailVal')
    console.log(singEm, emailValue)
    const data = await axios.get('/data/cart')
    const usersCart = data.data.map(cart=>{
        const realV = singEm || emailValue
        if(cart.email === realV){
            return `
            <tr>
            <td class=""><img src="${cart.image}" class="imgFood" alt="food image" style="width: 70px; height:60px;"></td>
            <td class="magac">${cart.magacaCuntada}</td>
            <td class="pp">${"$" + cart.qiimahaSheygiiba}</td>
            <td class="" ><input class="quantity" type="number" class="form-control" style="width: 50px; "></td>
            <td ><button class="btn btn-danger deleteRow">Remove</button></td>
        
        </tr>`
        }
    }).join('')
   
    tableBody.innerHTML = usersCart
    // updateCartTotal()
    inputM()
    removeButtons()
})
function quantityChanged(event){
    let input = event.target
   if(isNaN(input.value) || input.value<=0){
       input.value = 1
   }
   updateCartTotal()
}
function inputM(){
    let quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

}

async function removeCartItem(event){
    let buttonClicked = event.target
    const rowOrder = buttonClicked.parentElement.parentElement
    const foodName = rowOrder.getElementsByClassName('magac')[0].innerText
    setTimeout(async()=>{
        const data = await axios.patch('/api/remove/order', {foodName:foodName})
        
    }, 10)
    console.log('hello')
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function removeButtons(){
    let dangerButtons =  document.querySelectorAll('.deleteRow')
    for(let i = 0; i< dangerButtons.length; i++){
        let button = dangerButtons[i]
        button.addEventListener('click', removeCartItem)
         }

}


function updateCartTotal(){
    const cartRows = tableBody.getElementsByTagName('tr')
    let total = 0
    for(let i = 0; i< cartRows.length; i++){
        let row = cartRows[i]
        const pricePerItem = parseFloat(row.getElementsByClassName('pp')[0].innerText.replace('$', ''))
        const quantity = row.getElementsByClassName('quantity')[0].value
        // console.log(quantity)
       total = total + (pricePerItem * quantity)

    //    total = Math.round(total * 100)/100
       document.querySelector('.totalMoney').innerText = "$" + total
        
    }
}

const sendOrder = document.querySelector('.sendOrder')
sendOrder.addEventListener('click', async()=>{
    const tRow = tableBody.getElementsByTagName('tr')
    for(let i = 0; i< tRow.length; i++){
        const row = tRow[i]
        // console.log(row)
        
        // const imageHolder = row.getElementsByClassName('image-holder')[0]
        const imageItem = row.querySelectorAll('.imgFood')[0].src
        const magac = row.querySelectorAll('.magac')[0].innerText
        const pp = row.querySelectorAll('.pp')[0].innerText.replace('$', '')
        const quantity = Number(row.querySelectorAll('.quantity')[0].value)
        const totalP = Number(document.getElementsByClassName('totalMoney')[0].innerText.replace('$', ''))
        // console.log(imageItem, magac, pp, quantity)
        
        if(totalP >0){
            sessionStorage.setItem('total',totalP)
            const alertPart = document.getElementsByClassName('alertPart')[0]
            const fullName = document.getElementsByClassName('fullName')[0].value
            if(fullName !==''){
                console.log(imageItem, magac, pp, quantity)
                setTimeout(async()=>{
                    await axios.post('/api/realOrder', {imageItem:imageItem, magac:magac, pp:pp, quantity:quantity, fullName:fullName})
                    
                }, 10)

           
                alertPart.innerHTML = `
                <div class="alert alert-success alert-dismissible">
           <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
           <strong>GULL!</strong>macamiil waxaan kuugu adeegi doonnaa sida ugu dhaqsiyaha badan.
         </div>`
            }else{
                alertPart.innerHTML = `
                <div class="alert alert-danger alert-dismissible">
           <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
           <strong>GULL!</strong>WAALAAL GALI MAGACAGA OO DHAMEYSTIRAN.
         </div>`
            }
        }
    }
         tableBody.innerText =  ''
       
                document.getElementsByClassName('totalMoney')[0].innerText = "$" + 0
                let logedUser = sessionStorage.getItem('emailVal')
                setTimeout(async()=>{
                    await axios.patch('/delete/fullfilled/order', {logedUser:logedUser})
       
                }, 10)
})

const btnCheckOut = document.querySelector('.btnCheckOut')
btnCheckOut.addEventListener('click', (e)=>{
    e.preventDefault()
  const magacooBuuxa = document.querySelector('.magacooBuuxa')
  const phoneNumber = document.querySelector('.phoneNumber')
  const batch = document.querySelector('.BATCH')
  console.log(magacooBuuxa.value)
  console.log(phoneNumber.value)
  console.log(batch.value)
  if((magacooBuuxa.value !='' && phoneNumber.value !='') && batch.value !=''){
      setTimeout(async()=>{
         await axios.post('/api/customer/info', {magacooBuuxa:magacooBuuxa.value, phoneNumber:phoneNumber.value, batch:batch.value})
      },5)
      document.querySelector('.alertContainer').innerHTML =  `
      <div class="alert alert-success alert-dismissible">
           <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
           <strong>GULL!</strong>macamiil waxaan kuugu adeegi doonnaa sida ugu dhaqsiyaha badan.
         </div>
      `
      console.log(e.target.href)
  }else{
    document.querySelector('.alertContainer').innerHTML =  `
    <div class="alert alert-danger alert-dismissible">
         <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
         <strong>laguma guuleysan!</strong>macamiil buuxi foomka adigoo mahadsan.
       </div>
    `

  }

})

const btnPhoneApp = document.querySelector('.phoneApp')
btnPhoneApp.addEventListener('click', (e)=>{
    const totalP = Number(document.getElementsByClassName('totalMoney')[0].innerText.replace('$', ''))
    const totalM = sessionStorage.getItem('total')
    e.target.href= `tel:*712*610941595*${totalM}#`
    console.log(e.target)
   
})