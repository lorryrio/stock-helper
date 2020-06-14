<template>
  <div class="stock-list">
    <div class="stock-item" v-for="item in symbolItems" :key="item.quote.name">
      <div class="item-name item-column">
        <span class="name">{{item.quote.name}}</span>
        <span class="symbol">{{item.quote.symbol}}</span>
      </div>
      <div class="item-current item-column">
        <span>{{item.quote.current}}</span>
      </div>
      <div class="item-chg item-column" :class="item.quote.current >=0 ? 'gain' : 'slip'">
        <span>{{item.quote.chg}}({{item.quote.percent}})</span>
      </div>
      <div class="item-volume item-column">
        <span>{{(item.quote.volume / 10000).toFixed(1)}}万股</span>
      </div>
      <div class="item-current item-column">
        <span>{{(item.quote.market_capital / 100000000).toFixed(1)}}亿</span>
      </div>
    </div>
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
      const res = await axios.get(
        `http://22053484-1732053286884989.test.functioncompute.com/stock/search?symbol=${symbol}`,
      );
      this.symbolItems = res.data.data.data.items;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stock-list {
  width: 100%;
  .stock-item {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 14px;
    border: 0.5px solid #edf0f5;
    .item-column {
      flex: 1;
    }
    .gain {
      color: #d20;
    }
    .slip {
      color: #093F;
    }
    .item-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .name {
        // font-weight: bold;
      }
      .symbol {
        font-size: 12px;
        color: #a3aab1;
      }
    }
  }
}
</style>
