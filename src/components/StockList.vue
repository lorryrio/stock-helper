<template>
  <div class="stock-list">
    <header class="stock-item">
      <div class="item-column" v-for="item in header" :key="item">
        <span class="name" v-html="item"></span>
      </div>
    </header>
    <main class="stock-item" v-for="item in symbolItems" :key="item.quote.name">
      <div class="item-name item-column">
        <span class="name">{{item.quote.name}}</span>
        <span class="small">{{item.quote.symbol}}</span>
      </div>
      <div class="item-current item-column">
        <span>{{item.quote.current}}</span>
      </div>
      <div
        class="item-target item-column"
        :class="{'strong': item.config.target_0 >= item.quote.current || premium(item) < 10}"
      >
        <span>{{item.config.target_0}}</span>
        <span class="small">{{premium(item)}}%</span>
      </div>
      <div class="item-chg item-column" :class="item.quote.chg >=0 ? 'gain' : 'slip'">
        <span>{{item.quote.chg}}<br>({{item.quote.percent}}%)</span>
      </div>
      <div class="item-volume item-column">
        <span>{{(item.quote.volume / 10000).toFixed(1)}}</span>
      </div>
      <div class="item-market_capital item-column">
        <span>{{(item.quote.market_capital / 100000000).toFixed(1)}}</span>
      </div>
    </main>
    <footer>
      <span>当价格低于参考价时可考虑买入</span>
    </footer>
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
        '参考价<br>溢价',
        '涨跌幅',
        '成交量<br>(万股)',
        '市值<br>(亿)',
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
    premium(item) {
      return ((100 * (item.quote.current - item.config.target_0)) / item.config.target_0).toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stock-list {
  width: 100%;
  padding-top: 10px;
  header {
    border-top: 1px solid #edf0f5;
    &.stock-item {
      font-size: 24px;
      font-weight: 400;
      text-align: center;
    }
  }
  .stock-item {
    width: 100%;
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 28px;
    border-bottom: 0.5px solid #edf0f5;
    text-align: center;
    .small {
      font-size: 24px;
      color: #a3aab1;
    }
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
    }
    .item-target {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  footer {
    width: 100%;
    font-size: 24px;
    color: #a3aab1;
    text-align: center;
    margin-top: 30px;
  }
}
</style>
