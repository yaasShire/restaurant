if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
        // mainBody()
    })
}{
    mainBody()
}
console.log('fjksdfjlksafjlkj')
function mainBody(){
    const postTitle = document.querySelector('.postTitle')
    const sawir = document.querySelector('.sawir')
    const markDown = document.querySelector('.markDown')
    const btnXarey = document.querySelector('.btnXarey')
    const alertPart = document.querySelector('.alertPart')
    btnXarey.addEventListener('click', async()=>{
        if((postTitle.value !=='' && sawir.value !=='') && markDown.value!==''){
            setTimeout(async()=>{
                await axios.post('/data/blog', {postTitle:postTitle.value, sawir:sawir.value,
                    markDown:markDown.value})

            },10)
            alertPart.innerHTML = `
            <div class="sufee-alert alert with-close alert-success alert-dismissible fade show">
        <span class="badge badge-pill badge-primary">guul</span>
        WAA LAGU GUULEYSTAY DIRIDA POSTIGA CUSUB.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`

             
        }else{
            alertPart.innerHTML = `
            <div class="sufee-alert alert with-close alert-success alert-dismissible fade show "  style="border-radius: 12px;">
        <span class="badge badge-pill badge-primary ">guul</span>
        WAA LAGU GUULEYSTAY DIRIDA POSTIGA CUSUB.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
        }

    })
}