import express from 'express';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;

const token = process.env.TELEGRAM_API;

const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  
    if(msg.text === "/start") {
        bot.sendMessage(chatId, 'Welcome to Chatbot powered by OPENAI, Ask anything you want...');
    }
    else if(msg.text) {
        bot.sendMessage(chatId, 'Received your message');
    } else {
        bot.sendMessage(chatId, 'we only support text right now');
    }
    
  });

app.listen(PORT,()=>{
    console.log(`server started in port ${PORT}`)
})