var express     = require('express'),
    server      = express(),
    router            = express.Router(),
    PORT              = process.env.PORT || 3000,
    server            = express(),
    MONGOURI          = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname            = "random_questions",
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var questionSchema  = new Schema({
  question_text: { type: String, required: true },
  answers: [
    {
      answer_id: { type: Number, required: true },
      answer_text: { type: String, require: true }
    }
  ],
  correct_answer_id: { type: Number, required: true }
});

var Question = mongoose.model('Question', questionSchema);

server.use(express.static('./public'));
// server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());

server.get('/questions', function(req, res) {
  // res.render('create.html');
  Question.find({}, function(err, questions){
    res.json(questions);
  })
});

server.post('/questions', function(req, res) {
  Question.create(req.body, function(err, data){
    Question.find({}, function(err, questions){
      res.json(questions);
    });
  });

  // console.log(req.body.question);
  // var question = new Question({
  //   question_text: req.body.question.question_text,
  //   answers: [
  //     {
  //       answer_id: req.body.question.answers[0].answer_id,
  //       answer_text: req.body.question.answers[0].answer_text
  //     },
  //     {
  //       answer_id: req.body.question.answers[1].answer_id,
  //       answer_text: req.body.question.answers[1].answer_text
  //     },
  //     {
  //       answer_id: req.body.question.answers[2].answer_id,
  //       answer_text: req.body.question.answers[2].answer_text
  //     },
  //     {
  //       answer_id: req.body.question.answers[3].answer_id,
  //       answer_text: req.body.question.answers[3].answer_text
  //     }
  //   ],
  //   correct_answer_id: req.body.question.correct_answer_id
  // });
  // question.save(function (err, newQuestion) {
  // if (err) {
  //     // where should they go for errors???
  //     console.log("ERROR");
  //     console.log(err);
  //     res.redirect(302, '/create.html');
  //   } else {
  //     console.log("SUCCESS?!");
  //     console.log(newQuestion);
  //     res.redirect(302, '/create.html');
  //   }
  // });
});

mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
  console.log("SERVER IS UP ON PORT: ", PORT);
});
