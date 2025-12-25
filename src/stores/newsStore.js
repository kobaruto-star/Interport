import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const functionUrl =
  'https://m3h-kobayashi-getnews2-chfqaufjfdfghxgx.japaneast-01.azurewebsites.net/api/getnews'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newslist: ref([]),
  }),
  actions: {
    async getnews() {
      console.log('ニュース取得開始')
      let response = await axios.get(functionUrl)
      this.newslist = response.data.articles
      console.log(this.newslist)
    },
  },
})
