import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import {ChatGPTAPI} from 'chatgpt';

const api = new ChatGPTAPI({
    apiKey: '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',
    completionParams: {
        temperature: 0.5,
        top_p: 0.8
    }
})

