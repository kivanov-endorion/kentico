console.log("************** Analytics Helper (de/analytics.js) **************");

//$(document).ready(function(){
//$(function(){

    // Get all elements and write to a JSON
/*
    var SelectedGroups =  $('section[class*="tg-name"]');
    
    var reg = new RegExp('tg-name-[a-zA-Z0-9_-]*');   




    for(var n=0, len = SelectedGroups.length; n < len; n++){
        
        var testString =SelectedGroups[n].className;
        console.log(testString);


        var className = reg.exec(testString);
        console.log(className);

        match = reg.exec(testString);
        while (match != null) {
          // matched text: match[0]
          // match start: match.index
          // capturing group n: match[n]
          console.log(match[0])
          match = reg.exec(testString);
        }


    }
*/
    var SelectedObjects = $('section.sponsored-news').find(".CardContainer");
    
    var MyObjects ={}
    var ArticleID =[];
    

    for(var i=0, len = SelectedObjects.length; i < len; i++){
        
        e=SelectedObjects[i];
        ArticleID.push(e.id);
        



    }

    MyObjects["news"]=ArticleID;

    var result = JSON.stringify(MyObjects);

    console.log("Track: " + result );




//}) // end document ready