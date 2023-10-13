import { useDark, useToggle } from '@vueuse/core'

export * from './faker'

export const toggleDark = useToggle(useDark())
