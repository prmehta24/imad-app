
 console.log('Loaded!');
 var img=document.getElementById('hasura');
 var marginL=0;
 function moveRight()
 {
     marginL=marginL+1;
     img.style.marginLeft=marginL+'px';
     
  }
  img.onclick=function(){
      var interval=setInterval(moveRight,100);
 };
 var button = document.getElementById('counter');
 
 button.onclick = function()
 {
     var request = new XMLHttpRequest();
     request.onreadystatechange=function()
     {
     if(request.readyState===XMLHttpRequest.DONE)
     {
     if(request.status===200)
     {
         var counter=request.responseText;
      var span=document.getElementById('count');
     span.innerHTML=counter.toString();   
     }
     }
     };
     request.open('GET','http://prmehta24.imad.hasura-app.io/counter',true);
     request.send(null);
     
 };
 
 var submit=document.getElementById('submitbtn');
 submit.onclick=function(){
  var request = new XMLHttpRequest();
     request.onreadystatechange=function()
     {
     if(request.readyState===XMLHttpRequest.DONE)
     {
     if(request.status===200)
     {
         var names=request.responseText;
         names=JSON.parse(names);
         var list='';
          
     
    for(var i=0;i<names.length;i++)
     {
 
        list+='<li>'+names[i]+'</li>';
     }
 
    var ul=document.getElementById('namelist');
     ul.innerHTML=list;
         
     }
     }
     };
     var nameInput=document.getElementById('name');
 var name=nameInput.value;
 
      request.open('GET','http://prmehta24.imad.hasura-app.io/submit-name?name='+name,true);
     request.send(null);
 };
 //login
 var submit2=document.getElementById('submit_btn');
 submit2.onclick=function(){
  var request = new XMLHttpRequest();
     request.onreadystatechange=function()
     {
     if(request.readyState===XMLHttpRequest.DONE)
     {
     if(request.status===200)
     {
         alert('Logged in successfully');
         
     }
     else if(request.status===403)
     {
         alert('Credentials incorrect');
     }
     else if(request.status===500)
     {
         alert('Something went wrong');
     }
     }
     };
     var username=document.getElementById('username').value;
     var password=document.getElementById('password').value;
     console.log('username');
     console.log('password');
     
      request.open('POST','http://prmehta24.imad.hasura-app.io/login',true);
      request.setRequestHeader('Content-Type','application/json');
     request.send(JSON.stringify({username:username,password:password}));
 };