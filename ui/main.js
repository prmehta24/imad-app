
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
     if(request.readystate===XMLHttpRequest.DONE)
     {
     if(request.status===200)
     {
         var counter=request.responseText();
      var span=document.getElementById('count');
     span.innerHTML=counter.toString();   
     }
     }
     };
     request.open('GET','http://prmehta24.imad.hasura-app.io/counter',true);
     request.send(null);
     
 };