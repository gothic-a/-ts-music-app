import { useDispatch, useSelector } from 'react-redux' 
import type { AppState, AppDispatch } from '../types/store'
import type { TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

