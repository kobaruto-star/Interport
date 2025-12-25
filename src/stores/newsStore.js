import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newslist: ref([]),
  }),
  actions: {
    async getnews() {
      console.log('ニュース取得開始')
      let response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=c4aa24bd2cc144a1a8d425958dcb0528',
      )
      this.newslist = response.data.articles
      console.log(this.newslist)
    },
  },
})
