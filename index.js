const TelegramApi = require('node-telegram-bot-api')

const token = '6049170650:AAHlwYiVi4Gt-AGu1pnXSGn3rK6QmsdtEVE'

const bot = new TelegramApi(token, {polling: true})

const CronJob = require('cron').CronJob;

const job = new CronJob(
    '00 9 * * *',
    function() {
        console.log('Good morning');
        return bot.sendMessage(-576852718, 'Доброе утро, Казино!!')
    },
    null,
    true,
    'Europe/Moscow'
);

const tagOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Курение стандарт пак 🚬', callback_data: 'st'}],
            [{text: 'Курение расширенный пак 🚬', callback_data: 'rs'}],
            [{text: 'Все вместе 🚬', callback_data: 'all'}],
            [{text: 'На обед 🍽', callback_data: 'ob'}],
            [{text: 'На подтяг 🫂', callback_data: 'pdg'}]
        ]
    })
}

const pasOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Я начал новую жизнь', callback_data: 'fake'}],
            [{text: 'Я трахнул Семёна в попку', callback_data: 'fake'}],
            [{text: 'Антоха меня захэйтил', callback_data: 'fake'}],
            [{text: 'Они снова меня туда затащили...', callback_data: 'true'}],
            [{text: 'Я жестка раскурил сигаретину', callback_data: 'fake'}]
        ]
    })
}

const start = () => {

    bot.setMyCommands([
        {command: '/start@Pokyr_Casino_Bot', description: 'Начало покура'},
        {command: '/version@Pokyr_Casino_Bot', description: 'Версия бота'},
        {command: '/tag@Pokyr_Casino_Bot', description: 'Тэгнуть челиков'},
        {command: '/updates', description: 'Последние обновления'},
    ])


    bot.on( 'message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const data = msg.data;
        console.log(msg)

        if (text === '/start@Pokyr_Casino_Bot' || text === '/start'){
            await bot.sendSticker(chatId,'CAACAgIAAxkBAAEHkAlj2-WX-W5KVuWN8Y9P4gL4Z8HW9QACYAADEWApDfEI5RIU0zAsLgQ')
            return bot.sendMessage(chatId, 'Ну что, покурить хотим?')

        }

        if (text === '/tag@Pokyr_Casino_Bot' || text === '/tag' || text === '/kur@Pokyr_Casino_Bot'|| text === '/kur'){

            return bot.sendMessage(chatId,'Че делать будем нахуй? Кого тэгать?', tagOptions)
        }

        if (text === '/version@Pokyr_Casino_Bot'|| text === '/version'){
            return bot.sendMessage(chatId, 'Версия бота: 0.56.1 beta Debian 94.228.112.55 root ')
        }

        if (text === '/updates'){

            await bot.sendMessage(chatId,'0.56.1 | 4.02.23 | Добавлено и исправлено: ')
            await bot.sendMessage(chatId,'Добавлена пасхалка, кто первый отгадает, тому пиво')
            return  bot.sendMessage(chatId,'Исправлено рекурсивное выбешивание Антона добрым утром))')


        }

        if (text === 'Пасхалочка'){

            return bot.sendMessage(chatId,'И когда я думал, что я уже завязал', pasOptions)

        }

        return bot.sendMessage(chatId, 'Я нихуя не понял. Че тебе надо?')

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'st'){

            await bot.sendMessage(220815377, 'Пойдём курить стандартным паком, чел.')
            await bot.sendMessage(60588441, 'Пойдём курить стандартным паком, Semen.')
            await bot.sendMessage(275234023, 'Пойдём курить стандартным паком, Антон!')
            await bot.sendMessage(472281105, 'Пойдём курить стандартным паком, Илья.')

            return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy курение')

        }

        if (data === 'rs'){

            await bot.sendMessage(220815377, 'Пойдём курить расширенным паком, чел. С Даней и Димой.')
            await bot.sendMessage(60588441, 'Пойдём курить расширенным паком, Semen.')
            await bot.sendMessage(275234023, 'Пойдём курить расширенным паком, Антон!')
            await bot.sendMessage(472281105, 'Пойдём курить расширенным паком, Илья.')
            await bot.sendMessage(462415609, 'Пойдём покурим, Даня! Если не можешь, ответь в чат')
            await bot.sendMessage(230680864, 'Пойдём покурим, Дима! Если не можешь, ответь в чат.')

            return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy, @Axtra4an, @DmitriyBagaev курение')

        }

        if (data === 'all'){

            await bot.sendMessage(220815377, 'Пойдём курить все нахуй.')
            await bot.sendMessage(60588441, 'Пойдём курить все нахуй, Semen.')
            await bot.sendMessage(275234023, 'Пойдём курить все нахуй, Антон!')
            await bot.sendMessage(472281105, 'Пойдём курить все нахуй, Илья.')
            await bot.sendMessage(462415609, 'Пойдём покурим все нахуй, Даня! Если не можешь, ответь в чат')
            await bot.sendMessage(230680864, 'Пойдём покурим все нахуй, Дима! Если не можешь, ответь в чат.')
            await bot.sendMessage(314197836, 'Пойдём покурим все нахуй, Андрей! Если не можешь, ответь в чат.')

            return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy, @Axtra4an, @DmitriyBagaev, @akapenkin курение')

        }

        if (data === 'ob'){

            await bot.sendMessage(220815377, 'Ушли на обед.')
            await bot.sendMessage(60588441, 'Пойдём на обед, Semen.')
            await bot.sendMessage(275234023, 'Пойдём на обед, Антон!')
            await bot.sendMessage(472281105, 'Пойдём на обед, Илья.')
            await bot.sendMessage(462415609, 'Пойдём на обед, Даня!')
            await bot.sendMessage(314197836, 'Пойдём на обед, Андрей!')

            return bot.sendMessage(chatId, '@Grafico_Sogly, @antnmorozov, @Milk_Daddy, @Axtra4an, @akapenkin идём на обед')

        }

        if (data === 'pdg'){

            await bot.sendMessage(220815377, 'Пойдём на подтяг.')
            await bot.sendMessage(60588441, 'Пойдём на подтяг, Semen.')
            await bot.sendMessage(275234023, 'Пойдём на подтяг, Антон!')
            await bot.sendMessage(472281105, 'Пойдём на подтяг, Илья.')
            await bot.sendMessage(314197836, 'Пойдём на подтяг, Андрей!')

            return bot.sendMessage(chatId, '@b2b_daddy, @Grafico_Sogly, @antnmorozov, @Milk_Daddy, @akapenkin подтяг жесткий')

        }

        if (data === 'true'){

            await  bot.sendMessage(chatId, '🎰')
            return bot.sendMessage(chatId, 'Ты разгадал легчайшую пасхалку, с меня пиво')

        }

        if (data === 'fake'){

            return bot.sendMessage(chatId, 'Ты жестко пососал')

        }
    })
}

start()