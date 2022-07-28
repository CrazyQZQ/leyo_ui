import store from '@src/store'
import * as Types from '@src/store/modules/cache/types'

export const toggle = (value: boolean) => {
    store.dispatch(`cacheInfo/${Types.TOGGLE_LOADING}`, value)
    return '';
}