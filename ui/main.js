
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
 var comInput=document.getElementById('com');
 var comment=comInput.value;
 var submit=document.getElementById('submitbtn');
 submit.onclick=function()
 {
   var comments=['com 1','com 2','com 3'];  
   var list='';
   for(var i=0;i<comments.length;i++)
   {
       list+='<li>'+comments[i]+'</li>'
   }
   var ul=document.getElementById('commentlist');
   ul.innerHTML=list;
 };