const TelegramApi = require('node-telegram-bot-api')

const token = '6049170650:AAHlwYiVi4Gt-AGu1pnXSGn3rK6QmsdtEVE'

const bot = new TelegramApi(token, {polling: true})

const kurOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Стандарт пак: Сёма, Паша, Антон, Илья', callback_data: 'st'}],
            [{text: 'Расширенный пак: Сёма, Паша, Антон, Илья, Даня, Дима', callback_data: 'rs'}],
            [{text: 'Все вместе', callback_data: 'all'}]
        ]
    })
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Начало покура'},
        {command: '/version', description: 'Версия бота'},
        {command: '/kur', description: 'Тэгнуть курильщиков'},
    ])

    bot.on( 'message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start'){
            await bot.sendSticker(chatId,'CAACAgIAAxkBAAEHkAlj2-WX-W5KVuWN8Y9P4gL4Z8HW9QACYAADEWApDfEI5RIU0zAsLgQ')
            return bot.sendMessage(chatId, 'Ну что, покурить хотим?')
        }

        if (text === '/kur'){

            return bot.sendMessage(chatId,'Кто пойдет курить?', kurOptions)
        }

        if (text === '/version'){
            return bot.sendMessage(chatId, 'Версия бота: 0.2 beta')
        }
        return bot.sendMessage(chatId, 'Я нихуя не понял. Че тебе надо?')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'st'){
        return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy курение')
        }

        if (data === 'rs'){
            return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy, @Axtra4an, @DmitriyBagaev курение')
        }

        if (data === 'all'){
            return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy, @Axtra4an, @DmitriyBagaev, @akapenkin курение')
        }

    })
}

start()