import { textCompletion, chatCompletion, chatCompletionFunc } from "../../services/openai"

const functions = [
    {
        name: "get_ingredients",
        description: "List the ingredients given the list of dish.",
        parameters: {
            type: "object",
            properties: {
                ingredients: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: { type: "string", description: "Name of ingredient, e.g. pork belly, ginger, garlic, fish sauce" },
                            quantity: { type: "string", description: "Quantity e.g. 1kg, 2pcs, 3cups, 4tsp, 5tbsp" },
                            dish: { type: "string", description: "Name of dish, e.g. adobo, pasta, stew" },
                        }
                    }
                }
            },
            required: ["people"]
        }
    }
]

export async function POST(request) {
    
    const { items } = await request.json()

    const menus = items.join(',')

    let ingredients = []
    let text = ''

    try {

        const prompt = `You will act as a helpful grocer assistant.\n` +
            `Based on the provided menu, you will give the list of grocery items needed for the dish listed in the menu.\n` + 
            //`Combine similar items in a unified list and add the amounts for similar items.\n\n` +
            `Combine the amounts of similar items and only list it under one item in the list.\n\n` +
            `Sample format:\n\n` +
            `Query:\n` +
            `The dishes are Dish 1, Dish 2\n\n` +
            `Ingredients:\n` +
            `Item 1, 350 g, Dish 1\n` +
            `Item 2, 125 g, Dish 1, Dish 2\n` +
            `Item 3, 100 ml, Dish 2\n`
        
        const question = `The dishes are ` + menus

        /*
        text = await chatCompletion({
            prompt,
            question,
        })
        */

        const messages = []
        messages.push({ role: 'user', content: menus })

        const result = await chatCompletionFunc({
            messages,
            functions,
        })

        console.log('function call', result)
        
        //text = 'Lorem ipsum dolor amet invectitus, 10 g, Dish 1;Dish 2\nItem B, 25 ml, Dish 1\nItem C, 3 pcs, Dish 2'
        //console.log(text)

        if(result.content === null) {

            const func_args = JSON.parse(result.function_call.arguments)
            ingredients = func_args.ingredients

        }

    } catch(error) {

        console.log(error)

    }

    return new Response(JSON.stringify({
        //text,
        ingredients,
    }), {
        status: 200,
    })

}