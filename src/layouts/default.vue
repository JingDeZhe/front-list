<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { routes } from 'vue-router/auto/routes'

const formatRoutes = computed(() => {
  const t: any[] = []
  const exclude = ['/', '/About']
  for (let r of routes) {
    if (exclude.includes(r.path)) continue
    if (!r.component && r.children) {
      let name = r.path
      const rIndex = r.children.find((v) => v.path === '')
      if (rIndex) {
        name = rIndex.name || name
      }
      const item = { name: name, path: r.path }
      if (r.children?.length) {
        const children = []
        for (let child of r.children) {
          if (child.path === '') continue
          children.push({ name: child.name || child.path, path: child.path })
        }
        item.children = children
      }
      t.push(item)
    }
  }
  return t
})
console.log(routes, formatRoutes.value)
</script>

<template>
  <div class="flex items-stretch">
    <div class="w-[300px]">
      <el-menu>
        <el-sub-menu v-for="v in formatRoutes" :index="v.path">
          <template #title>
            <span>{{ v.name }}</span>
          </template>
          <el-menu-item v-for="v2 in v.children" :index="v2.path">
            <template #title>
              <span>{{ v2.name }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss"></style>
