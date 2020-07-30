
  $(document).ready(function(){
    
    $('.cmdAddNew').click(function(e){
      e.preventDefault();
      
       var formdata=$('#form').serializeArray(); 
       var ajax="/dev-training/addcontacts";
      
        console.log(ajax);
        
        console.log(formdata);
       
       $.post(ajax,formdata, function(data) {
         if(data==1){
           alert('All is good: {%CurrentUser.Firstname#%}');
           
         }else{
           alert('Uups!');
           
         }
       });
      
    });
    
  
    $('.cmdNew').click(function(e){
      e.preventDefault();
      alert('New clicked');
    });
    
    $('.cmdEdit').click(function(e){
      e.preventDefault();
      alert('Edit clicked');
    });
    
    $('.cmdSave').click(function(e){
      e.preventDefault();
      alert('Save clicked');
    });

    $('.cmdDelete').click(function(e){
      e.preventDefault();
      alert('Delete clicked');
    });
    
    
    
    
  
  })
