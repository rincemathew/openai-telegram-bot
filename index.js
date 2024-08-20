import express from "express";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const token = process.env.TELEGRAM_API;
const bot = new TelegramBot(token, { polling: true });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/start") {
    bot.sendMessage(
      chatId,
      "Welcome to Chatbot powered by OPENAI, Ask anything you want..."
    );
  } else if (msg.text) {
    const openCall = await openAICall(chatId, msg.text);
    bot.sendMessage(chatId, openCall);
  } else {
    bot.sendMessage(chatId, "we only support text right now");
  }
});

async function openAICall(chatId, text) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return "There was an error porcessing your request Please try again";
  }
}

app.listen(PORT, () => {
  console.log(`server started in port ${PORT}`);
});
