import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function textCompletion({
    prompt,
    model = 'text-davinci-003',
    max_tokens = 1024,
    temperature = 0,
    stop = '\n',
}) {

    try {

        const result = await openai.createCompletion({
            prompt,
            model,
            max_tokens,
            temperature,
            stop,
        })
        
        if (!result.data.choices[0].text) {
            throw new Error("No return error from completion")
        }

        //console.log(result.data.choices)

        return result.data.choices[0].text

    } catch(error) {

        console.log(error)

        throw error
        
    }

}

export async function chatCompletion({
    model = 'gpt-3.5-turbo',
    max_tokens = 1024,
    temperature = 0,
    prompt,
    question,
}) {

    try {

        const messages = [
            { role: 'system', content: prompt },
            { role: 'user', content: question }
        ]

        const result = await openai.createChatCompletion({
            messages,
            model,
            max_tokens,
            temperature,
        })

        if (!result.data.choices[0].message) {
            throw new Error("No return error from chat");
        }

        return result.data.choices[0].message?.content

    } catch(error) {

        console.log(error)

        throw error

    }

}

export async function chatCompletionFunc({
    model = 'gpt-3.5-turbo-0613',
    max_tokens = 2048,
    temperature = 0,
    messages,
    functions,
}) {

    try {
        
        const result = await openai.createChatCompletion({
            messages,
            model,
            max_tokens,
            temperature,
            functions,
        })

        if (!result.data.choices[0].message) {
            throw new Error("No return error from chat");
        }

        //return result.data.choices[0].message?.content
        return result.data.choices[0].message
        
    } catch(error) {

        console.log(error)

        throw error

    }

}
