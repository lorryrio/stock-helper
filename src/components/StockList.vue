<template>
  <div class=".stock-list">
    <div v-for="item in symbolItems" :key="item.quote.name">{{item.quote.name}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config';

const { symbolList } = config;

export default {
  name: 'StockList',
  data() {
    return {
      symbolItems: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const symbol = symbolList.join(',');
      const res = await axios.get(`http://22053484-1732053286884989.test.functioncompute.com/stock/search?symbol=${symbol}`, {
      });
      this.symbolItems = res.data.data.data.items;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stock-list {

}
</style>
