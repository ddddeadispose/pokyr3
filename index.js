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
//Переменные людей епта
let Me = 220815377; let nameMe = ' @b2b_daddy'; let MeTr = true; // Паша
let Semen = 60588441; let nameSemen = ' @Grafico_Sogly'; SemenTr = true; // Семен
let D = 462415609; let nameD = ' @Axtra4an'; DTr = true; // Даня
let An = 314197836; let nameAn = ' @akapenkin'; AnTr = true; // Анрей
let Dima = 230680864; let nameDima = ' @DmitriyBagaev'; DimaTr = true; // Дима
let Ant = 275234023; let nameAnt = ' @antnmorozov'; AntTr = true; // Антон
let Il = 472281105; let nameIl = ' @Milk_Daddy'; IlTr = true; // Илья



const tagOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Курение стандарт пак 🚬', callback_data: 'st'}],
            [{text: 'Курение расширенный пак 🚬', callback_data: 'rs'}],
            [{text: 'Все вместе 🚬', callback_data: 'all'}],
            [{text: 'На обед 🍽', callback_data: 'ob'}],
            [{text: 'На подтяг 🫂', callback_data: 'pdg'}],
            [{text: 'Кого сегодня нет? ❌', callback_data: 'net'}],
        ]
    })
}

const netOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Паши', callback_data: 'P'}, {text: 'Семёна', callback_data: 'S'}],
            [{text: 'Дани', callback_data: 'D'}, {text: 'Андрея', callback_data: 'An'}],
            [{text: 'Димы', callback_data: 'Di'}, {text: 'Ильи', callback_data: 'I'}],
            [{text: 'Антона', callback_data: 'Ant'}],
        ]
    })
}

