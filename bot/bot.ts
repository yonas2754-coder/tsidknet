import TelegramBot from 'node-telegram-bot-api';


const token = process.env.BOT_TOKEN!;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, 'Please share your phone number to continue', {
    reply_markup: {
      keyboard: [
        [
          {
            text: '📱 Share Phone Number',
            request_contact: true
          }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

// RECEIVE PHONE NUMBER
bot.on('contact', async (msg) => {
  const contact = msg.contact!;
  const telegramId = msg.from!.id;

  // SEND TO NEXT.JS BACKEND
  await fetch(`/api/telegram/save-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      telegramId,
      phone: contact.phone_number,
      username: msg.from?.username
    })
  });

  // OPEN MINI APP
  await bot.sendMessage(msg.chat.id, '✅ Verified! Open the app:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Open Mini App',
            web_app: { url: process.env.MINI_APP_URL! }
          }
        ]
      ]
    }
  });
});

console.log('🤖 Bot is running...');
