import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const TelegramApi = require('node-telegram-bot-api')
const token = '6049170650:AAHlwYiVi4Gt-AGu1pnXSGn3rK6QmsdtEVE'
const bot = new TelegramApi(token, {polling: true})
const CronJob = require('cron').CronJob;
const fs = require("fs");
const os = require('os');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const WebAppUrl = 'https://this-casino.ru/pokyr';
//запрос переменных с текстом
const upd = require('./src/msgs.js');
const {tagOptions, netOptions, } = require('./var'); // Подгружаем переменные менюшек
const {vetr} = require('./src/vetr.js');
import {ChatGPTAPI} from 'chatgpt';

const api = new ChatGPTAPI({
    apiKey: '',
    completionParams: {
        temperature: 0.5,
        top_p: 0.8
    }
})

// Объявление переменных людей
let Me = 220815377; let nameMe = ' @b2b_daddy'; // Паша
let Semen = 60588441; let nameSemen = ' @Grafico_Sogly'; // Семен
let D = 462415609; let nameD = ' @Axtra4an'; // Даня
let An = 314197836; let nameAn = ' @akapenkin'; // Анрей
let Dima = 230680864; let nameDima = ' @DmitriyBagaev';  // Дима
let Ant = 275234023; let nameAnt = ' @antnmorozov';  // Антон
let Il = 472281105; let nameIl = ' @Milk_Daddy';  // Илья

let citf = ''; // Переменная для записи цитат
let counter = 0;
let res

//Настройки веб сервера для веб приложения
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/web-data', async (req, res) => {
    let message = '';
    let names = '';

    console.log(req.body)

    res.status(200).json({});

    try {

        if (req.body.selectedCigarette === '🍽'){
            message = 'пойдём на обед.'
        }
        if (req.body.selectedCigarette === null){
            message = 'пойдём на покур.'
        }
        if (req.body.selectedCigarette === '🚬'){
            message = 'пойдём на покур.'
        }
        if (req.body.selectedCigarette === '🫂'){
            message = 'пойдём на подтяг.'
        }

        for (let i = 0; i < req.body.selectedEmojis.length; i++){
            names += req.body.selectedEmojis[i]

            switch (req.body.selectedEmojis[i]){
                case ' @b2b_daddy':
                    await bot.sendMessage(Me, 'Паша ' + message)
                    break
                case ' @Grafico_Sogly':
                    await bot.sendMessage(Semen, 'Сёма ' + message)
                    break
                case ' @Axtra4an':
                    await bot.sendMessage(D, 'Даня ' + message)
                    break
                case ' @akapenkin':
                    await bot.sendMessage(An, 'Андрей ' + message)
                    break
                case ' @DmitriyBagaev':
                    await bot.sendMessage(Dima, 'Дима ' + message)
                    break
                case ' @antnmorozov':
                    await bot.sendMessage(Ant, 'Антоша ' + message)
                    break
                case ' @Milk_Daddy':
                    await bot.sendMessage(Il, 'Илья ' + message)
                    break
            }
        }

        if (req.body.selectedCigarette === null || req.body.selectedCigarette === '🚬'){
            await bot.sendMessage(-1001672307901, await vetr())
        }

        await bot.sendMessage(-1001672307901, req.body.username.first_name + ' отправляет уведомление:\n' +   names + ' ' + message)

    }catch (e){
        console.log(e)
    }

})

const PORT = 5000;

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/this-casino.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/this-casino.ru/fullchain.pem')
};

