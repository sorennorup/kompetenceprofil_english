var allItems = getItems(data);
setItemsOnDragStart(allItems[0]);   

createDraggableArea(['#drag1','#done1'],getItemsForDraggable(data.block1));
createDraggableArea(['#drag2','#done2'],getItemsForDraggable(data.block2));
createDraggableArea(['#drag3','#done3'], getItemsForDraggable(data.block3));
dropBack('#drag1'); dropBack('#drag2'); dropBack('#drag3');

document.addEventListener("dragenter", function(event) {
    if(event.target.id == "board-wrapper__upper") {
        let cont = this.getElementById("board-wrapper__upper");
        cont.style.border = "dotted";
       
    }
}); 

function getItems(arr){
    let resstring=" ";
    var i= 0;
    var num= 0;
    let resarray = [];
    for (let key1 in arr){
        if(i > 0){
            let arrayName = "array"+key1; 
            arrayName = [];
            for (let key2 in arr[key1]) {
                let value2 = arr[key1][key2];
                resstring+="#"+value2.dragid+',';
                arrayName.push(value2.dragid);
              num++;  
            }
            resarray.push(arrayName);
        }
        i++; 
    }
    return [resstring, num];
}

function setItemsOnDragStart(items) {
    let arg = items.slice(0, -1);
    $(arg).bind('dragstart', function(event) {
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
        event.originalEvent.dataTransfer.effectAllowed = "move";
        let targetid = event.currentTarget.id;
        var parentel = getParentId(targetid);
       
    });
    $(arg).bind('dragexit', function(event) {
        //$("#"+event.currentTarget.id).addClass('drag-enter');
    });
}

function getParentId(targetid){
    var parentel = document.getElementById(targetid).parentElement.id;
    return parentel;
}

function getItemsForDraggable(blockobj) {
    let arr = [];
    for (let key in blockobj) {
        let value = blockobj[key];
        arr.push(value.dragid);    
    }
        return arr;
}
 // bind the dragover event on the board sections
function createDraggableArea(areaid, items){
    let areasnum = areaid.length;
    for(var i = 0; i < areasnum; i++){ 
        dragOver(areaid[i])
        dropInArea(areaid[i],items);
    }   
}

function dragOver(areaid) {
    $(areaid).bind('dragover', function(event) {
        event.preventDefault();
    });
}

function dropBack(areaId){
    $(areaId).bind('drop', function(){
        var notecard = event.dataTransfer.getData("text/plain");
        window.sessionStorage.removeItem(notecard);  
        // Turn off the default behaviour
        // without this, FF will try and go to a URL with your id's name
        event.preventDefault();
    })
}
 // bind the drop event on the board sections
function dropInArea(areaid,items) {
    let itemslength = items.length;
    $(areaid).bind('drop', function(event) {
        event.originalEvent.dataTransfer.effectAllowed = "copy";
        var notecard = event.originalEvent.dataTransfer.getData("text/plain");
        window.sessionStorage.setItem(notecard,$('#'+notecard).text());
        for(var i = 0; i < itemslength; i++){
            if(items[i] == notecard)
            event.target.appendChild(document.getElementById(notecard)); 
            
        }
        // Turn off the default behaviour
        // without this, FF will try and go to a URL with your id's name
        event.preventDefault();
        window.location.reload();
        });
    
}



    