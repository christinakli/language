const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

class ChatMessage {
    constructor(text, isPrompt, user) {
        this.text = text;
        this.isPrompt = isPrompt;
        this.user = user;
    }
}

function process_get_request(req, res) {
    res.send(JSON.stringify(allPrompts));
}
app.get('/get-all-prompts', process_get_request);

var allPrompts = [];
function process_chat_message(req, res) {
    let body = req.body;
    let text = body.text;
    let isPrompt = body.isPrompt;
    let user = body.user;

    if (isPrompt) {
        allPrompts.push(text);
    }
    console.log(allPrompts);
}
app.post('/enter-prompt', process_chat_message);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
