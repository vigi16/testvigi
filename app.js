var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var Book=require('./book.model')
var db='mongodb://localhost/example';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/',function(req,res){
res.send('love to be here')
});

app.get('/books',function(req,res){
	console.log('Getting all books');
	Book.find({})
	.exec(function(err,books){
		if(err){
			res.send('error message ahs occured');

		}else{

			console.log(books);
			res.json(books);
		}
	});
});

app.get('/books/:id',function(req,res){
	console.log('getting one book');
	Book.findOne({
		_id:req.params.id
	})
	.exec(function(err,book){
		if(err){
			res.send('error');

		}else{
			res.json(book);
		}

	});
});


app.post('/books',function(req,res){
	var newBook=new Book();
	newBook.title=req.body.title;
	newBook.author=req.body.author;
	newBook.category=req.body.category;
	newBook.save(function(err,book){
		if(err){
			res.send('error');
		}else{
			console.log(book);
			res.send(book);
		}
	});
});

app.post('/books2',function(req,res){
	Book.create(req.body,function(err,book){
		if(err){
			res.send('error');
		}else{
			console.log(book);
			res.send(book);
		}
	});
});


app.put('/books/:id',function(req,res){
	Book.findOneAndUpdate({
		_id: req.params.id
	},
	{$set:{title:req.body.title,author:req.body.author}},
	{ upset:true},
	function(err,newBook){
		if(err){
			console.log('error');
		}else{
			console.log(newBook);
			res.send(newBook);
		}

	});
});

app.delete('/books/:id',function(req,res){
	Book.findAndUpdate({
		_id: req.params.id
	},function(err,newBook){
		if(err){
			console.log('error');
		}else{
			console.log(newBook);
			res.send(newBook);
		}

	});
});

var port=3200;
app.listen(port,function(){
	console.log('server is running'+port);
});