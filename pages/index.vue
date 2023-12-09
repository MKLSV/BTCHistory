<template>
  <div class="app-container">
    <h1>BTC-HISTORY</h1>
    <h1>{{ historyTime }}</h1>
    <div class="options">
      <section :class="historyTime === option ? 'active option' : 'option' " @click="historyTime = option" v-for="(option, index) in timeOptions" :key="index">
        {{ option }}
      </section>
      <div class="cusomOption">
        <input type="date" v-model="customFrom">
        <input type="date" v-model="customTo">
        <button class="setBtn" @click="setCustomData">Set</button>
      </div>
    </div>
    <span class="error" v-if="error.length">Ошибка: {{ error }}</span>
    <Chart :historyTime="historyTime" :customTo="customTo" :customFrom="customFrom" />
  </div>
</template>

<script >
export default {

  data() {
    return {
      historyTime: 'День',
      timeOptions: ['День', 'Неделя', 'Месяц', 'Год'],
      customFrom: '',
      customTo: '',
      error: ''
    }
  },
  methods: {
    setCustomData() {
      if (this.customFrom.length && this.customTo.length) {
        if (new Date(this.customFrom).getTime() < new Date(this.customTo).getTime() && Math.floor(Date.now()) > new Date(this.customTo).getTime()) this.historyTime = 'Custom'
        else this.error = "Дата Выбрана Не Корректно"
      }
      else this.error = "Выберите Дату"

    }
  },
  watch: {
    historyTime() {
      this.error = ''
    }
  },
}
</script>

<style lang="scss">
.app-container {
  // padding: 10px 20vw;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error{
    color: rgb(240, 239, 239);
    padding: 5px;
    background-color: #c225257c;
    border-radius: 10px;
    border: 1px solid red;
  }
  .options {
    display: flex;
    align-items: center;

    .option {
      padding: 4px 10px;
      border: 1px solid #9b9d9e;
      background: #ecf0f1;
      height: 35px;
      cursor: pointer;
      color: #494b4c;
      &.active{
        color: #f9f9f9;
        background-color: #948f8f;

      }
      
      &:hover {
        background: #a1a4a4;
        
      }
    }
  }
  
  .cusomOption {
    display: flex;
    justify-content: center;
    .setBtn {
      height: 35px;
      background: #ecf0f1;
      cursor: pointer;
      border: 1px solid #9b9d9e;

      &:hover {
        background: #d5d7d7;

      }
    }

  }
}
</style>