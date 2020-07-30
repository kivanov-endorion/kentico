$(document).ready(function(){

    var url = "/content-items/ajax/1im-finder";
    var Questions = [];
    var Filters = [];
    var qTransform = {
        "question":{"<>":"h4","id":"${QuestionID}","html":"${QuestionText}"},
        "input":[
            {"<>":"input","class":"filter","id":"${ItemID}","data-next":"${QuestionNextID}","data-prev":"${QuestionPrevID}","type":"radio","value":"${Answer}","html":""},
            {"<>":"label","for":"${ItemID}","html":"${AnswerText}"}
          ],
        "answer":{"<>":"p","class":"option-set radio custom radio-list-horizontal","data-question-id":"${QuestionID}","html":
            function(){
                return $.json2html(this,qTransform.input);}
        }
    };

    $.getJSON(url, {}, function(questions){
        Questions = questions.questions;
        $("#questions").json2html(Questions,qTransform.question);
        $("#questions").json2html(Questions,qTransform.answer);
        console.log(questions);
        console.log(questions[0]);
    });

})