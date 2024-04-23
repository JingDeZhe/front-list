import p5 from 'p5'
import { onMounted, type Ref } from 'vue'

export function useP5(fn: (p: p5) => void, ctn: Ref<HTMLElement>) {
  onMounted(() => {
    new p5(fn, ctn.value)
  })
}
