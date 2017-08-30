console.log('Loaded!');
var img=document.getElementById('hasura');
var marginL=0;
function moveRight()
{
    marginL=marginL+5;
    img.style.marginLeft=marginL+'px';
    
}
img.onclick=function(){
    var interval=setInterval(moveRight,75);
};