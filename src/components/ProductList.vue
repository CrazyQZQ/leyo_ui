<!--  -->
<template>
  <line-bLock>{{ title }}</line-bLock>
  <!--	<div class="rounded-lg bg-white">-->
  <div class="grid grid-cols-2 gap-2 p-2">
    <div v-for="(item) in list" :key="item.id" class="h-53 w-full bg-white rounded-lg"
         @click="$router.push('/goodsDetail?id='+item.productId)">
      <div class="h-36">
        <img class="h-full w-full rounded-t-lg" :src="item.imageUrl?item.imageUrl:defaultErrorImage"/>
      </div>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans" v-html="item.productName"></p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">
        <span v-html="item.typeName"></span> <span v-html="item.brandName"></span>
      </p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">
        <van-tag color="#ffe1e1" class="mr-1" text-color="#ad0000" v-for="(attribute,index) in item.skuAttributes"
                 :key="index">{{ attribute.value }}
        </van-tag>
      </p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">销量：{{ item.sales }}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate font-sans text-red-500">￥{{ item.price }}</p>
    </div>
    <div ref="target" style="position: relative;height: 10px;"></div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref, Ref, PropType} from 'vue'
import LineBLock from '@src/components/lineblock.vue'
import {hotSales} from "@src/api/order";
import {search} from "@src/api/search";
import {Sku} from "@src/models/product";
import {defaultErrorImage} from "@src/common/common";
import {useIntersectionObserver} from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'ProductList',
  components: {
    'line-bLock': LineBLock
  },
  props: {
    title: {
      type: String,
      default: () => '热销商品'
    },
    list: Array as PropType<Array<Sku>>
  },
  setup() {
    const target = ref(null)
    return {
      defaultErrorImage,
      target
    }
  }
})
</script>