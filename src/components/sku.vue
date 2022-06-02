<template>
  <div class="divide-y-2 divide-gray-500 divide-opacity-5">
    <section class="flex m-1.5">
      <van-image width="100" height="100" :src="selectedSku.imageUrl" />
      <div class="flex flex-col justify-end p-3">
        <div class="text-red-500 text-2xl">
          <span>￥ {{selectedSku.price}}</span>
        </div>
        <div class="text-gray-400 text-sm">
          <span>剩余 {{selectedSku.stock}} 件</span>
        </div>
      </div>
    </section>
    <div class="divide-y-2 divide-gray-500 divide-opacity-5 max-h-64 overscroll-y-auto overflow-y-auto">
    <section class="m-1.5" v-for="(item) in attributes" :key="item.id">
      <p class="py-2 text-sm">
        {{item.name}}
      </p>
      <van-row gutter="10">
        <van-col v-for="(value,index) in item.values" :key="value.id" @click="click(value.id)">
          <div v-if="value.hasSku" class="attr-val inline-flex items-center justify-center bg-gray-100 cursor-pointer" :class="value.checked ? 'checked' : 'uncheck'" >
            <span class="text-sm p-1">{{value.name}}</span>
          </div>
          <div v-else class="attr-val disable inline-flex items-center justify-center bg-gray-100 cursor-pointer">
            <span class="text-sm p-1">{{value.name}}（缺货）</span>
          </div>
        </van-col>
      </van-row>
    </section>
    <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="num" />
    </section>
    </div>
  </div>
  <section class="flex pt-5">
    <van-button round type="danger" v-show="submitType == 1" block @click="addShoppingCart">确认</van-button>
    <van-button round type="danger" v-show="submitType == 2" block @click="submitOrder">提交订单</van-button>
  </section>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType, toRef, onMounted } from 'vue'
import { Product } from "@src/models";
import { addCartItem } from '@src/api/order'
import { Toast } from 'vant';
export default defineComponent({
	name: 'Sku',
  props: {
    product: Object,
    submitType: Number
  },
	setup(props) {
    let product = toRef(props, 'product')
    let submitType = toRef(props, 'submitType')
    let skus = ref([])
    let attributes = ref([])
    let selectAttr = []
    let selectedSku = ref({})
    skus.value = product.value.skus
    attributes.value = product.value.attributes

    onMounted(() => {
      attributes.value.forEach(item => {
        let flag = false
        item.values = item.values.map((value,index) => {
          value.hasSku = skus.value.some(sku => sku.spec.includes(`"keyId":${item.id},"valId":${value.id}`))
          if(value.hasSku && !flag) {
            selectAttr.push({keyId: item.id, valId: value.id})
            value.checked = true
            flag = true
          } else {
            value.checked = false
          }
          return value
        })
      })
      let selectAttrStr = JSON.stringify(selectAttr);
      selectedSku.value = skus.value.find(item => {
        return item.spec === selectAttrStr
      })
    })


		const num = ref(0)
    const click = (id) => {
      selectAttr.length = 0
      attributes.value.forEach(item => {
        item.values.forEach(value => {
          if(value.id === id) {
            selectAttr.push({keyId: item.id, valId: value.id})
            value.checked = true
          }else {
            value.checked = false
          }
        })
      })
      let selectAttrStr = JSON.stringify(selectAttr);
      selectedSku.value = skus.value.find(item => {
        return item.spec === selectAttrStr
      })
      console.log(selectAttrStr,selectedSku.value)
    }
    const addShoppingCart = () => {
      addCartItem({
        skuId: selectedSku.value.id,
        num: num.value
      }).then(res => {
        Toast.success('添加成功')
      })
    }
    const submitOrder = () => {
      Toast.success('提交成功')
    }
		return {
      num,
      product,
      attributes,
      selectedSku,
      click,
      submitType,
      addShoppingCart,
      submitOrder
		}
	}
})
</script>
<style lang="less" scoped>
.checked{
  background-color: #fcd34d;
  border: 1px solid #ff6034;
  color: #ff6034;
}
.uncheck{
  background-color: lightgray;
  color: black;
  border: 1px solid white;
}
.attr-val{
  border-radius: 6px;
  min-width: 4em;
  padding: 0 3px 0 3px;
}
.disable{
  border: 1px #e5e7eb dashed;
  background-color: #e5e7eb;
  color: black;
}
</style>