<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import header from './components/header/header'
import tab from './components/tab/tab'
import player from './components/player/player'
export default {
  components: {
    MHeader: header,
    tab,
    player
  }
}
</script>

<style lang="stylus" scoped>

</style>

