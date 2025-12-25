import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    logoninfo: false,
    loginurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/login',
    regiurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/adduser',
    logininfourl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/loginuser',
    logincookieurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/jwt/login',
    cookiecheckurl:
      'https://m3h-kobayashi-nmcontainerapp.ashymeadow-1b9de50c.japaneast.azurecontainerapps.io/jwt/validate',
    userid: null,
    username: null,
    departmentid: null,
    departmentname: null,
    logininfo: false,
    logoncheck: false,
  }),
  actions: {
    async loginuser(userid, password) {
      this.userid = userid
      console.log(userid, password)
      const credentials = {
        user_id: userid,
        user_password: password,
      }
      try {
        let response = await axios.post(this.loginurl, credentials)
        this.userinfo = response.data
        this.logininfo = true
        console.log(userid + 'がログインしました')
        return true
      } catch (error) {
        this.logininfo = false
        console.error('ログインエラー')
        throw error
      }
    },
    async registeruser(username, password, departmentname) {
      console.log('ユーザー登録開始')
      const newuser = {
        user_name: username,
        user_password: password,
        department_id: departmentname === 'アプリ部門' ? 101 : 102,
        department_name: departmentname,
      }
      try {
        console.log(newuser)
        await axios.post(this.regiurl, newuser)
        this.username = username
        this.password = password
        this.departmentid = departmentname === 'アプリ部門' ? 101 : 102
        this.departmentname = departmentname
        console.log('ユーザー登録完了')
      } catch (error) {
        console.error('ユーザー登録エラー')
        throw error
      }
    },
    logoutuser() {
      this.userid = null
      this.username = null
      this.departmentid = null
      this.departmentname = null
      this.logininfo = false
      this.logoninfo = false
      console.log('ユーザーがログアウトしました')
    },
    async loginuserinfo(userid) {
      console.log('ログインユーザー情報取得開始')
      const requestdata = {
        userID: userid,
      }
      console.log(requestdata)
      try {
        let response = await axios.post(this.logininfourl, requestdata)
        this.userid = response.data.user_id
        this.username = response.data.user_name
        this.departmentid = response.data.department_id
        this.departmentname = response.data.department_name
      } catch (error) {
        console.error('ユーザー情報取得エラー')
        throw error
      }
    },
    async setcookie(userid) {
      console.log('クッキー付与開始')
      try {
        let response = await axios.post(
          this.logincookieurl,
          { userid: userid },
          { withCredentials: true },
        )
        console.log(response.data)
        console.log('クッキー付与完了')
      } catch (error) {
        console.error('クッキー付与エラー')
        throw error
      }
    },
    async checkcookie() {
      console.log('クッキー確認開始')
      try {
        let response = await axios.get(this.cookiecheckurl, { withCredentials: true })
        this.userid = response.data.userID
        console.log('クッキー確認完了')
      } catch (error) {
        console.error('クッキー確認エラー')
        throw error
      }
    },
  },
})
