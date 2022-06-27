if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
        mainBody()
    })
}else{
    mainBody()
}

function mainBody(){
    const images = [
        'image1.jpg','image2.jpg','image3.jpg', 'faras1.jiff', 'libaax2.jiff','mukulaal1.jiff','burger.png'
    ]
    window.addEventListener('DOMContentLoaded', async()=>{
  const data = await axios.get('/data/post/blog')
  console.log(data)
    const postsHolder = document.querySelector('.postsHolder')
    const imagePart = document.querySelector('.imagePart')
    
    let realImage
    const postResult = data.data.map(post=>{
        let img = document.createElement('img')
        for(let i = 0; i<images.length; i++){
            let imageItem = images[i]
          const valIMG=  post.IMAGE.slice(10)
            console.log(valIMG)
                if(valIMG === imageItem){
                      realImage = imageItem
                }
        }

        return `
        <div class="col-lg-4 col-sm-6 bottommargin-sm">
    <div class="ipost clearfix">
    <div class="entry">
    <div class="entry-image nobottommargin">
    <a href="images/blogs/1.jpg" data-lightbox="image"><img class="image_fade" src="${realImage}" alt="Image 1" style="height:250px;"></a>
    </div>
    <div class="entry-title">
    <ul class="entry-meta clearfix">
    <li><a href="#">${new Date(post.Taariikh).toLocaleDateString()}</a></li>
    <li><a href="#">Video</a></li>
    </ul>
    <div class="clear"></div>
    <h2 class="nobottommargin"><a href="/showPost/${post.IMAGE}/${post.TITLE}/${post.MARKDOWN}/${post.Taariikh}">${post.TITLE}.</a></h2>
    </div>
    </div>
    </div>
    </div>`
        
    }).join('')
    
  postsHolder.innerHTML = postResult
         
    })
}