var express     = require('express'),
    server      = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var quizSchema  = new Schema({
  quiz_name: { type: String, required: true }.
  created: { type: Date, default: Date.now},
  q_and_a: [
    {
      question: { type: String, required: true }.
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

var Quiz = mongoose.model('Quiz', quizSchema);

server.use(express.static('./public'));
server.use(bodyParser.json());

server.listen(3000, function() {
  console.log("Server is listening");
})
