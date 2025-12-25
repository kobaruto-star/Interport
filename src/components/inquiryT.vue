<script setup>
import { onMounted, shallowRef, ref } from 'vue'
import { useInquiryStore } from '@/stores/inquiryStore'
import { useLoginStore } from '@/stores/loginStore'

let items = ref([])
const selected = shallowRef([2])
const loginStore = useLoginStore()
const inquiryStore = useInquiryStore()
let mounted = shallowRef(false)
let reply = ref()

onMounted(async () => {
  mounted.value = true
  console.log('マウント時所属' + loginStore.departmentname)
  await inquiryStore.getinquiryfrom(loginStore.departmentname)
  items.value = inquiryStore.inquiryfromlist
  console.log('マウント取得')
  console.log(items)
  mounted.value = false
})

const update = async () => {
  mounted.value = true
  console.log('マウント時所属' + loginStore.departmentname)
  await inquiryStore.getinquiryfrom(loginStore.departmentname)
  items.value = inquiryStore.inquiryfromlist
  console.log('マウント取得')
  console.log(items)
  mounted.value = false
}
</script>

<template>
  <!--問い合わせ一覧-->
  <div v-show="!mounted">
    <v-list v-model:selected="selected" select-strategy="leaf" bg-color="transparent">
      <v-list-item v-for="item in items" :key="item.id" :value="item.id" active-class="text-blue">
        <v-col cols="12" md="12" sm="12">
          <v-card class="glass-card" elevation="0">
            <v-card-text>
              <div>{{ item.inquiryat }}</div>

              <p class="text-h4 font-weight-black">{{ item.inquirysubject }}</p>

              <p class="text-h7">優先度:{{ item.urgency }}</p>
              <p class="text-h7" style="color: blue">締め切り:{{ item.deadline }}</p>
              <p>問い合わせ元：{{ item.inquiryfrom }}</p>

              <div class="text-medium-emphasis">
                <p class="text-h6 font-weight-black">{{ item.inquirycontents }}</p>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="teal-accent-4"
                text="返信"
                variant="text"
                @click="reply = item.id"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <v-card v-if="reply === item.id" height="100%" style="bottom: 0" class="glass-card">
                <v-card-text class="pb-0">
                  <div v-for="replyA in item.replies" :key="replyA.replynum">
                    <div class="text-caption text-grey ml-1 mb-1">
                      <div class="d-flex justify-space-between align-center w-100">
                        <div class="text-subtitle-2 font-weight-bold">
                          {{ replyA.staff }}
                        </div>

                        <div class="text-caption text-grey">
                          {{ replyA.replyat }}
                        </div>
                      </div>
                    </div>
                    <v-card color="grey-lighten-4" class="pa-3 rounded-xl d-inline-block">
                      {{ replyA.reply }}
                    </v-card>
                  </div>
                  <p class="text-medium-emphasis"></p>
                </v-card-text>

                <v-card-actions class="pt-0">
                  <v-text-field label="返信" variant="underlined" v-model="replyB"></v-text-field>
                  <v-btn
                    color="teal-accent-4"
                    text="返信"
                    variant="text"
                    @click="
                      inquiryStore.addreply(
                        item.id,
                        replyB,
                        loginStore.username,
                        loginStore.departmentname,
                      )
                    "
                  ></v-btn>
                  <v-btn color="teal-accent-4" text="更新" variant="text" @click="update()"></v-btn>
                  <v-btn
                    color="teal-accent-4"
                    text="閉じる"
                    variant="text"
                    @click="reply = 0"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-list-item>
    </v-list>
  </div>
</template>

<style>
.glass-cardA {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
