import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { RootType, AppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootType,
    AppDispatch
>()
export type AppStartListening = typeof startAppListening

export const addAppListener = addListener.withTypes<RootType, AppDispatch>()
export type AppAddListener = typeof addAppListener