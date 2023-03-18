
const TelegramApi = require('node-telegram-bot-api')
const token = '6049170650:AAHlwYiVi4Gt-AGu1pnXSGn3rK6QmsdtEVE'
const bot = new TelegramApi(token, {polling: true})
const CronJob = require('cron').CronJob;
const fs = require("fs");
const os = require('os')
let LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const WebAppUrl = 'https://this-casino.ru/';
const vers = require('./src/msgs.js'); //запрос переменных с текстом
const upd = require('./src/msgs.js');
const {tagOptions, netOptions, } = require('./var'); // Подгружаем переменные менюшек
const {vetr} = require('./src/vetr.js');

// Желание доброго утра с помощью модуля Cron
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

// Объявление переменных людей
let Me = 220815377; let nameMe = ' @b2b_daddy'; // Паша
let Semen = 60588441; let nameSemen = ' @Grafico_Sogly'; // Семен
let D = 462415609; let nameD = ' @Axtra4an'; // Даня
let An = 314197836; let nameAn = ' @akapenkin'; // Анрей
let Dima = 230680864; let nameDima = ' @DmitriyBagaev';  // Дима
let Ant = 275234023; let nameAnt = ' @antnmorozov';  // Антон
let Il = 472281105; let nameIl = ' @Milk_Daddy';  // Илья

let citf = ''; // Переменная для записи цитат

