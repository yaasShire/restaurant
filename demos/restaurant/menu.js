if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
        mainBody()
    })
}else{
    mainBody()
}

 function mainBody(){
    const emailValue = sessionStorage.getItem('emailVal')
    const sigEm = sessionStorage.getItem('singEm')
    const realVal = sigEm || emailValue
    const portFolioImage = document.querySelectorAll('.portfolio-image')
    portFolioImage.forEach(menu=>{

    menu.addEventListener('click', async(e)=>{
        e.preventDefault()
    const targetEl = e.target
    const imageEl = targetEl.getElementsByTagName('img')[0].src
    const parentElMenu =  e.target.parentElement
    const portfolioDesc = parentElMenu.querySelector('.portfolio-desc')
    const targetH4 = portfolioDesc.getElementsByTagName('h4')[0].innerText
    const targetDiv = portfolioDesc.getElementsByTagName('div')[0].innerText.replace('$', '')
    setTimeout(async()=>{
        await axios.post('/api/menu', {menuName:targetH4, price:targetDiv, menuImage:imageEl, emailValue:realVal})
          
    }, 10)
            
    const div = document.createElement('div')
    div.style.color="blue"
    div.style.fontSize="25px"
    div.innerText="ADDED"
    parentElMenu.append(div)

        })
    })


    //read breakfast

//     setTimeout(async()=>{
//   const data = await axios.get('/api/breakfast')
//   console.log(data)
//   const breakfast = document.querySelector('.breakfastt')
//   const quraac = data.data.map(food=>{
//       console.log(food.image.slice(65))
//       return `
//       <div class="col-lg-3 col-md-6">
// <div class="iportfolio mb-4 clearfix">
// <a href="#" class="portfolio-image"><img src="${food.image.slice(65)}" alt="1" class="rounded"></a>
// <div class="portfolio-desc pt-2">
// <h4 class="mb-1"><a href="#" class="">Banana Pancake</a></h4>
// <div class="item-price">&dollar; 19.49</div>
// </div>
// </div>
// </div>
      
//       `
//   }).join('')
//   breakfast.innerHTML = quraac
//     }, 10)


    // setTimeout(async()=>{
    //     const data = await axios.get('/api/lunch')
    //     const breakfast = document.querySelector('.lunch')
    //     const qado = data.data.map(food=>{
    //         console.log(food.image.slice(65))
    //         return `
    //         <div class="col-lg-3 col-md-6">
    //         <div class="iportfolio mb-4 clearfix">
    //         <a href="#" class="portfolio-image"><img src="${food.image.slice(65)}" alt="1" class="rounded"></a>
    //         <div class="portfolio-desc pt-2">
    //         <h4 class="mb-1"><a href="#">Pomegranate Salad</a></h4>
    //         <div class="item-price">&dollar; 19.49</div>
    //         </div>
    //         </div>
    //         </div>
            
    //         `
    //     }).join('')
    // },10)
}