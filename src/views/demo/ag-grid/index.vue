<script setup>
import { ref, defineComponent } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridVue } from 'ag-grid-vue3'

const rowData = ref([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
])

const colDefs = ref([
  { field: 'make', flex: 2, filter: true, editable: true },
  { field: 'model', flex: 1, sortable: true },
  { field: 'price', valueFormatter: (p) => '£' + Math.floor(p.value).toLocaleString() },
  { field: 'electric' },
  { headerName: 'Make & Model', valueGetter: (p) => p.data.make + ' ' + p.data.model },
  {
    field: 'actions',
    cellRenderer: defineComponent({
      template: `<el-button size="small" @click="log">Preview</el-button>`,
      setup({ params }) {
        function log() {
          console.log(params.data)
        }

        return { log }
      },
    }),
  },
])
</script>

<template>
  <div class="app-ctn">
    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      rowSelection="multiple"
      class="ag-theme-quartz h-full"
    ></ag-grid-vue>
  </div>
</template>

<style lang="scss"></style>
