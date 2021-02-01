

// find the number of items in each block
let numitemsbox1 = getNumItems(data)[1][0].length+1;
let numitemsbox2 = getNumItems(data)[1][1].length;
let numitemsbox3 = getNumItems(data)[1][2].length+1;

//Saves items on the done boards
let dropedValues = getSessionStorageValues();


function getNumItems(arr){
    let resstring=" ";var i= 0;var num= 0;let resarray = [];
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
    return [num,resarray];
}

// Stores the droped values
(function storeValuesOnBoard(arr){
    let l = getNumItems(data)[0];
    for(i = 0; i < l;  i++) {
        if(arr[i]!==undefined){
        let id = arr[i];
        let num = intIfyId(arr[i]);
        if( num < numitemsbox1) {
            $('#done1').append(document.getElementById(id)); 
        }
        else if(num < numitemsbox1+numitemsbox2) {
            $('#done2').append(document.getElementById(id)); 
        }
        else if(num < numitemsbox1+numitemsbox2+numitemsbox3) {
            $('#done3').append(document.getElementById(id)); 
        }
        }
    }
})(getSessionStorageKeys());
// Adds the stored values to 3 different strings to store in the pdf boxes
function getSessionStorageValues(filesource){
    let split;
   
    if(filesource == "word"){
        split = "</br>";
    }
    else if (filesource == "pdf")  {
        split = "\n";
    }
    var i = 0;
    let values1=""; let values2 = ""; let values3 = "";
    for(key in sessionStorage){
        
        let num = intIfyId(key);
        let val =sessionStorage.getItem(key);
        
        if(val!==null){
            if(isInBox(num,numitemsbox1)){  
            values1+=val+split;
            
            }
            else if(isInBox(num,numitemsbox1+numitemsbox2)){
                values2+=val+split;    
            }
            else if(isInBox(num,numitemsbox1+numitemsbox2+numitemsbox3)) {
                values3+=val+split;
             }
        }
        i++;
    }
    return [values1,values2,values3];
}

function isInBox(number,boxnumber) {
    if(number < boxnumber){  
        return true;
        }
}

function intIfyId(item){
    let val = item.substr(4)
    let num = parseInt(val);
    return num;
}

function getSessionStorageKeys(){
    let arr = []; 
    for(key in sessionStorage){
        if(key!=="name" && key!=="firstload" && key!=="date"){
            let val =sessionStorage.getItem(key);
            if(val!==null){
                arr.push(key);
            }
        }
    }
    return arr;
}

var dd = {
    content: [
        {
            text: 'KOMPETENCEPROFIL',
            style: 'header'
        },
        {
           text: 'Kontaktperson+ i kædeansvaret',
           style: 'smaller'
        },
          {
            text: sessionStorage.getItem('name')+' '+sessionStorage.getItem('date').toUpperCase()+' \n \n \n' ,
            style: 'smallest'
          },

        {
			text: 'Viden \n',
            style: 'subheader'
           
        },

        {
        text:getSessionStorageValues("pdf")[0]+"\n\n",

        },

        {
			text: 'Kompetencer\n',
            style: 'subheader'
           
        },

        {
        text:getSessionStorageValues("pdf")[1]+"\n\n",

        },

        {
			text: 'Færdigheder \n',
            style: 'subheader'
           
        },

        {
            text:getSessionStorageValues("pdf")[2]+"\n\n",

        }
        
        
        
    ],
    defaultStyle: {
        font: 'BarlowSemiCondensedLight'
      },

    styles: {
		header: {
            fontSize: 28,
             
        },

        smaller: {
            fontSize: 18,
        },

        smallest: {
            fontSize: 14
        },

        subheader: {
            fontSize: 18
        }  
    }   
} 
pdfMake.fonts = {
    // Default font should still be available
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
    },
    // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
    BarlowSemiCondensedLight: {
        normal: 'BarlowSemiCondensed-Light.ttf',
        bold: 'BarlowSemiCondensed-Medium.ttf',
    }
};
document.getElementById('source-html').style.fontFamily = "Verdana";
document.getElementById('source-html').innerHTML = setHtml(getSessionStorageValues("word"));


function setHtml(data) {
    let header = '<h1>KOMPETENCEPROFIL</h1><span style = "font-size: 1.875rem;">Kontaktperson+ i kædeansvaret</br>'+
    '</span><span style = "font-size:1.375rem;"> - '+sessionStorage.getItem('name')+'</span>';
    let knowledge = "<h2>Viden</h2>"+data[0]+"\n";
    let competences = "<h2>Kompetencer</h2>"+data[1]+"\n";
    let skills = "<h2>Skills</h2>"+data[2]+"\n";
    return header+knowledge+competences+skills;
}

function exportHTML(){
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
     
    var footer = "</body></html>";
    var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
 }
