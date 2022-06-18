<template>
  <line-block>品牌特购</line-block>
  <div class="w-full h-32 rounded-md bg-white wrapper whitespace-nowrap relative overflow-hidden">
    <div class="scroll-content inline-block pt-1">
      <div class="scroll-item inline-block " v-for="(item, index) in list" :key="index">
        <div class="flex flex-col justify-center items-center mx-3">
          <img :src="item.imageUrls?item.imageUrls[0]:''" :alt="item.name" class="w-16 h-16" @click="toCatory(item.name)" />
          <p class="text-xs pt-1 font-light text-gray-700 dark:text-gray-50">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NameWithIcon } from '@src/store/home'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import BScroll from '@better-scroll/core'
import LineBLock from '@src/components/lineblock.vue'

export default defineComponent({
	name: 'Brand',
	props: {
		list: Array as PropType<Array<NameWithIcon>>
	},
	components: {
		'line-block': LineBLock
	},
	setup() {
		let bscroll = null

		onMounted(() => {
			bscroll = new BScroll('.wrapper' as any, {
				scrollX: true,
				probeType: 3,
				// 保留纵向滑动
				eventPassthrough:'vertical',
				bounce: {
					top: true,
					bottom: true,
					left: true,
					right: true
				}
			})
		})

		const toCatory = (keyword: string) => {
			console.log(keyword)
		}

		return {
			toCatory
		}
	}
})
</script>
