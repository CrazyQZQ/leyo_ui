<template>
    <div class="address-box">
        <van-nav-bar title="编辑地址" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="address-body">
            <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
                :addressInfo="curAddress" :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
                @change-detail="onChangeDetail" />

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { reactive, toRefs, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Toast } from 'vant';
import { UserAddress } from "@src/models/User";
import { queryAddressById, modifyUserAddress, addUserAddress } from '@src/api/user'
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'
import { areaList } from '@vant/area-data';

export default {
    name: 'AddressEdit',
    components: {
    },
    setup() {
        const store = useStore<IGlobalState>()
        const router = useRouter()
        const route = useRoute()
        const userId = store.state.auth.userInfo.userId
        let curAddress = ref({})

        onMounted(async () => {
            let addressId = route.params.addressId
            if (addressId) {
                // 修改
                let res: any = await queryAddressById({ id: addressId })
                curAddress.value = {
                    id: res.data.id,
                    name: res.data.receiverName,
                    tel: res.data.receiverTel,
                    province: res.data.province,
                    city: res.data.city,
                    county: res.data.region,
                    addressDetail: res.data.detailAddress,
                    isDefault: res.data.defaultStatus === 1,
                    areaCode: res.data.areaCode,
                    postalCode: res.data.postCode,
                }
            } else {
                // 新增
            }
        })

        const goBack = () => {
            router.go(-1)
        }


        const searchResult = ref([]);

        const onSave = async (val: any) => {
            const saveObj: UserAddress = {
                id: val.id,
                userId: userId,
                receiverName: val.name,
                receiverTel: val.tel,
                province: val.province,
                city: val.city,
                region: val.county,
                detailAddress: val.addressDetail,
                fullAddress: val.province + val.city + val.county + val.addressDetail,
                defaultStatus: val.isDefault ? 1 : 0,
                areaCode: val.areaCode,
                postCode: val.postalCode,
            }
            let res: any;
            if (val.id) {
                res = await modifyUserAddress(saveObj)
            } else {
                res = await addUserAddress(saveObj)
            }
            if (res && res.code === 200) {
                Toast.success('保存成功')
            } else {
                Toast.fail('保存失败')
            }
        };
        const onDelete = () => Toast('delete');
        const onChangeDetail = (val: any) => {

        };
        return {
            goBack,
            onSave,
            onDelete,
            areaList,
            searchResult,
            onChangeDetail,
            curAddress
        };
    }
}
</script>
<style lang="less" scoped>
.address-box {
    padding: 0.5rem;
    background-color: #fff;
}
</style>
