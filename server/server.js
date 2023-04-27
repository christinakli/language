import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Replicate from "replicate";
import fetch from "node-fetch";
import fs from "fs";
import request from "request";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  fetch: fetch
});

async function imageUrlToFile(url) {
    console.log(url);
    let f = await request.get(url, function (error, response, body) {
        fs.writeFileSync('tmp.png', body);
        let fileObject = fs.readFileSync('tmp.png');
        return fileObject;
    });
    console.log(f);
    return f;
}

var allChatMessages = [];
var curImage = "";
async function process_chat_message(req, res) {
    let chatMessage = req.body;

    allChatMessages.push(chatMessage);

    curImage = await replicate.run(
        "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
        {
            input: {
                prompt: chatMessage.text,
                image_dimensions: "512x512"
            }
        }
    );
    curImage = curImage[0];
    // curImage = await replicate.run(
    //     "timothybrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
    //     {
    //         input: {
    //             image: await imageUrlToFile(curImage),
    //             prompt: chatMessage.text
    //         }
    //     }
    // );
    // curImage = curImage[0];
}
app.post('/enter-chat', process_chat_message);

function send_chat(req, res) {
    res.send(JSON.stringify(allChatMessages));
}
app.get('/get-chat', send_chat);

function send_image(req, res) {
    res.send({"image": curImage});
}
app.get('/get-image', send_image);

function process_username(req, res) {
    let body = req.body;
    console.log("Body: ", JSON.stringify(body));
}
app.post('/enter-username', process_username);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
