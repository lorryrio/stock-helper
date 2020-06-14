<template>
  <div class="stock-list">
    <header class="stock-item">
      <div class="item-column" v-for="item in header" :key="item">
        <span class="name">{{item}}</span>
      </div>
    </header>
    <div class="stock-item" v-for="item in symbolItems" :key="item.quote.name">
      <div class="item-name item-column">
        <span class="name">{{item.quote.name}}</span>
        <span class="symbol">{{item.quote.symbol}}</span>
      </div>
      <div class="item-current item-column">
        <span>{{item.quote.current}}</span>
      </div>
      <div
        class="item-target item-column"
        :class="{'strong': item.config.target_0 >= item.quote.current}"
      >
        <span>{{item.config.target_0}}</span>
      </div>
      <div class="item-chg item-column" :class="item.quote.current >=0 ? 'gain' : 'slip'">
        <span>{{item.quote.chg}}({{item.quote.percent}})</span>
      </div>
      <div class="item-volume item-column">
        <span>{{(item.quote.volume / 10000).toFixed(1)}}</span>
      </div>
      <div class="item-current item-column">
        <span>{{(item.quote.market_capital / 100000000).toFixed(1)}}</span>
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
      header: [
        '名称',
        '当前价',
        '参考价',
        '涨跌幅',
        '成交量(万股)',
        '市值(亿)',
      ],
      symbolItems: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const symbol = symbolList.map((item) => item.symbol).join(',');
      const res = await axios.get(
        `http://22053484-1732053286884989.test.functioncompute.com/stock/search?symbol=${symbol}`,
      );
      if (res.status === 200 && res.data.code === 200) {
        const { items } = res.data.data.data;
        this.symbolItems = items.map((item, index) => ({
          ...item,
          config: symbolList[index],
        }));
      } else {
        console.log('瞅啥呢，接口出错了');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stock-list {
  width: 100%;
  header {
    &.stock-item {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
    }
  }
  .stock-item {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 0.5px solid #edf0f5;
    text-align: center;
    .item-column {
      flex: 1;
    }
    .gain {
      color: #d20;
    }
    .slip {
      color: #093f;
    }
    .strong {
      color: #f70;
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
