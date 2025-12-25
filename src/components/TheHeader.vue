<script setup>
import { ref, shallowRef } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import router from '@/router'
import logoIcon from '@/assets/icon.png'
const loginStore = useLoginStore()

const logindialog = shallowRef(false)
const registrationdialog = shallowRef(false)
let userid = shallowRef('')
let password = shallowRef('')
let departmentname = shallowRef('')
let username = shallowRef('')
let newpassword = shallowRef('')

let logon = shallowRef(false)
let admin = shallowRef(false)
let loading = ref('none')

const login = async () => {
  try {
    loading.value = 'loading'
    await loginStore.loginuser(userid.value, password.value)
    await loginStore.setcookie(loginStore.userid)
    logindialog.value = false
    router.push('/menu')
    loginStore.logoninfo = true
    loading.value = 'none'
    if (loginStore.userid === '17') {
      admin.value = true
      console.log('管理者ログイン')
    }
  } catch (error) {
    loading.value = 'error'
    console.log('ログインに失敗しました。')
    console.log(loading.value)
    console.error(error)
  }
}
const logout = async () => {
  try {
    await loginStore.logoutuser()
    logon.value = false
    admin.value = false
    router.push('/')
  } catch (error) {
    console.log('ログアウトに失敗しました。')
    console.error(error)
  }
}

const registration = async () => {
  try {
    await loginStore.registeruser(username.value, newpassword.value, departmentname.value)
  } catch (error) {
    console.log('新規登録に失敗しました。')
    console.error(error)
  }
}
</script>
<template>
  <v-app-bar app elevation="1" class="px-4">
    <v-img :src="logoIcon" max-width="150" contain></v-img>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <div v-if="admin === true">
        <v-dialog v-model="registrationdialog" max-width="600">
          <template v-slot:activator="{ props: activatorPropsA }">
            <v-btn
              class="text-none mx-2"
              prepend-icon="mdi-account-plus"
              text="新規登録"
              variant="tonal"
              v-bind="activatorPropsA"
            ></v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12"
                  ><v-text-field label="ユーザーネーム" v-model="username" required></v-text-field
                ></v-col>
                <v-col cols="12"
                  ><v-text-field
                    label="パスワード*"
                    type="password"
                    v-model="newpassword"
                    required
                  ></v-text-field
                ></v-col>
                <v-col cols="12"
                  ><v-autocomplete
                    :items="['アプリ部門', 'インフラ部門']"
                    label="所属部門"
                    v-model="departmentname"
                  ></v-autocomplete
                ></v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text="登録" variant="tonal" @click="registration"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div v-if="loginStore.logoninfo === false">
        <v-dialog v-model="logindialog" max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              class="text-none mx-2"
              prepend-icon="mdi-account"
              text="ログイン"
              variant="tonal"
              v-bind="activatorProps"
              color="primary"
            ></v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-text-field label="ユーザーID*" v-model="userid" required></v-text-field>
              <v-text-field
                label="パスワード*"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-card-text>
            <div v-if="loading === 'loading'" class="text-center my-2">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <div v-if="loading === 'error'" class="text-center my-2">
              <strong>ユーザー名かパスワードが間違っています。もう一度お試しください</strong>
            </div>
            <v-card-actions>
              <v-btn color="primary" text="ログイン" variant="tonal" @click="login"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div v-if="loginStore.logoninfo === true">
        <v-btn
          class="text-none mx-2"
          prepend-icon="mdi-logout"
          text="ログアウト"
          variant="tonal"
          @click="logout"
        ></v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style></style>
