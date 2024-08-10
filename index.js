const express = require('express');
const router = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');

router.set('view engine','ejs');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(express.static(path.join(__dirname,'public')));

router.get('/',(req,res)=>{
    fs.readdir(`./files`, function(err,files){
        res.render("index",{files: files.reverse()});
    });  
});

router.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,filedata){
        res.render('show', {filename:req.params.filename, filedata:filedata})
    });  
});

router.get('/edit/:filename',(req,res)=>{
      res.render('edit',{filename:req.params.filename});
});

router.post('/edit',(req,res)=>{
    console.log(req.body);
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect('/');
    })
});

router.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){ 
        res.redirect('/')
    });

});

router.listen(3000);
