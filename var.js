    module.exports = {
//Переменные людей епта
    //Менюшка
     tagOptions : {
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
    },
//Менюшка кого нет
     netOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Паши', callback_data: 'P'}, {text: 'Семёна', callback_data: 'S'}],
                [{text: 'Дани', callback_data: 'D'}, {text: 'Андрея', callback_data: 'An'}],
                [{text: 'Димы', callback_data: 'Di'}, {text: 'Ильи', callback_data: 'I'}],
                [{text: 'Антона', callback_data: 'Ant'}],
            ]
        })
    },

    //cit : fs.readFileSync('file.txt', 'utf8').split('\n');



}
