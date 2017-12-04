<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header'
import tab from './components/tab/tab'
export default {
  components: {
    MHeader: header,
    tab
  }
}
</script>

<style lang="stylus" scoped>

</style>

