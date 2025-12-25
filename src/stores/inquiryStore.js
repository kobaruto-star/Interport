import { defineStore } from 'pinia'
import axios from 'axios'

export const useInquiryStore = defineStore('inquiry', {
  state: () => ({
    inquiryurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/inquiry/save',
    inquiryfromurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/inquiry/from',
    addreplyurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/inquiry/add',
    inquirytourl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/inquiry/to',
    inquiryfromlist: [],
  }),
  actions: {
    async newinquiry(
      inquirysubject,
      inquirycontents,
      inquiryto,
      deadline,
      statusA,
      urgency,
      inquiryat,
      inquiryfrom,
    ) {
      const inquiry = {
        inquirysubject: inquirysubject,
        inquiryto: inquiryto,
        inquirycontents: inquirycontents,
        deadline: deadline,
        status: statusA,
        urgency: urgency,
        inquiryat: inquiryat,
        inquiryfrom: inquiryfrom,
      }
      try {
        console.log(inquiry)
        axios.post(this.inquiryurl, inquiry)
        console.log('問い合わせを保存しました。')
      } catch {
        console.log('問い合わせを保存できませんでした。')
      }
    },
    async getinquiryto(inquiryfrom) {
      let response = await axios.get(this.inquiryfromurl, {
        params: {
          inquiryfrom: inquiryfrom,
        },
      })
      this.inquiryfromlist = response.data
      console.log(this.inquiryfromlist)
    },
    async getinquiryfrom(inquiryto) {
      let response = await axios.get(this.inquirytourl, {
        params: {
          inquiryto: inquiryto,
        },
      })
      this.inquiryfromlist = response.data
      console.log(this.inquiryfromlist)
    },

    async addreply(inquiryid, reply, staff, department) {
      const replyinfo = {
        inquiryID: inquiryid,
        reply: reply,
        staff: staff,
        department: department,
      }
      let response = await axios.post(this.addreplyurl, replyinfo)
      console.log('返信を保存しました。' + response)
    },
  },
})
