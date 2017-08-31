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
var counter=0;
button.onclick = function()
{
    counter+=1;
    var span=document.getElementById('count');
    span.InnerHTML=counter.toString();
};