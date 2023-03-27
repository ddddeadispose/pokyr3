const axios = require("axios");
const cheerio = require("cheerio");

async function vetr(){

    let results = '';
    let resultn = '';
    let strv = '';
    let strr = 'Лучше курить';

    let spots = [' у второго входа', ' за перегородкой', ' у подъезда', ' у чапаева 42А', ' у газа', ' у R&D'];

    await axios.get('https://kareliameteo.ru/').then(html => {
        const $ = cheerio.load(html.data) // Используем cheerio, чтобы по селекторам получить нужные текстовые поля

        $('body > div.content > aside > div.sideWidget_holder.sideWidget_holder__CustomWeatherSidebarWidget > section > div > article > div > div > table > tbody > tr:nth-child(2) > td.value').each((i, elem) => {
            results = `${$(elem).text()}`;
        })
        $('body > div.content > aside > div.sideWidget_holder.sideWidget_holder__CustomWeatherSidebarWidget > section > div > article > div > div > table > tbody > tr:nth-child(1) > td.value').each((i, elem) => {
            resultn = `${$(elem).text()}`;
        })

    })

    results = results.replace(/ м\/с/g, "");
    console.log(results + resultn);

    if (results <= 3.3){

        strv = 'классическое безветрие';

    }

    if (results > 3.3 && results <= 5.4){

        strv = 'слабое ветрие';

    }

    if (results > 5.4 && results <= 7){

        strv = 'ощутимое ветрие';

    }

    if (results > 7 && results <= 10.7){

        strv = 'жесткое ветрие';

    }

    if (results > 10.7){

        strv = 'ебанутое ветрие, просто пиздец';

    }

    // южый, северный, восточный, западный
    // северо-западный, северо-восточный, юго-западный, юго-восточный

    switch (resultn){

        case 'южный':
            strr += spots[1] + ' или' + spots[2] + '.';
            break
        case 'юго-западный':
            strr += spots[0];
            break
        case 'западный':
            strr += spots[0] + ' или' + spots[5] + '.';
            break
        case 'северо-западный':
            strr += spots[0];
            break
        case 'северный':
            strr += spots[0] + ' или' + spots[3] + '.';
            break
        case 'северо-восточный':
            strr += spots[1] + ' или' + spots[3] + '.';
            break
        case 'восточный':
            strr += spots[3] + ' или' + spots[4] + '.';
            break
        case 'юго-восточный':
            strr += spots[2] + ' или' + spots[4] + '.';
            break

    }

    console.log(strr);

    return `На улице наблюдается ${strv}.\n${strr}`

}

module.exports = {
    vetr: vetr,
};