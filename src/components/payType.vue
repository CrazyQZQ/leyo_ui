<template>
  <div class="pay-type w-full mt-5 rounded-lg shadow">
    <van-radio-group>
      <van-cell-group inset>
        <van-cell :title="currentPayType" clickable @click="show = !show">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }" >
      <template #default>
        <van-cell-group inset>
          <van-cell v-for="(item, index) in payTypes" :title="item" :key="index" clickable @click="emitPayType(item)" />
        </van-cell-group>
      </template>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted } from 'vue'

export default defineComponent({
  name: 'PayType',
  setup(_, context) {
    let currentPayType = ref('支付宝')
    let show = ref(false)
    const { emit } = context
    const payTypes = ref(["支付宝", "微信", "零钱"])
    const emitPayType = (payType: string) => {
      currentPayType.value = payType
      show.value = false
      if (currentPayType.value) emit('payTypeChange', currentPayType.value)
    }

    onMounted(() => {
      emitPayType('零钱')
    })

    return {
      currentPayType,
      show,
      payTypes,
      emitPayType
    }
  }
})
</script>