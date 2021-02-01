var x3 = document.createElement('script');
x3.src = 'src/includes.js';
document.getElementsByTagName("head")[0].appendChild(x3);

$('document').ready(init);
	
function init(){
    
        document.getElementById('drag1').innerHTML = getData(data.block1,data.titles.title1);
        document.getElementById('drag2').innerHTML = getData(data.block2,data.titles.title2);
        document.getElementById('drag3').innerHTML = getData(data.block3,data.titles.title3);
        document.getElementById('title1').innerHTML = data.titles.title1;
        document.getElementById('title2').innerHTML = data.titles.title2;
        document.getElementById('title3').innerHTML = data.titles.title3;

    function getData(arr,title) {
        let html = '<div class="title"><h2>'+title+'</h2></div>';
        for (let key in arr) {
            let value = arr[key];
            html+= '<div id = "'+value.dragid+'" draggable="true">';
            html+='<div class = "cardTitle">'+value.value+'</div>';
            html+= '</div>';
         }
            return html;
    }
        
    
}