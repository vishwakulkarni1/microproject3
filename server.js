const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const MongoClient=require('mongodb').MongoClient

var db;
var s;

MongoClient.connect('mongodb://localhost:27017/Inventory',(err, database)=>{
    if(err) return console.log(err)
    db=database.db('Inventory')
    app.listen(4000, ()=>{
        console.log('Listening to port number 4000')
    })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req,res)=>{
    db.collection('users').find().toArray( (err,result)=>{
        if(err) return console.log(err)
    res.render('homepage.ejs', {data: result})
    })
})

app.get('/create', (req,res)=>{
    res.render('add.ejs')
})

app.get('/updatestock', (req,res)=>{
    res.render('update.ejs')
})

app.get('/removestock', (req,res)=>{
    res.render('remove.ejs')
})

app.get('/deleteproduct', (req,res)=>{
    res.render('delete.ejs')
})

app.post('/AddData', (req,res)=>{
    db.collection('users').save(req.body, (err, result)=>{
        if(err) return console.log(err)
    res.redirect('/')
})
})

app.post('/update', (req, res)=>{

    db.collection('users').find().toArray((err, result)=>{
        if(err)
            return console.log(err)
        for(var i=0;i<result.length;i++)
        {
            if(result[i].cid==req.body.id)
            {
                s=result[i].Stock
                break
            }
        }
        db.collection('users').findOneAndUpdate({cid: req.body.id}, {
            $set: {Stock: parseInt(s) + parseInt(req.body.Stock)}}, {sort: {_id: -1}},
            (err, result)=>{
            if(err)
                return res.send(err)
            //console.log(req.body.id+' Stock updated')
            res.redirect('/')
        })
})
})

app.post('/remove', (req, res)=>{

    db.collection('users').find().toArray((err, result)=>{
        if(err)
            return console.log(err)
        for(var i=0;i<result.length;i++)
        {
            if(result[i].cid==req.body.id)
            {
                s=result[i].Stock
                break
            }
        }
        db.collection('users').findOneAndUpdate({cid: req.body.id}, {
            $set: {Stock: parseInt(s) - parseInt(req.body.Stock)}}, {sort: {_id: -1}},
            (err, result)=>{
            if(err)
                return res.send(err)
            //console.log(req.body.id+' Stock updated')
            res.redirect('/')
        })
})
})

app.post('/delete', (req,res)=>{
    db.collection('users').findOneAndDelete({cid:req.body.id}, (err,result)=>{
        if(err)
            return console.log(err)
        res.redirect('/')
    })
})