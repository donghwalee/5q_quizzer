var express     = require('express'),
    server      = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var quizSchema  = new Schema({
  quiz_name: { type: String, required: true },
  created: { type: Date, default: Date.now },
  q_and_a: [
    {
      question: { type: String, required: true },
      answer: [
        {
          answer_id: { type: Number, required: true },
          answer_text: { type: String, require: true }
        }
      ],
      correct_answer_id: { type: Number, required: true }
    }
  ]
});

var Quiz = mongoose.model('quiz', quizSchema);

server.use(express.static('./public'));
server.use(bodyParser.urlencoded({ extended: true}));

server.get('/create', function(req, res) {
  res.render('create.html');
});

server.post('/create.html', function(req, res) {
  console.log("create");
  console.log(req.body);
});

server.listen(3000, function() {
  console.log("Server is listening");
})
