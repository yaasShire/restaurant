window.addEventListener('DOMContentLoaded', ()=>{
    const orderCardsHolder = document.querySelector('.orderCardsHolder')
    setTimeout(async()=>{
    const data =  await axios.get('/api/customers')
    let name = ''
    const customer = data.data.map(customer=>{
     name = customer.magacDalbadaha
        return `
        <div class="col-sm-4 col-12 card cusHolder  p-4  mr-5 mb-4 ml-1 mt-5 row" style="width: 500px; height:auto;">
        <h5 class="magac ">${customer.magacDalbadaha}</h5>
        <div class="hedPart d-flex justify-content-between ">
          <div class="mb-4">
            <h6 class="mb-0">Order #${customer.ID}</h6>
            <span class="">12-2-2022</span>
          </div>
          <div> 
            <img src="burger.png" alt="food image" style="width: 50px; height: 50px; background-position: center; background-repeat: no-repeat; border-radius: 50%;">
          </div>
        </div>
        <!-- headpart ends here -->
        <!--sub order  -->
        <div class="subOrder">
 
        </div>
        <!-- sub order ends here -->
        <button class="btn btn-danger tirtir">DELETE</button>
      </div>

        `
        
    }).join('')
    orderCardsHolder.innerHTML = customer
    const cusHolder = document.querySelector('.cusHolder')
    const tirtir = document.querySelectorAll('.tirtir')
    tirtir.forEach(tir=>{
      tir.addEventListener('click', (e)=>{
        const targetEl = e.target
        const tParentEl = targetEl.parentElement
        const targetName = tParentEl.querySelector('.magac').innerText
       setTimeout(async()=>{
           await axios.patch('/delete/card', {name:targetName})
       }, 10)
       tParentEl.remove()
        console.log(targetName.innerText)
      })
    })
    console.log(tirtir)
    }, 10)


    const subOrder = orderCardsHolder.querySelector('.subOrder');
    
    setTimeout(async()=>{
        const orders = await axios.get('/api/get/orders')
        const cards = orderCardsHolder.querySelectorAll('.card')
        // orders.data.map(order=>{
        //     console.log(order)
       
        // })
        // console.log(orders.data)
        cards.forEach(card=>{
            let name = card.querySelector('.magac').innerText
            let currSUbOrder = card.querySelector('.subOrder')
            for(let i = 0; i<orders.data.length; i++){
                const order = orders.data[i]
                if(name == order.fullName){
                
                    card.innerHTML += `
                    <div style="width:350px; height:auto; border-radius:20px; background-color: rgba(128, 128, 128, 0.103);" class="mt-2 p-3  ml-0 text-center" >
                    <div class="completed"></div>
                    <div class="img-order d-flex mb-5 mt-2 p-3  ml-0 mr-3">
                        <img src="${order.image}" alt="food image" style="width: 50px; background-size: cover; background-position: center; background-repeat: no-repeat; height: 50px; border-radius: 50%;">
                        <div class="order-info    ml-0 mr-3 d-flex flex-column" style="width:100px">
                          <h6 class="mb-0 MAGAC" style="font-weight:bold;">${order.magacC}</h1>
                           <div class="d-flex flex-column">
                             <span style="color: rgba(0, 0, 0, 0.397);">Lorem ipsum dolor sit.</span>
                             <div class="price-quantity  ml-0 mr-5 d-flex justify-content-between " style="width: 260px;">
                               <span>$${order.pricePerItem}</span>
                               <span style="font-weight: bold;">Qty: ${order.quantity}</span>
                             </div>
                  
                           </div>
                         </div>
                      </div>
                      <hr>
                      <div class="order-footer-part d-flex justify-content-between align-items-center">
                        <div class="nItem-total d-flex flex-column">
                          <span  style="width: 80px;">x1 items</span>
                          <span style="font-weight: bold;">$20.00</span>
                        </div>
                        <div class="execute-part ml-5 d-flex">
                          <button class="btn btn-danger btn-xs text-center btnCancel" style="width: 70px; height:30px; margin-right: 10px;">CANCEL</button>
                          <button class="btn btn-success text-center btnComplete" style="width: 79px; height:30px; margin-left: 10px;">COMPLETE</button>
                        </div>
                      </div>
                </div>
                    
                    `
                }
                // console.log(order)
            }
            
           
              })
              const btnCancel = document.querySelectorAll('.btnCancel')
              btnCancel.forEach(cancel=>{
                  cancel.addEventListener('click', (e)=>{
                      const targetCancel = e.target
                      const subParent = targetCancel.parentElement.parentElement.parentElement
                      const magac = subParent.querySelector('.MAGAC').innerText
                      console.log(subParent, magac)
                      const customerName = targetCancel.parentElement.parentElement.parentElement.parentElement.querySelector('.magac').innerText
                      const parentTarget = targetCancel.parentElement.parentElement.parentElement
                      setTimeout(async()=>{
                          await axios.patch('/api/cancel/order', {maga:magac, cusName:customerName})
                      },10)
                      parentTarget.remove()
                      alert(removed)
                  
                  })
              })
              const btnCompleted = document.querySelectorAll('.btnComplete')

              btnCompleted.forEach(complete=>{
                  complete.addEventListener('click', (e)=>{
                      const targetCOm = e.target
                    const completedContainer = targetCOm.parentElement.parentElement.parentElement.querySelector('.completed')
                    completedContainer.innerHTML = `  <kbd class="h5 bg-success " style="width:140px; color:white;">COMPLETED</kbd>
                    `
                })
              })
     
    }, 10)

 

})


