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