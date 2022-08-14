<template>
  <div class="pay-type w-full mt-5 rounded-lg shadow">
    <van-radio-group v-model="checked">
      <van-cell-group inset>
        <van-cell :title="currentPayType.accountName" clickable @click="show = !show">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }" >
      <template #default>
        <van-cell-group inset>
          <van-cell v-for="(item, index) in payTypes" :title="item.accountName" :key="index" clickable @click="emitPayType(item)">
            <template #label>
              <span>￥{{item.amount}}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </template>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted, Ref } from 'vue'
import { getAccountByUserId } from '@src/api/user'
import { BaseResponseType } from "@src/models/common";
import { SysAccount } from "@src/models/user";
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PayType',
  setup(_, context) {
    let currentPayType: Ref<SysAccount> = ref({
      accountId: null,
      userId: null,
      accountCode: '',
      accountName: '',
      amount: 0
    })
    let show = ref(false)
    const { emit } = context
    const payTypes: Ref<SysAccount[]> = ref([])
    const store = useStore<IGlobalState>()
    const checked = ref('1')
    const emitPayType = (payType: SysAccount) => {
      currentPayType.value = payType
      show.value = false
      if (currentPayType.value) emit('payTypeChange', currentPayType.value)
    }

    onMounted(async () => {
      await getAccount()
      emitPayType(currentPayType.value)
    })

    const getAccount = async () => {
      const { data } = await getAccountByUserId({userId: store.state.auth.userInfo.userId}) as BaseResponseType<SysAccount>
      currentPayType.value = data
      payTypes.value.push(data)
      payTypes.value.push({
        accountId: null,
        userId: null,
        accountCode: '',
        accountName: '微信',
        amount: 0
      })
      payTypes.value.push({
        accountId: null,
        userId: null,
        accountCode: '',
        accountName: '支付宝',
        amount: 0
      })
    }

    return {
      currentPayType,
      checked,
      show,
      payTypes,
      emitPayType
    }
  }
})
</script>