import { createRequire } from 'module'
const require = createRequire(import.meta.url);

async function gpt(){
    import ChatGPTAPI from 'chatgpt';

    const api = new ChatGPTAPI({
        apiKey: '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',
        completionParams: {
            temperature: 0.5,
            top_p: 0.8
        }
    })

    const res = await api.sendMessage(ms)
    //bot.sendMessage(userId, '<b>ChatGPT: </b>' + res.text,  {parse_mode: "HTML"});
    console.log(res.text);

}

module.exports = {
    gpt: gpt,
};