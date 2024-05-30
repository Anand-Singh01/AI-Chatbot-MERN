import { atom } from "recoil"
import { alertAtomType } from "../types"

export const showAlertAtom = atom<alertAtomType>({
    key:'showAlertAtomKey',
    default:{
      page: '',
      message:'',
    }
  })
  export const isAlertAtom = atom<boolean>({
    key:'isAlertAtomKey',
    default:false
  })