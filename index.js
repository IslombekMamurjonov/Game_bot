const TelegramApi = require('node-telegram-bot-api');

const api = '5395617229:AAEJeenFITA2OdY_O8r-UR3Yj94---HVQpg'

const bot = new TelegramApi(api, {polling: true})
const chats = {}
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}
const againOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Restart', callback_data: '/again'}]
        ]
    })
}
bot.setMyCommands([
    {command: '/start', description: "Boshlash"},
    {command: '/info', description: "Siz xaqingizda ma'lumot"},
    {command: '/game', description: "Play Game"}
])
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Men 0 dan 9 gacha son tanladim')
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber
    return bot.sendMessage(chatId, 'sonni tanlang', gameOptions)
}
const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
    
        if(text === '/start') {
            await bot.sendSticker(chatId, 'https://as2.ftcdn.net/v2/jpg/02/78/54/29/1000_F_278542923_rKZvE6M5pkL457HrQPxKi9JBuvzDIDnz.jpg')
            return bot.sendMessage(chatId, `Welcome`)
        }
        if(text === '/info') {
            return bot.sendMessage(chatId, `Sizning ismingiz ${msg.from.first_name}`)
        }
        if(text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Noto`g`ri buyruq')
    })

    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again') {
            return startGame(chatId)
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, `Tabriklayman topdingiz! - ${chats[chatId]}`)
        } else {
            return bot.sendMessage(chatId, `Afsuski topolmadingiz javob - ${chats[chatId]} edi`, againOption)
        }
    })
}

start()