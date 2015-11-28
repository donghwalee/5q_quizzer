var app = angular.module('QuizApp', []);

app.controller('CreateController', ['$http', function($http){
  var controller = this;

  $http.get('questions').success(function(data){
    controller.questions = data;
    console.log(data);
  });

  this.create = function(){
    $http.post('/questions', {
        question_text: this.questiontext,
        answers: [
          {
            answer_id: 0,
            answer_text: this.firstchoice
          },
          {
            answer_id: 1,
            answer_text: this.secondchoice
          },
          {
            answer_id: 2,
            answer_text: this.thirdchoice
          },
          {
            answer_id: 0,
            answer_text: this.fourthchoice
          }
        ],
        correct_answer_id: this.correctchoice
    }).success(function(data){
      console.log(data);
      controller.questions = data;
    });
  }

}]);
