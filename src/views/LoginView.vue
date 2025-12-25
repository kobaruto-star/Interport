<script setup>
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import loginbg from '@/assets/loginbg.png'

const newsStore = useNewsStore()

onMounted(async () => {
  await newsStore.getnews()
})
</script>

<template>
  <v-parallax :src="loginbg">
    <v-row>
      <v-col cols="12" md="6">
        <h1 class="todaysnewstext">news</h1>
        <div class="newsborder"></div>
        <div class="todaysnews">
          <v-sheet class="overflow-y-auto pa-2 scrollbar" style="height: 70vh" color="transparent">
            <div v-for="newsitem in newsStore.newslist" :key="newsitem.id">
              <v-card
                class="mx-auto mb-4 mt-4 glass-card"
                hover
                href="newsitem.url"
                color="transparent"
              >
                <v-card-item>
                  <v-card-title>
                    {{ newsitem.title }}
                  </v-card-title>

                  <v-card-subtitle>
                    {{ newsitem.author }}
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  {{ newsitem.description }}
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="todaysnewstext">お知らせ</h1>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<style>
.todaysnewstext {
  margin-top: 80px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: bold;
  font-size: 32px;
}
.todaysnews {
  border-radius: 3px;

  margin: 0 auto 30px auto;
}
.newsborder {
  width: 100px;
  height: 4px;
  background-color: #1976d2;
  margin: 0 auto 10px auto;
}
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.scrollbar::-webkit-scrollbar {
  width: 8px;
}

.scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
