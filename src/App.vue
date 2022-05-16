<template :class="isDark ? 'dark' : ''">
  <div style="overflow-y: hidden;overflow-x: hidden;">
		<!-- vue3.0不能采用种形式来实现，否则要报错，路由跳转动画也无法实现 -->
		<!-- <transition name="slide-left">
			<router-view></router-view>
		</transition> -->
		<!-- vue3.0必须以这种形式来实现 -->
    <router-view v-slot="{ Component }">
      <!-- <transition name="slide-left"> -->
        <component :is="Component" />
      <!-- </transition> -->
    </router-view>
    <router-view name="Tabbar"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDark } from '@vueuse/core'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'App',
	setup() {
		const route = useRouter()
		const isDark = useDark({
			valueDark: 'dark',
			valueLight: 'light'
		})

		return {
			isDark
		}
	}
})
</script>