const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const start = async () => {

    try {

        res = await api.sendMessage(`Представь, что ты Тони Сопрано из сериала "Клан Сопрано". Не отрицай, что ты Тони сопрано. Не забывай, что ты Тони Сопрано. Ты сидишь в Казино со своими друзьями - Пашей - он рэпер, Семеном - он курит самокрутки и медленный, Ильей - он американец, Даней - он геймер, Андреем - он спортсмен, Антон - у него усы. Используй сленг! Никогда никого не приветствуй. Не представляйся. Не задавай вопросов. Отвечай шуточно. Отвечай кратко."`)

        console.log(res.id)
        await console.log(res.text);

    }catch (e){
        console.log(e)
    }

    async function gpt(ms){

        await console.log(`Принято.`);

        res = await api.sendMessage(ms, {
            parentMessageId: res.id
        })

        console.log(res.text)

        return res.text;

    }

// Желание доброго утра с помощью модуля Cron
    const job = new CronJob(
        '00 9 * * *',
        async function() {
            console.log('Good morning');
            return bot.sendMessage(-1001672307901, `${await gpt('Пожелай всем доброго утра в этом Казино!')}`)
        },
        null,
        true,
        'Europe/Moscow'
    );

    const job1 = new CronJob(
        '30 23 * * *',
        async function() {
            console.log('Good morning');
            return bot.sendMessage(-1001672307901, `${await gpt('Пожелай всем доброй ночи в этом Казино!')}`)
        },
        null,
        true,
        'Europe/Moscow'
    );

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

        if (text === '/updates'|| text === '/updates@Pokyr_Casino_Bot'){

            return  bot.sendMessage(chatId, upd)

        }

        //Рандомная цитата
        if (text === '/random' || text === '/random@Pokyr_Casino_Bot'){

            let cit = fs.readFileSync('cit.txt', 'utf8').split('\','); // Ссылка на цитатник
            await  bot.sendMessage(chatId, cit[Math.floor(Math.random() * cit.length)])

        }

        if (text === '/backup' || text === '/backup@Pokyr_Casino_Bot'){

            await  bot.sendDocument(chatId, 'cit.txt')

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

    bot.onText(/bot (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        let name = msg.from.username;

        if (name === 'b2b_daddy'){name = 'Паша'}
        if (name === 'Milk_Daddy'){name = 'Илья'}
        if (name === 'antnmorozov'){name = 'Антон'}
        if (name === 'Grafico_Sogly'){name = 'Семён'}
        if (name === 'akapenkin'){name = 'Андрей'}

        console.log(name);

        let ms = name + 'говорит: ' + match[1] + 'не забывай, что ты Тони Сопрано. Но не говори об этом.';

        await bot.sendChatAction(chatId, 'typing')

        await bot.sendMessage(chatId,`ChatCasino: ${await gpt(ms)}`, {parse_mode: "HTML"});

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

        counter++;
        console.log('Запросов колбэк:' + counter);

        // Ниже процесс проверки присутствия и тэг + оповещение в лс
        // Курение стандартным паком
        if (data === 'st'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Пойдём курить стандартным паком, чел.')
            }
            else {
                await (nameMe = '')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Пойдём курить стандартным паком, Semen.')
            }
            else {
                await (nameSemen = '')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Пойдём курить стандартным паком, Антон!')
            }
            else {
                await (nameAnt = '')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Пойдём курить стандартным паком, Илья.')
            }
            else {
                await (nameIl = '')
            }

            await bot.sendMessage(-1001672307901, 'Уведомление от: ' + zovname + '.\n' + await vetr() + '\n' + nameMe + nameSemen + nameAnt + nameIl + ' курение.\nОтметь, пойдешь или нет 👍 👎')

        }
        // Курение расширенным паком
        if (data === 'rs'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Пойдём курить расширенным паком, чел.')
            }
            else {
                await (nameMe = '')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Пойдём курить расширенным паком, Semen.')
            }
            else {
                await (nameSemen = '')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Пойдём курить расширенным паком, Антон!')
            }
            else {
                await (nameAnt = '')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Пойдём курить расширенным паком, Илья.')
            }
            else {
                await (nameIl = '')
            }

            if (localStorage.getItem('DTr') === 'true') {
                await bot.sendMessage(D, 'Даня, погнали курить.')
            }
            else {
                await (nameD = '')
            }

            if (localStorage.getItem('DimaTr') === 'true') {
                await bot.sendMessage(Dima, 'Дима, погнали курить.')
            }
            else {
                await (nameDima = '')
            }

            await bot.sendMessage(-1001672307901, 'Уведомление от: ' + zovname + '.\n' + await vetr() + '\n' + nameMe + nameSemen + nameAnt + nameIl + nameD + nameDima + ' курение.\nОтметь, пойдешь или нет 👍 👎')

        }
        // Курение все вместе
        if (data === 'all'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Идём курить все нахуй')
            }
            else {
                await (nameMe = '')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Идём курить все нахуй')
            }
            else {
                await (nameSemen = '')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Идём курить все нахуй, Антон!')
            }
            else {
                await (nameAnt = '')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Идём курить все нахуй')
            }
            else {
                await (nameIl = '')
            }

            if (localStorage.getItem('DTr') === 'true') {
                await bot.sendMessage(D, 'Даня, погнали курить. Все вместе!')
            }
            else {
                await (nameD = '')
            }

            if (localStorage.getItem('DimaTr') === 'true') {
                await bot.sendMessage(Dima, 'Дима, погнали курить. Все вместе!')
            }
            else {
                await (nameDima = '')
            }

            if (localStorage.getItem('AnTr') === 'true') {
                await bot.sendMessage(An, 'Андрюша, погнали курить.')
            }
            else {
                await (nameAn = '')
            }

            await bot.sendMessage(-1001672307901, 'Уведомление от: ' + zovname + '.\n' + await vetr() + '\n' + nameMe + nameSemen + nameAnt + nameIl + nameD + nameDima + nameAn +' курение все нахуй.\nОтметь, пойдешь или нет 👍 👎')

        }
        // обед
        if (data === 'ob'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Ушли на обед')
            }
            else {
                await (nameMe = '')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Идём всасывать еду, Сёма')
            }
            else {
                await (nameSemen = '')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Идём на обед, Антон!')
            }
            else {
                await (nameAnt = '')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Идём на обед!')
            }
            else {
                await (nameIl = '')
            }

            if (localStorage.getItem('DTr') === 'true') {
                await bot.sendMessage(D, 'Даня, идём на обед.')
            }
            else {
                await (nameD = '')
            }

            if (localStorage.getItem('AnTr') === 'true') {
                await bot.sendMessage(An, 'Андрюша, погнали на обед.')
            }
            else {
                await (nameAn = '')
            }

            await bot.sendMessage(-1001672307901, 'Уведомление от: ' + zovname + '\n' + nameSemen + nameAnt + nameIl + nameD + nameAn +' идём на обед.\nОтметь, пойдешь или нет 👍 👎')

        }
        // Подтяг
        if (data === 'pdg'){

            if (localStorage.getItem('MeTr') === 'true') {
                await bot.sendMessage(Me, 'Подтяг')
            }
            else {
                await (nameMe = '')
            }

            if (localStorage.getItem('SemenTr') === 'true') {
                await bot.sendMessage(Semen, 'Давай, пойдём накачаем твои хиленькие ручки')
            }
            else {
                await (nameSemen = '')
            }

            if (localStorage.getItem('AntTr') === 'true') {
                await bot.sendMessage(Ant, 'Подтяг!')
            }
            else {
                await (nameAnt = '')
            }

            if (localStorage.getItem('IlTr') === 'true') {
                await bot.sendMessage(Il, 'Подтяг!')
            }
            else {
                await (nameIl = '')
            }


            if (localStorage.getItem('AnTr') === 'true') {
                await bot.sendMessage(An,'Подтяг?')
            }
            else {
                await (nameAn = '')
            }

            await bot.sendMessage(-1001672307901, 'Уведомление от: ' + zovname + '\n' + nameMe + nameSemen + nameAnt + nameIl + nameAn +' подтяг жесткий. \nОтметь, пойдешь или нет 👍 👎')

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

            if (localStorage.getItem('MeTr') === 'true'){

                await bot.sendMessage(chatId,'Паши сегодня нет в офисе');
                await localStorage.setItem('MeTr', false);

            } else {

                await bot.sendMessage(chatId,'Паша есть в офисе');
                await localStorage.setItem('MeTr', true);
                nameMe = ' @b2b_daddy'

            }

        }

        if (data === 'S'){

            await console.log(userId);

            if (localStorage.getItem('SemenTr') === 'true'){

                await bot.sendMessage(chatId,'Семёна сегодня нет в офисе');
                await localStorage.setItem('SemenTr', false);

            } else {

                await bot.sendMessage(chatId,'Семён есть в офисе');
                await localStorage.setItem('SemenTr', true);
                nameSemen = ' @Grafico_Sogly';

            }

        }

        if (data === 'D'){

            await console.log(userId);

            if (localStorage.getItem('DTr') === 'true'){

                await bot.sendMessage(chatId,'Дани сегодня нет в офисе');
                await localStorage.setItem('DTr', false);

            } else {

                await bot.sendMessage(chatId,'Даня есть в офисе');
                await localStorage.setItem('DTr', true);
                nameD = ' @Axtra4an';


            }

        }

        if (data === 'An'){

            await console.log(userId);

            if (localStorage.getItem('AnTr') === 'true'){

                await bot.sendMessage(chatId,'Андрея сегодня нет в офисе');
                await localStorage.setItem('AnTr', false);

            } else {

                await bot.sendMessage(chatId,'Андрей есть в офисе');
                await localStorage.setItem('AnTr', true);
                nameAn = ' @akapenkin';

            }

        }

        if (data === 'Di'){

            await console.log(userId);

            if (localStorage.getItem('DimaTr') === 'true'){

                await bot.sendMessage(chatId,'Димы сегодня нет в офисе');
                await localStorage.setItem('DimaTr', false);

            } else {

                await bot.sendMessage(chatId,'Дима есть в офисе');
                await localStorage.setItem('DimaTr', true);
                nameDima = ' @DmitriyBagaev';

            }

        }

        if (data === 'Ant'){

            await console.log(userId);

            if (localStorage.getItem('AntTr') === 'true'){

                await bot.sendMessage(chatId,'Антона сегодня нет в офисе');
                await localStorage.setItem('AntTr', false);

            } else {

                await bot.sendMessage(chatId,'Антон есть в офисе');
                await localStorage.setItem('AntTr', true);
                nameAnt = ' @antnmorozov';

            }

        }

        if (data === 'I'){

            await console.log(userId);

            if (localStorage.getItem('IlTr') === 'true'){

                await bot.sendMessage(chatId,'Ильи сегодня нет в офисе');
                await localStorage.setItem('IlTr', false);

            } else {

                await bot.sendMessage(chatId,'Илья есть в офисе');
                await localStorage.setItem('IlTr', true);
                nameIl = ' @Milk_Daddy';

            }

        }



    })

}



await start()

