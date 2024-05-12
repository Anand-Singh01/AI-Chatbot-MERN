import { atom } from 'recoil';



export const isLoggedInAtom = atom({
    key:"isLoggedInAtom",
    default:false
})

export const currentUserAtom = atom({
    key:"currentUserIdAtom",
    default:{name:null,email:null}
})