const start = () => {

    bot.on( 'message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const data = msg.data;

        if (text === '/test'){ // Вывод кто есть в офисе, а кого нет

            return bot.sendMessage(chatId,'Паша: ' + localStorage.getItem('MeTr') +
                '. Семён: ' + localStorage.getItem('SemenTr') +
                '. Даня: ' + localStorage.getItem('DTr') +
                '. Андрей: ' + localStorage.getItem('AnTr') +
                '. Дима: ' + localStorage.getItem('DimaTr') +
                '. Антон: ' + localStorage.getItem('AntTr') +
                '. Илья: ' + localStorage.getItem('IlTr'))

        }

        if (text === '/test_tag'){ // Не доделанная веб хуйня

            await bot.sendMessage(chatId,'Меню',{

                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Покур', web_app:{url: WebAppUrl}}],
                    ]
                }

            })

        }

        if (text === '/server@Pokyr_Casino_Bot' || text === '/server'){ // Инфа о сервере

            return bot.sendMessage(chatId, 'Имя хоста: ' + os.hostname() + '\nВерсия ОС: ' + os.version() + '\n' + os.machine() + '\nПлатформа: ' + os.platform() + '\nАптайм: ' + (Math.round(os.uptime()/3600) + ' Часа'))

        }


        if (text === '/start@Pokyr_Casino_Bot' || text === '/start'){

            await bot.sendSticker(chatId,'CAACAgIAAxkBAAEHkAlj2-WX-W5KVuWN8Y9P4gL4Z8HW9QACYAADEWApDfEI5RIU0zAsLgQ')
            return bot.sendMessage(chatId, 'Ну что, покурить хотим?')

        }

        if (text === '/tag@Pokyr_Casino_Bot' || text === '/tag'){

            return bot.sendMessage(chatId,'Че делать будем нахуй? Кого тэгать?', tagOptions)

        }

        if (text === '/version@Pokyr_Casino_Bot'|| text === '/version'){

            return bot.sendMessage(chatId, vers)

        }

        if (text === '/updates'|| text === '/updates@Pokyr_Casino_Bot'){

            return  bot.sendMessage(chatId, upd)

        }

        //Проверка на возвращение
        if (text === 'Бот я вернулся' || text === 'бот я вернулся'){

            if (chatId === Me){

                await localStorage.setItem('MeTr', true);
                await (nameMe = ' @b2b_daddy')

            }

            if (chatId === Semen){

                await localStorage.setItem('SemenTr', true);
                await (nameSemen = ' @Grafico_Sogly')

            }

            if (chatId === D){

                await localStorage.setItem('DTr', true);
                await (nameD = ' @Axtra4an')

            }

            if (chatId === An){

                await localStorage.setItem('AnTr', true);
                await (nameAn = ' @akapenkin')

            }

            if (chatId === Dima){

                await localStorage.setItem('DimaTr', true);
                await (nameDima = ' @DmitriyBagaev')

            }

            if (chatId === Ant){

                await localStorage.setItem('AntTr', true);
                await (nameAnt = ' @antnmorozov')

            }

            if (chatId === Il){

                await localStorage.setItem('IlTr', true);
                await (nameIl = ' @Milk_Daddy')

            }

            return  bot.sendMessage(chatId,'Здорово, рад тебя видеть! Ну чё, давай о деле поговорим?')


        }

        //Рандомная цитата
        if (text === '/random' || text === '/random@Pokyr_Casino_Bot'){

            let cit = fs.readFileSync('cit.txt', 'utf8').split('\','); // Ссылка на цитатник
            return  bot.sendMessage(chatId, cit[Math.floor(Math.random() * cit.length)])

        }

        if (text === '/backup' || text === '/backup@Pokyr_Casino_Bot'){

            return  bot.sendDocument(chatId, 'cit.txt')

        }

    })

    //Запись цитаты
    bot.onText(/(regcit)(.+)/, (msg, match) => {

        const chatId = msg.chat.id;
        citf = match[2].substring(1);

        fs.writeFileSync(
            "cit.txt",
            "\n" + citf + '\',',
            { encoding: "utf-8", flag: "a" }
        );

        bot.sendMessage(chatId, 'Записано: ' + citf);

        bot.removeTextListener(msg, match);

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        let userId = msg.from.id;
        let zovname = ''; // Переменная записи зовущего

        // Проверка по юзер ид кто зовёт
        if (userId === 220815377) {zovname = 'Паши'}
        if (userId === 60588441) {zovname = 'Семёна'}
        if (userId === 462415609) {zovname = 'Дани'}
        if (userId === 314197836) {zovname = 'Андрея'}
        if (userId === 230680864) {zovname = 'Димы'}
        if (userId === 275234023) {zovname = 'Антона'}
        if (userId === 472281105) {zovname = 'Ильи'}

        // Ниже процесс проверки присутствия и тэг + оповещение в лс
        // Курение стандартным паком
        if (data === 'st'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Пойдём курить стандартным паком, чел.')
            }
            else {
                await (nameMe = ' ')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Пойдём курить стандартным паком, Semen.')
            }
            else {
                await (nameSemen = ' ')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Пойдём курить стандартным паком, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Пойдём курить стандартным паком, Илья.')
            }
            else {
                await (nameIl = ' ')
            }

            await bot.sendMessage(chatId, 'Уведомление от: ' + zovname + '.\n' + await vetr())
            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + ' курение')

        }
        // Курение расширенным паком
        if (data === 'rs'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Пойдём курить расширенным паком, чел.')
            }
            else {
                await (nameMe = ' ')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Пойдём курить расширенным паком, Semen.')
            }
            else {
                await (nameSemen = ' ')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Пойдём курить расширенным паком, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Пойдём курить расширенным паком, Илья.')
            }
            else {
                await (nameIl = ' ')
            }

            if (localStorage.getItem('DTr') === 'true') {
                await bot.sendMessage(D, 'Даня, погнали курить.')
            }
            else {
                await (nameD = ' ')
            }

            if (localStorage.getItem('DimaTr') === 'true') {
                await bot.sendMessage(Dima, 'Дима, погнали курить.')
            }
            else {
                await (nameDima = ' ')
            }

            await bot.sendMessage(chatId, 'Уведомление от: ' + zovname + '.\n' + await vetr())
            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + nameD + nameDima + ' курение')


        }
        // Курение все вместе
        if (data === 'all'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Идём курить все нахуй')
            }
            else {
                await (nameMe = ' ')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Идём курить все нахуй')
            }
            else {
                await (nameSemen = ' ')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Идём курить все нахуй, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Идём курить все нахуй')
            }
            else {
                await (nameIl = ' ')
            }

            if (localStorage.getItem('DTr') === 'true') {
                await bot.sendMessage(D, 'Даня, погнали курить. Все вместе!')
            }
            else {
                await (nameD = ' ')
            }

            if (localStorage.getItem('DimaTr') === 'true') {
                await bot.sendMessage(Dima, 'Дима, погнали курить. Все вместе!')
            }
            else {
                await (nameDima = ' ')
            }

            if (localStorage.getItem('AnTr') === 'true') {
                await bot.sendMessage(An, 'Андрюша, погнали курить.')
            }
            else {
                await (nameAn = ' ')
            }

            await bot.sendMessage(chatId, 'Уведомление от: ' + zovname + '.\n' + await vetr())
            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + nameD + nameDima + nameAn +' курение все нахуй')

        }
        // обед
        if (data === 'ob'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Ушли на обед')
            }
            else {
                await (nameMe = ' ')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Идём всасывать еду, Сёма')
            }
            else {
                await (nameSemen = ' ')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Идём на обед, Антон!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Идём на обед!')
            }
            else {
                await (nameIl = ' ')
            }

            if (localStorage.getItem('DTr') === 'true') {
                await bot.sendMessage(D, 'Даня, идём на обед.')
            }
            else {
                await (nameD = ' ')
            }

            if (localStorage.getItem('AnTr') === 'true') {
                await bot.sendMessage(An, 'Андрюша, погнали на обед.')
            }
            else {
                await (nameAn = ' ')
            }

            await bot.sendMessage(chatId, 'Уведомление от: ' + zovname)
            return bot.sendMessage(chatId, nameSemen + nameAnt + nameIl + nameD + nameAn +' идём на обед')


        }
        // Подтяг
        if (data === 'pdg'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Подтяг')
            }
            else {
                await (nameMe = ' ')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Давай, пойдём накачаем твои хиленькие ручки')
            }
            else {
                await (nameSemen = ' ')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Подтяг!')
            }
            else {
                await (nameAnt = ' ')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Подтяг!')
            }
            else {
                await (nameIl = ' ')
            }


            if (localStorage.getItem('AnTr') === 'true') {
                await bot.sendMessage(An,'Подтяг?')
            }
            else {
                await (nameAn = ' ')
            }

            await bot.sendMessage(chatId, 'Уведомление от: ' + zovname)
            return bot.sendMessage(chatId, nameMe + nameSemen + nameAnt + nameIl + nameAn +' подтяг жесткий')

        }

    })

    //Вызов кнопок кого нет и изменения в переменных
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const msgid = msg.message.message_id;
        let userId = msg.from.id;

        if (data === 'net'){

            await bot.deleteMessage(chatId, msgid);
            return bot.sendMessage(chatId,'Кого нет?', netOptions)

        }

        if (data === 'Nazad'){

            await bot.deleteMessage(chatId, msgid);
            return bot.sendMessage(chatId,'Че делать будем нахуй? Кого тэгать?', tagOptions)

        }

        if (data === 'Vse'){

            await localStorage.setItem('MeTr', true);
            await localStorage.setItem('SemenTr', true);
            await localStorage.setItem('DTr', true);
            await localStorage.setItem('AnTr', true);
            await localStorage.setItem('DimaTr', true);
            await localStorage.setItem('AntTr', true);
            await localStorage.setItem('IlTr', true);
            await (nameMe = ' @b2b_daddy');
            await (nameSemen = ' @Grafico_Sogly');
            await (nameAn = ' @akapenkin');
            await (nameD = ' @Axtra4an');
            await (nameDima = ' @DmitriyBagaev');
            await (nameAnt = ' @antnmorozov');
            await (nameIl = ' @Milk_Daddy');
            await console.log(userId);
            await bot.sendMessage(chatId,'Все на месте, спортсмены! 📢')

        }

        if (data === 'P'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Паши сегодня нет в офисе');
            return localStorage.setItem('MeTr', false);

        }

        if (data === 'S'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Семёна сегодня нет в офисе');
            return localStorage.setItem('SemenTr', false);

        }

        if (data === 'D'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Дани сегодня нет в офисе');
            return localStorage.setItem('DTr', false);

        }

        if (data === 'An'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Андрея сегодня нет в офисе');
            return localStorage.setItem('AnTr', false);

        }

        if (data === 'Di'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Димы сегодня нет в офисе');
            return localStorage.setItem('DimaTr', false);

        }

        if (data === 'Ant'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Антона сегодня нет в офисе');
            return localStorage.setItem('AntTr', false);

        }

        if (data === 'I'){

            await console.log(userId);
            await bot.sendMessage(chatId,'Ильи сегодня нет в офисе');
            return localStorage.setItem('IlTr', false);

        }



    })

}

start()