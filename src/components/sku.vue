<template>
  <div class="divide-y-2 divide-gray-500 divide-opacity-5">
    <section class="flex m-1.5">
      <van-image width="100" height="100" :src="selectedSku?.imageUrl" />
      <div class="flex flex-col justify-end p-3">
        <div class="text-red-500 text-2xl">
          <span>￥ {{selectedSku?selectedSku.price:'--'}}</span>
        </div>
        <div class="text-gray-400 text-sm">
          <span>剩余 {{selectedSku?selectedSku.stock+'件':'库存不足'}} </span>
        </div>
      </div>
    </section>
    <div class="divide-y-2 divide-gray-500 divide-opacity-5 max-h-64 overscroll-y-auto overflow-y-auto">
    <section class="m-1.5" v-for="(item) in attributes" :key="item.id">
      <p class="py-2 text-sm">
        {{item.name}}
      </p>
      <van-row gutter="10">
        <van-col v-for="(value,index) in item.values" :key="value.id" @click="click(item.id,value.id)">
          <div class="attr-val inline-flex items-center justify-center bg-gray-100 cursor-pointer" :class="value.checked ? 'checked' : 'uncheck'" >
            <span class="text-sm p-1">{{value.name}}</span>
          </div>
        </van-col>
      </van-row>
    </section>
    <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="num" :disabled="!selectedSku"/>
    </section>
    </div>
  </div>
  <section class="flex pt-5">
    <van-button round type="danger" v-show="submitType == 1" :disabled="!selectedSku" block @click="addShoppingCart">确认</van-button>
    <van-button round type="danger" v-show="submitType == 2" :disabled="!selectedSku" block @click="submitOrder">提交订单</van-button>
  </section>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType, toRef, onMounted } from 'vue'
import { Product } from "@src/models";
import { addCartItem } from '@src/api/order'
import { Toast } from 'vant';
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'Sku',
  props: {
    product: Object,
    submitType: Number
  },
	setup(props) {
    const store = useStore<IGlobalState>()
    let product = toRef(props, 'product')
    let submitType = toRef(props, 'submitType')
    let skus = ref([])
    let attributes = ref([])
    let selectAttr = []
    let selectedSku = ref({})
    skus.value = product.value.skus
    attributes.value = product.value.attributes

    onMounted(() => {
      getDefaultSku()
    })

    const getDefaultSku = () => {
      if(skus.value.length > 0) {
        let sku = skus.value[0]
        selectedSku.value = sku
        attributes.value.forEach(item => {
          item.values = item.values.map((value) => {
            value.checked = sku.spec.includes(`"keyId":${item.id},"valId":${value.id}`)
            return value
          })
        })
      }
    }

		const num = ref(0)
    const click = (keyId,valId) => {
      selectAttr.length = 0
      attributes.value.forEach(item => {
        item.values.forEach(value => {
          if(item.id === keyId && value.id === valId) {
            value.checked = true
          }else if(item.id === keyId && value.id !== valId){
            value.checked = false
          }
          if(value.checked) {
            selectAttr.push({keyId: item.id, valId: value.id})
          }
        })
      })
      let selectAttrStr = JSON.stringify(selectAttr);
      selectedSku.value = skus.value.find(item => {
        return item.spec === selectAttrStr
      })
      num.value = 0
    }
    const addShoppingCart = () => {
      addCartItem({
        skuId: selectedSku.value.id,
        num: num.value,
        userId: store.state.auth.userInfo.userId
      }).then(res => {
        console.log(res)
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