const start = () => {

    bot.setMyCommands([
        {command: '/start@Pokyr_Casino_Bot', description: 'Начало покура'},
        {command: '/version@Pokyr_Casino_Bot', description: 'Версия бота'},
        {command: '/tag@Pokyr_Casino_Bot', description: 'Тэгнуть челиков'},
        {command: '/updates', description: 'Последние обновления'},]
    )


    bot.on( 'message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const data = msg.data;
        const { exec } = require("child_process");

        console.log(msg)

        if (text === '/start@Pokyr_Casino_Bot' || text === '/start'){
            await bot.sendSticker(chatId,'CAACAgIAAxkBAAEHkAlj2-WX-W5KVuWN8Y9P4gL4Z8HW9QACYAADEWApDfEI5RIU0zAsLgQ')
            return bot.sendMessage(chatId, 'Ну что, покурить хотим?')

        }

        if (text === '/сmd'){

            exec("ls -la", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            return bot.sendMessage(chatId, 'Отработало')

        }

        if (text === '/tag@Pokyr_Casino_Bot' || text === '/tag'){

            return bot.sendMessage(chatId,'Че делать будем нахуй? Кого тэгать?', tagOptions)
        }

        if (text === '/version@Pokyr_Casino_Bot'|| text === '/version'){
            return bot.sendMessage(chatId, 'Версия бота: 0.66.7 beta Debian 94.228.112.55 root ')
        }

        if (text === '/updates'|| text === '/updates@Pokyr_Casino_Bot'){

            await bot.sendMessage(chatId,'0.66.7 | 8.02.23 | Добавлено и исправлено: ')
            await bot.sendMessage(chatId,'ЭТО САМОЕ ЕБЕЙШЕЕ ОБНОВЛЕНИЕ. Теперь вы можете через специальную кнопку отметить, что вас нет в офисе. Внимение! Если вы вернулись в офис, то просто напишете боту в лс "бот я вернулся" и вас снома будет тэгать.')
            return  bot.sendMessage(chatId,'Антон разгадал пасхалку и получает пиво! 🍺')


        }

        if (text === 'Бот я вернулся' || text === 'бот я вернулся'){

            if (chatId === Me){

                await (MeTr = true)
                await (nameMe = ' @b2b_daddy')
            }

            if (chatId === Semen){

                await (SemenTr = true)
                await (nameSemen = ' @Grafico_Sogly')
            }

            if (chatId === D){

                await (DTr = true)
                await (nameD = ' @Axtra4an')
            }

            if (chatId === An){

                await (AnTr = true)
                await (nameAn = ' @akapenkin')
            }

            if (chatId === Dima){

                await (DimaTr = true)
                await (nameDima = '@DmitriyBagaev')
            }

            if (chatId === Ant){

                await (AntTr = true)
                await (nameAnt = '@antnmorozov')
            }

            if (chatId === Il){

                await (IlTr = true)
                await (nameIl = ' @Milk_Daddy')
            }

            return  bot.sendMessage(chatId,'Здорово, рад тебя видеть! Ну чё, давай о деле поговорим?')


        }

        return bot.sendMessage(chatId, 'Я нихуя не понял. Че тебе надо?')

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        // Ниже процесс проверки присутствия и тэг + оповещение в лс
        // Курение стандартным паком
        if (data === 'st'){

            if (MeTr === true) {
                await bot.sendMessage(Me, 'Пойдём курить стандартным паком, чел.')
            }
            else {
                await (nameMe = ' ')
            }

            if (SemenTr === true) {
                await bot.sendMessage(Semen, 'Пойдём курить стандартным паком, Semen.')
            }
            else {
                await (nameSemen = ' ')
            }

            if (AntTr === true) {
                await bot.sendMessage(Ant, 'Пойдём курить стандартным паком, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (IlTr === true) {
                await bot.sendMessage(Il, 'Пойдём курить стандартным паком, Илья.')
            }
            else {
                await (nameIl = ' ')
            }

            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + ' курение')

        }
        // Курение расширенным паком
        if (data === 'rs'){

            if (MeTr === true) {
                await bot.sendMessage(Me, 'Пойдём курить расширенным паком, чел.')
            }
            else {
                await (nameMe = ' ')
            }

            if (SemenTr === true) {
                await bot.sendMessage(Semen, 'Пойдём курить расширенным паком, Semen.')
            }
            else {
                await (nameSemen = ' ')
            }

            if (AntTr === true) {
                await bot.sendMessage(Ant, 'Пойдём курить расширенным паком, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (IlTr === true) {
                await bot.sendMessage(Il, 'Пойдём курить расширенным паком, Илья.')
            }
            else {
                await (nameIl = ' ')
            }

            if (DTr === true) {
                await bot.sendMessage(D, 'Даня, погнали курить.')
            }
            else {
                await (nameD = ' ')
            }

            if (DimaTr === true) {
                await bot.sendMessage(Dima, 'Дима, погнали курить.')
            }
            else {
                await (nameDima = ' ')
            }

            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + nameD + nameDima + ' курение')


        }
        // Курение все вместе
        if (data === 'all'){

            if (MeTr === true) {
                await bot.sendMessage(Me, 'Идём курить все нахуй')
            }
            else {
                await (nameMe = ' ')
            }

            if (SemenTr === true) {
                await bot.sendMessage(Semen, 'Идём курить все нахуй')
            }
            else {
                await (nameSemen = ' ')
            }

            if (AntTr === true) {
                await bot.sendMessage(Ant, 'Идём курить все нахуй, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (IlTr === true) {
                await bot.sendMessage(Il, 'Идём курить все нахуй')
            }
            else {
                await (nameIl = ' ')
            }

            if (DTr === true) {
                await bot.sendMessage(D, 'Даня, погнали курить. Все вместе!')
            }
            else {
                await (nameD = ' ')
            }

            if (DimaTr === true) {
                await bot.sendMessage(Dima, 'Дима, погнали курить. Все вместе!')
            }
            else {
                await (nameDima = ' ')
            }

            if (AnTr === true) {
                await bot.sendMessage(An, 'Андрюша, погнали курить.')
            }
            else {
                await (nameAn = ' ')
            }

            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + nameD + nameDima + nameAn +' курение все нахуй')

        }
        // обед
        if (data === 'ob'){

            if (MeTr === true) {
                await bot.sendMessage(Me, 'Ушли на обед')
            }
            else {
                await (nameMe = ' ')
            }

            if (SemenTr === true) {
                await bot.sendMessage(Semen, 'Идём всасывать еду, Сёма')
            }
            else {
                await (nameSemen = ' ')
            }

            if (AntTr === true) {
                await bot.sendMessage(Ant, 'Идём на обед, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (IlTr === true) {
                await bot.sendMessage(Il, 'Идём на обед!')
            }
            else {
                await (nameIl = ' ')
            }

            if (DTr === true) {
                await bot.sendMessage(D, 'Даня, идём на обед.')
            }
            else {
                await (nameD = ' ')
            }

            if (AnTr === true) {
                await bot.sendMessage(An, 'Андрюша, погнали на обед.')
            }
            else {
                await (nameAn = ' ')
            }

            return bot.sendMessage(chatId, nameSemen + nameAnt + nameIl + nameD + nameAn +' идём на обед')


        }
        // Подтяг
        if (data === 'pdg'){

            if (MeTr === true) {
                await bot.sendMessage(Me, 'Подтяг')
            }
            else {
                await (nameMe = ' ')
            }

            if (SemenTr === true) {
                await bot.sendMessage(Semen, 'Давай, пойдём накачаем твои хиленькие ручки')
            }
            else {
                await (nameSemen = ' ')
            }

            if (AntTr === true) {
                await bot.sendMessage(Ant, 'Подтяг!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (IlTr === true) {
                await bot.sendMessage(Il, 'Подтяг!')
            }
            else {
                await (nameIl = ' ')
            }


            if (AnTr === true) {
                await bot.sendMessage(An,'Подтяг?')
            }
            else {
                await (nameAn = ' ')
            }

            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + nameAn +' подтяг жесткий')


        }


    })


        //Вызов кнопок кого нет и изменения в переменных
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'net'){

            return bot.sendMessage(chatId,'Кого нет?', netOptions)

        }

        if (data === 'P'){

            await bot.sendMessage(chatId,'Паши сегодня нет в офисе')
            return (MeTr = false)

        }

        if (data === 'S'){

            await bot.sendMessage(chatId,'Семёна сегодня нет в офисе')
            return (SemenTr = false)

        }

        if (data === 'D'){

            await bot.sendMessage(chatId,'Дани сегодня нет в офисе')
            return (DTr = false)

        }

        if (data === 'An'){

            await bot.sendMessage(chatId,'Андрея сегодня нет в офисе')
            return (AnTr = false)

        }

        if (data === 'Di'){

            await bot.sendMessage(chatId,'Димы сегодня нет в офисе')
            return (DimaTr = false)

        }

        if (data === 'Ant'){

            await bot.sendMessage(chatId,'Антона сегодня нет в офисе')
            return (AntTr = false)

        }

        if (data === 'I'){

            await bot.sendMessage(chatId,'Ильи сегодня нет в офисе')
            return (IlTr = false)

        }


    })

}

start()