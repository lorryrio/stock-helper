<template>
  <div id="app">
    <StockList/>
  </div>
</template>

<script>
import StockList from './components/StockList.vue';

export default {
  name: 'App',
  components: {
    StockList,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
