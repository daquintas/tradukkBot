require('dotenv').config()
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const translate = require('@vitalets/google-translate-api');
const language = require(__dirname + "/lang.js");
const emojiText = require("emoji-text");
const txtomp3 = require("text-to-mp3");
const fs = require('fs');
const https = require("https");

const flag_list = "🇩🇪🇵🇹🇫🇷🇪🇸🇺🇸🇳🇱🇬🇧🇷🇺🇨🇳🇯🇵🇮🇹🇹🇷🇬🇧🇦🇪🇵🇱\n\nNew languages coming soon 😊";
const example = "🇪🇸 Hi everyone! My name is Tradukkbot. Nice to meet you.";
const start = "Welcome to Tradukkbot 👋\nThis is the list of commands that you can use with me 😊\n\n/info - How Tradukkbot works?\n/languages - What languages does Tradukkbot support?"
const how_works = "Send the flag emoji of the language you want to translate the text plus the text itself.\nRemember that for text to audio translation you can only use 200 characters.\n\nExample\n" + example;


const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on("polling_error", (err) => console.log(err));

app.use(bodyParser.json());

setInterval(function() {
  https.get("https://tradukkbot.herokuapp.com/");
}, 20000);


bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, start);
});

bot.onText(/\/info/, function(msg, match) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, how_works);
  bot.sendMessage(chatId, "That's what you will receive ⬇️");
  sendMessage(chatId, example);
});

bot.onText(/\/languages/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, flag_list);
});

bot.onText(/\s/, function(msg, match) {
  sendMessage(msg.chat.id, match.input);
});

function sendMessage(chatId, text) {
  let emoji = emojiText.convert(text.substr(0, 4), {
    before: '',
    after: ''
  });

  let trad = text.substr(4, text.length);

  if (language.languageConvert(emoji) == "error") {
    bot.sendMessage(chatId, "Sorry but I don't understand that language 😔");
  } else {
    translate(trad, {
      to: language.languageConvert(emoji)
    }).then(res => {
      let name_mp3 = textToMp3(language.languageConvert(emoji), encodeURI(res.text), chatId.toString());
      setTimeout(function() {
        bot.sendMessage(chatId, res.text);
        bot.sendAudio(chatId, name_mp3);
      }, 1000);
    });
  }
};

function textToMp3(lang, text, chatId) {
  txtomp3.attributes.tl = lang;
  let name = 'Tradukkbot' + chatId + '.mp3';
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

function avalaibleLanguages(flags) {
  for (let i = 0; i < flags.length; i++) {
    flags[i] = emojiText.convert((flags[i]), {
      before: '',
      after: ''
    });
  }
  return flags.toString().replace(",", " ");
}

app.listen(process.env.PORT, () => {
  console.log('Listening on port' + process.env.PORT);
});
