import { chatCompletionFunc } from "../../services/openai"

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
    
    try {

        const messages = [{ role: 'user', content: menus }]

        const result = await chatCompletionFunc({
            messages,
            functions,
        })

        console.log('function call', result)
        
        if(result.content === null) {

            const func_args = JSON.parse(result.function_call.arguments)
            ingredients = func_args.ingredients

        }

    } catch(error) {

        console.log(error)

    }

    return new Response(JSON.stringify({
        ingredients,
    }), {
        status: 200,
    })

}