import { ChatMessage } from "@/types/ChatMessage";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
})

const api = new OpenAIApi(config)

export const openai = {
  generate: async (messages: ChatCompletionRequestMessage[]) => {
    try {
      const response = await api.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.6,
        messages
      })
      return response.data.choices[0]?.message?.content
    } catch (err) {
      return undefined
    }
  },
  translateMessages: (messages: ChatMessage[]) => {
    let reqMessages: ChatCompletionRequestMessage[] = []

    for( let i in messages ) {
      reqMessages.push({
        role: messages[1].author === 'me' ? 'user' : 'assistant',
        content: messages[i].body
      })
    }
    return reqMessages
  }
}
