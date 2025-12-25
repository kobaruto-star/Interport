<script setup>
import { useLoginStore } from '@/stores/loginStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInquiryStore } from '@/stores/inquiryStore'
import menubg from '@/assets/menubg.png'

const loginStore = useLoginStore()
const inquiryStore = useInquiryStore()
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
  <v-parallax :src="menubg" height="100%">
    <div v-if="loginStore.username != null" class="menutext">
      <p
        class="welcometext"
        style="
          font-weight: 900;
          font-size: 28px;
          text-align: left;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
          line-height: 1.4;
        "
      >
        ログインユーザー： {{ loginStore.username }}
      </p>
    </div>

    <div class="d-flex flex-wrap">
      <!---自担当への問い合わせ-->
      <v-col cols="12" md="4" sm="3">
        <v-card class="mx-auto action-card glass-card" max-width="400" elevation="0" to="/Inquiry">
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          >
            <v-card-title>自部門への問い合わせ</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4"> 自部門への問い合わせを確認できます</v-card-subtitle>

          <v-card-text>
            <div>直近の問い合わせ：</div>

            <div>【年末年始の業務について】</div>
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>

      <!---別部門への問い合わせ-->
      <v-col cols="12" md="4" sm="3">
        <v-card class="mx-auto action-card glass-card" max-width="400" to="/InquiryToOther">
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
            cover
          >
            <v-card-title>別部門への問い合わせ</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4"> 別部門へ問い合わせをすることができます</v-card-subtitle>

          <v-card-text>
            <div>直近の問い合わせ：</div>

            <div>【メモリ使用率について】</div>
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>

      <!---AIに聞く-->
      <v-col cols="12" md="4" sm="3">
        <v-card class="mx-auto action-card glass-card" max-width="400" to="/AskAI">
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
            cover
          >
            <v-card-title>AIに聞く</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            AIに過去の問い合わせなどについてきくことができます
          </v-card-subtitle>

          <v-card-text>
            <div>AIに聞いたこと：</div>

            <div>【メモリ高騰の原因】</div>
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
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
.menutext {
  font-size: 24px;
  margin-top: 80px;
  margin-bottom: 30px;
  font-weight: bold;
}
.action-card {
  margin-top: 100px;
  transition: transform 0.3s ease-in-out;
}

.action-card:hover {
  transform: scale(1.1);
  z-index: 10;
}
.welcometext {
  padding: 20px 30px;
  border-radius: 2px;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
</style>
