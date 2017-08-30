var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
  app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
 
});
var articles = {
     'article-one':{
        title:'Article 1|Parimal mehta',
        heading:'Article 1',
        content:'Welcome to my first article.'
    },
     'article-two':{
        title:'Article 2|Parimal mehta',
        heading:'Article 2',
        content:'Welcome to my second article.'
    },
    'article-three':{
        title:'Article 3|Parimal mehta',
        heading:'Article 3',
        content:'Welcome to my third article.'
    }
}
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
    
   

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(cTemp(articles[articleName]));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
