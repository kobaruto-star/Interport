import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAIStore = defineStore('ai', {
  state: () => ({
    aiurl:
      'https://m3h-kobayashi-aicontainerapp.kinddune-5d2938e6.japaneast.azurecontainerapps.io/aichat',
    airesponce: null,
    chat: ref([]),
  }),
  actions: {
    //userも引数にして誰のチャットかわかるようにしましょう
    async aichat(message) {
      console.log('AIチャット開始')
      const messageA = { message: message }
      let response = await axios.post(this.aiurl, messageA)
      console.log(response.data)
      this.chat.push({ AiMessage: response.data, UserMessage: message })
      console.log(response.data)
    },
  },
})
