<script lang="js" setup>
function Role(name) {
  this.name = name

  this.say = function() {
    console.log(`hello, I'm ${this.name}`)
  }
  return this
}

const snoopy = new Role('snoopy')
snoopy.say()
console.dir(snoopy)
</script>

<template></template>

<style lang="scss"></style>
