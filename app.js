require('dotenv').config()
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const translate = require('@vitalets/google-translate-api');
const language = require(__dirname + "/lang.js");
const emojiText = require("emoji-text");
const txtomp3 = require("text-to-mp3");
const fs = require('fs');

const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on("polling_error", (err) => console.log(err));

app.use(bodyParser.json());

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  let chatId = msg.chat.id;
  let text = msg.text;

  let emoji = emojiText.convert(text.substr(0, 4), {
    before: '',
    after: ''
  });

  let trad = text.substr(4, text.length);

  translate(trad, {
    to: language.languageConvert(emoji)
  }).then(res => {
    let name_mp3 = textToMp3(language.languageConvert(emoji), encodeURI(res.text), chatId.toString());
    setTimeout(function() {
      bot.sendMessage(chatId, res.text);
      bot.sendAudio(chatId, name_mp3);
    }, 1000);
  });
});

function textToMp3(lang, text, chatId) {
  txtomp3.attributes.tl = lang;
  let name = 'Tradukbot' + chatId + '.mp3';
  let path = './' + name;

  fs.unlink(path, (err) => {
    if (err) {
      return
    }
  });

  txtomp3.getMp3(text).then(function(binaryStream) {
      file = fs.createWriteStream(name);
      file.write(binaryStream);
      file.end();
    })
    .catch(function(err) {
      console.log("Error", err);
    });

  txtomp3.saveMP3(text, name).then(function(absoluteFilePath) {
      console.log("File saved :", absoluteFilePath);
    })
    .catch(function(err) {
      console.log("Error", err);
    });
  return name;
}

app.listen(80, () => {
  console.log('Listening on port 80');
});