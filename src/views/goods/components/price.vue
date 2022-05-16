<template>
  <section class="mt-2 bg-white divide-y divide-gray-50">
    <p class="flex justify-between p-3 text-gray-500 text-xs">
      <span>指导零售价</span>
      <span>￥6899.0</span>
    </p>
    <p class="flex justify-between p-3 text-gray-500 text-xs">
      <span>最低购买数量</span>
      <span>999件</span>
    </p>
    <p class="flex justify-between p-3 text-gray-500 text-xs" @click="selectSku">
      <span>已选</span>
      <span class="text-black">
        请选择规格 数量
        <van-icon name="arrow" />
      </span>
    </p>
    <van-popup v-model:show="show" round position="bottom" :style="{ padding:'15px' }" >
      <sku></sku>
    </van-popup>
  </section>
</template>

<script lang='ts'>
import sku from '@components/sku.vue';
import { defineComponent, ref } from 'vue'
import { useToggle } from '@vant/use'
export default defineComponent({
  components: {
    sku
  },
	setup() {
		const [show, toggle] = useToggle()
		toggle(false)
		const selectSku = () => {
			toggle(true)
		}
		return {
			show,
			selectSku
		}
	}
})
</script>