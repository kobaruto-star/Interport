<script setup>
import { useAIStore } from '@/stores/aiStore'
import aibg from '@/assets/aibg.png'
import { useLoginStore } from '@/stores/loginStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useInquiryStore } from '@/stores/inquiryStore'
const inquiryStore = useInquiryStore()
const router = useRouter()
const loginStore = useLoginStore()
const aiStore = useAIStore()

onMounted(async () => {
  try {
    loginStore.logoninfo = false
    await loginStore.checkcookie()
    await loginStore.loginuserinfo(loginStore.userid)
    await inquiryStore.getinquiryto(loginStore.departmentname)
    loginStore.logoninfo = true
  } catch {
    router.push('/')
  }
})
</script>

<template>
  <v-parallax :src="aibg" height="100%">
    <h1>AIに聞く</h1>

    <v-btn
      to="/menu"
      router
      class="text-none mx-2"
      variant="tonal"
      @click="logout"
      style="margin-top: 30px"
    >
      メニューに戻る</v-btn
    >

    <v-text-field label="メッセージ" variant="outlined" v-model="message"></v-text-field>
    <v-btn class="text-none mx-2" variant="tonal" @click="aiStore.aichat(message)">送信</v-btn>

    <div v-for="(chat, index) in aiStore.chat" :key="index">
      <div class="text-caption text-white ml-1 mb-1">
        <div class="font-weight-bold">{{ loginStore.username }}</div>
      </div>

      <v-card
        color="transparent"
        class="pa-3 rounded-xl d-inline-block glass-card text-grey"
        elevation="0"
      >
        {{ chat.UserMessage }}
      </v-card>
      <div class="text-caption text-white ml-1 mb-1">
        <div class="text-subtitle-2 font-weight-bold">AI</div>
      </div>
      <v-card
        color="transparent"
        class="pa-3 rounded-xl d-inline-block glass-card text-grey"
        elevation="0"
        >{{ chat.AiMessage }}</v-card
      >
    </div>
  </v-parallax>
</template>

<style>
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
