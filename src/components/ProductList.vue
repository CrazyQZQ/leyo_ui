<!--  -->
<template>
  <line-bLock>{{ title }}</line-bLock>
  <!--	<div class="rounded-lg bg-white">-->
  <div class="grid grid-cols-2 gap-2 p-2 h-96">
    <div v-for="(item) in products" :key="item.id" class="h-53 w-full bg-white rounded-lg"
         @click="$router.push('/goodsDetail?id='+item.productId)">
      <div class="h-36">
        <img class="h-full w-full rounded-t-lg" :src="item.imageUrl?item.imageUrl:defaultErrorImage"/>
      </div>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">{{ item.productName }}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">
        <van-tag color="#ffe1e1" class="mr-1" text-color="#ad0000" v-for="(attribute,index) in item.skuAttributes"
                 :key="index">{{ attribute.value }}
        </van-tag>
      </p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">销量：{{ item.sales }}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate font-sans text-red-500">￥{{ item.price }}</p>
    </div>
    <div ref="target" style="position: relative;height: 10px;">123</div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref, Ref} from 'vue'
import LineBLock from '@src/components/lineblock.vue'
import {hotSales} from "@src/api/order";
import {Sku} from "@src/models/product";
import {defaultErrorImage} from "@src/common/common";
import {useIntersectionObserver} from '@vueuse/core'
import {Toast} from 'vant'

export default defineComponent({
  name: 'ProductList',
  components: {
    'line-bLock': LineBLock
  },
  props: {
    title: {
      type: String,
      default: () => '热销商品'
    }
  },
  setup() {
    const target = ref(null)
    let products: Ref<Sku[]> = ref([])
    let pageNum = 1;
    let pageSize = 10;

    onMounted(() => {
      getData()
    })

    // 获取数据
    async function getData() {
      let params = {
        pageNum,
        pageSize
      }
      let res: any = await hotSales()
      products.value = products.value.concat(res.data as Sku[])
    }

    // stop             用于停止检测函数
    // target           被检测的元素
    // isIntersecting   布尔值，元素是否可见 true/false
    const {stop} = useIntersectionObserver(
        target,
        ([{isIntersecting}], observerElement) => {
          // 如果元素可以，发送请求获取数据，并停止检测避免重复发送请求
          if (isIntersecting) {
            // Toast('isIntersecting元素可见性，发送请求获取数据')
            console.log('isIntersecting元素可见性，发送请求获取数据')
            stop()
          }
        }, {
          //threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。
          threshold: 0
        }
    )
    return {
      products,
      defaultErrorImage,
      target
    }
  }
})
</script>