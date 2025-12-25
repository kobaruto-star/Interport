<script setup>
import InquiryO from '../components/InquiryO.vue'
import inquiry from '@/assets/inquiryObg.png'
import { onMounted } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import { useRouter } from 'vue-router'
import { useInquiryStore } from '@/stores/inquiryStore'
const inquiryStore = useInquiryStore()

const loginStore = useLoginStore()
const router = useRouter()

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
  <v-parallax :src="inquiry" height="100%">
    <h1>自部門への問い合わせ</h1>
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
    <inquiry-o />
  </v-parallax>
</template>

<style></style>
