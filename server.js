var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');
var config={
  user: 'prmehta24',
  database:'prmehta24',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
  
};
var pool=new Pool(config);

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'RandomValue',
    cookie:{
        maxAge:1000*60*60*24*30
    }
}));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt)
{
    
  var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
  
  return ['pbkdf2','10000',salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res)
{
    
    var hashedString=hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
   
});
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
     if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send("User succesfully created : " + username);
        }   
    });
});
app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(403).send("Invalid credentials");
            }
            else
            {
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword=hash(password,salt);
                if(hashedPassword===dbString)
                {
                    req.session.auth={userId:result.rows[0].id};
                    res.send("Credentials Correct");
                }
                else
                {
                    res.status(403).send('Incorrect credentials');
                }
            }
        }
        
    });
});
app.get('/check-login',function(req,res)
{
    if(req.session && req.session.auth && req.session.auth.userId)
    {
        res.send("You are logged in : "+req.session.auth.userId.toString());
    }
    else
    {
        res.send("You havent logged in.");
    }
});
app.get('/logout',function(req,res)
{
    delete req.session.auth;
    res.send("Logged Out");
})
app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM article',function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
 
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var counter=0;
  app.get('/counter', function (req, res) {
      counter+=1;
  res.send(counter.toString());
});
  app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
 
});

    function cTemp(data){
        title=data.title;
        heading=data.heading;
        content=data.content;
    var htmlTemplate=`
<html>
    <head>
         <title>${title}</title>
         <link href="/ui/style.css" rel="stylesheet" />
         <meta name="viewport" content="width=device-width initial-scale=1"/>
   
    </head>
    <body>
         <div id="articles"><a href="/">Home</a>
        <hr>
        <h1>
            ${heading}
        </h1>
        
        <p>
            ${content}
        </p>
        </div>
    </body>
</html>`;
return htmlTemplate;

    }
    
   
var names=[];
app.get('/submit-name', function (req, res) {
    var name=req.query.name;
    names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
    
    pool.query("SELECT * FROM article WHERE title=$1 ", [req.params.articleName], function(err,result)
    {
       
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            
            if(result.rows.length===0)
            {
                
                res.status(404).send('Article Not Found');
            }
            else
            {
        
                var articleData=result.rows[0];
                res.send(cTemp(articleData));
            }
        }
        
    });
  
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
