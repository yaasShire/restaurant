const express = require('express')
const app = express()
const {createConnection} = require('mysql')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const path = require('path')
const { off } = require('process')
const { application } = require('express')
app.use(express.static('PUBLIC'))

const conn = createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'restaurant'
})
conn.connect((err)=>{
    if(err) throw err
    console.log('connected')
})

app.post('/data/blog', (req, res)=>{
    const data = req.body
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(data)
    const sql = `INSERT INTO blog(TITLE, IMAGE, MARKDOWN, Taariikh) VALUES("${data.postTitle}", "${data.sawir}", "${data.markDown}", "${date}")`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})
const eData =[]

app.get('/data/post/blog', (req, res)=>{
    const sql = 'SELECT * FROM blog'
    conn.query(sql, (err, result, fields)=>{
        if(err) throw err
        res.json(result)
    })
})
app.get('/showPost/:image/:title/:markdown/:Taariikh', (req, res)=>{
    const data = req.params

    const date = new Date(req.params.Taariikh).toLocaleDateString()
    res.render('showPost', {data:data, date})
})
app.get('/back/blog', (req, res)=>{
  
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post('/api/menu/', (req, res)=>{

    const data = req.body 
  
    const sql = `INSERT INTO orders(magacaCuntada, qiimahaSheygiiba, image, email) VALUES('${data.menuName}', '${data.price}', '${data.menuImage}', '${data.emailValue}')`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})
app.post('/api/signup', (req, res)=>{
    const data = req.body
    console.log(data)
    const sql =   `INSERT INTO users(email, password) VALUES('${data.email}', '${data.password}')`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
    
})
app.get('/data/login', (req, res)=>{
    const sql = `SELECT * FROM users`
    conn.query(sql, (err, result, fields)=>{
       if(err) throw err
       res.json(result)
    })
})
app.get('/data/cart', (req, res)=>{
    const sql = `SELECT * FROM orders`
    conn.query(sql, (err, result, fields)=>{
        if(err) throw err
        res.json(result)
    })
})

app.patch('/api/remove/order', (req, res)=>{
    const data = req.body
    
    const sql = `DELETE FROM orders WHERE magacaCuntada = "${data.foodName}"`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})

app.post('/api/realOrder', (req, res)=>{
    const data = req.body
    const sql = `INSERT INTO receivedorders(magacC, image, pricePerItem, quantity, fullName) VALUES('${data.magac}', '${data.imageItem}', ${data.pp}, ${data.quantity}, '${data.fullName}')`
     conn.query(sql, (err)=>{
         if(err) throw err
     })
})
app.patch('/delete/fullfilled/order', (req, res)=>{
    const data = req.body
    const sql = `DELETE FROM orders WHERE email = "${data.logedUser}"`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})
app.post('/api/customer/info', (req, res)=>{
    console.log(req.body)
    const data = req.body
    const sql = `INSERT INTO  xogtadalbadaha(magacDalbadaha, phoneNumber, batch) VALUES('${data.magacooBuuxa}', '${data.phoneNumber}', '${data.batch}')`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})
app.get('/api/customers', (req, res)=>{
    const sql = `SELECT * FROM xogtadalbadaha;`
    conn.query(sql, (err, result, fields)=>{
        if(err) throw err
        res.json(result)
    })
})
app.get('/api/get/orders', (req, res)=>{
    const sql = `SELECT * FROM receivedorders`
    conn.query(sql, (err, result, fields)=>{
        if(err) throw err
        res.json(result)
    })
})
app.patch('/api/cancel/order', (req, res)=>{
    const data = req.body
    console.log(data)
    const sql = `DELETE FROM receivedorders WHERE magacC = "${data.maga}" AND fullName = "${data.cusName}"`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})

app.get('/api/breakfast', (req, res)=>{
    const sql = `SELECT image FROM images WHERE name = "malwax" OR name="chicken"`
    conn.query(sql, (err, result, fields)=>{
    if(err) throw err
    res.json(result)
    })
})
app.get('/api/lunch', (req, res)=>{
    const sql = `SELECT image FROM images WHERE name="donut"`
    conn.query(sql,(err, result, fields)=>{
        if(err) throw err
        res.json(result)
    })
})
app.patch('/delete/card', (req, res)=>{
    const data = req.body
    const sql = `DELETE FROM xogtadalbadaha WHERE magacDalbadaha = "${data.name}"`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
    console.log(req.body)
})
port = process.env.PORT || 2000
app.listen(port, ()=>console.log(`server is listening port ${port}`))