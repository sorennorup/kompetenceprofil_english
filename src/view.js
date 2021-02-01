(function(){
    let name = "";
    let today = new Date();
    let weekday = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let thisdate = weekday+'-'+month+'-'+year;

    (function setNameAndDate() {
        if(sessionStorage.getItem('firstload')===null){
            name = prompt('INDTAST DIT NAVN ELLER KOMMUNENAVN\n\n Vi gemmer ikke dine profildata. Benyt Chrome, Firefox eller safari','');
            sessionStorage.setItem('firstload','true');
            sessionStorage.setItem('name',name);
            sessionStorage.setItem('date',thisdate);
            window.location.reload();
        }
    })();

    (function displayHeader(){
        $('#header').html('<h1>KOMPETENCEPROFIL</h1><span style = "font-size: 1.875rem;">Kontaktperson+ i kædeansvaret</br>'+
        '</span><span style = "font-size:1.375rem;"> - '+sessionStorage.getItem('name')+'</span>');
    })();
    
    (function displayBoxText(){
        $("#accordion__body").html(data.boxtext);
    })();
    
    $(window).load(function(){
        let element = $("#board-wrapper__upper");
        let elementheight = element.height()+70;
        element.height(elementheight.toString()+"px");
         
        
    });
    
    $('#accordion').on('hidden.bs.collapse', removeBackground);
    $('#accordion').on('shown.bs.collapse', addBackground);
    $('#collapse-id').addClass('accordion__plussign');

    $('#date').html(sessionStorage.getItem('date'));
         
           $('#button__word').click(function(){
              exportHTML();
             
          })
          $('#button__pdf').click(function(){      
            pdfMake.createPdf(dd).download();

          })
          $('#button__startover').click(function(){
              sessionStorage.clear();
              window.location.reload();
          })

})();
