import {fetchUser} from '../utils/fetchLocalStorageData'
const userInfo=fetchUser()
export const initialState={
    user:userInfo,
    foodItem:null,
}