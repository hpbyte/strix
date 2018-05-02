import { Platform } from 'react-native'

export const send = 'md-send'
export const up = 'ios-arrow-up'
export const down = 'ios-arrow-down'
export const add = Platform.OS === 'ios' ? 'ios-add' : 'md-add'
export const link = Platform.OS === 'ios' ? 'ios-link' : 'md-link'
export const more = Platform.OS === 'ios' ? 'ios-more' : 'md-more'
export const mail = Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'
export const lock = Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'
export const menu = Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'
export const quote = Platform.OS === 'ios' ? 'ios-quote' : 'md-quote'
export const pulse = Platform.OS === 'ios' ? 'ios-pulse' : 'md-pulse'
export const alert = Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'
export const trash = Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'
export const podium = Platform.OS === 'ios' ? 'ios-podium' : 'md-podium'
export const user = Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'
export const search = Platform.OS === 'ios' ? 'ios-search' : 'md-search'
export const logout = Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'
export const discuss = Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'
export const chat = Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'
export const noti = Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'