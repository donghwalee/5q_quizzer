var app = angular.module('QuizApp', []);

app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
  var controller = this;

  console.log("Is this running?");
  controller.activeQuestion = 0;
  controller.numQuestions = 0;
  controller.numCorrect = 0;

  $http.get('questions').success(function(data){
    controller.questions = data;
    controller.numQuestions = data.length;
    console.log("GET");
    console.log(controller.activeQuestion);
    console.log(controller.numQuestions);
    console.log(data);
  });

  $scope.selectAnswer = function(qIndex, aIndex) {
    console.log("Q: " + qIndex);
    console.log("A: " + aIndex);
    var questionState = controller.questions[qIndex].questionState;
    if ( questionState != 'answered' ) {
      controller.questions[qIndex].selectedAnswer = aIndex;
      var correctAnswer = controller.questions[qIndex].correct_answer_id;
      controller.questions[qIndex].correctAnswer = correctAnswer;
      console.log("Correct: " + correctAnswer );
      if ( aIndex === correctAnswer ) {
        controller.questions[qIndex].correctness = 'correct';
        console.log("Correct");
      } else {
        controller.questions[qIndex].correctness = 'incorrect';
        console.log("Incorrect");
      }
      controller.questions[qIndex].questionState = 'answered';
    };

  };

  $scope.isSelected = function(qIndex, aIndex) {
    return controller.questions[qIndex].selectedAnswer === aIndex;
  };

  $scope.isCorrect = function(qIndex, aIndex) {
    return controller.questions[qIndex].correctAnswer === aIndex;
  };

  $scope.selectContinue = function(){
    controller.activeQuestion = controller.activeQuestion + 1;
    console.log("CONTINUE: " + controller.activeQuestion);
  };


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
