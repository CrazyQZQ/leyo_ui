<template>
	<div class="address-box">
		<van-nav-bar title="收货地址" left-arrow @click-left="goBack"></van-nav-bar>
		<div class="address-body">
			<van-address-list
				v-model="chosenAddressId"
				:list="list"
				:disabled-list="disabledList"
				disabled-text="以下地址超出配送范围"
				default-tag-text="默认"
				@add="onAdd"
				@edit="onEdit"
				@select="onSelect"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { UserAddress } from '@src/models/user'
import { queryUserAddress } from '@src/api/user'
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'
import { toggle } from '@src/util/useToggle'

export default {
	name: 'Address',
	components: {},
	setup() {
		const store = useStore<IGlobalState>()
		const router = useRouter()
		const goBack = () => {
			router.go(-1)
		}
		const chosenAddressId = ref('1')
		let list = ref([])
		onMounted(async () => {
			let userId = store.state.auth.userInfo.userId
			if (userId) {
				toggle(true)
				let res: any = await queryUserAddress({ userId: userId })
				list.value = res.data.map(
					(e: { id: any; receiverName: any; receiverTel: any; fullAddress: any; defaultStatus: number }) => {
						return {
							id: e.id,
							name: e.receiverName,
							tel: e.receiverTel,
							address: e.fullAddress,
							isDefault: e.defaultStatus === 1
						}
					}
				)
				toggle(false)
			}
		})
		const disabledList = ref([])

		const onAdd = () => {
			router.push('/addressEdit')
		}
		const onEdit = (item: UserAddress, index: number) => {
			const addressId = item.id + ''
			router.push({
				name: 'AddressEdit',
				params: {
					addressId
				}
			})
		}

		const onSelect = () => {
			router.go(-1)
		}
		return {
			goBack,
			list,
			onAdd,
			onEdit,
			disabledList,
			chosenAddressId,
      onSelect
		}
	}
}
</script>
<style lang="less" scoped>
.address-box {
	padding: 0.5rem;
	background-color: #fff;
}
</style>
