<template>
  <div class="loading">
      <img src="./loading.gif" alt="loading..." width="24" height="24">
      <p class="desc">{{ text }}</p>
  </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '正在加载...'
        }
    }
}
</script>
<style lang="stylus">
@import "../../common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>

