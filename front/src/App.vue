<template>
  <div id="app">
    <div class="header">
        <h2>{{appTitle}}</h2>
    </div>
    <div class="body">
      <div class="add-new">
        <v-card v-for="avItem in availableProducts" v-bind:key="avItem.name" :avitem="avItem" :addThis="addThis"/>
      </div>
      <card class="cart">
        <div class="cart-header">
          <span>Your cart</span>
          <span>Total: {{totalPrice}} 
            <select v-model="selectedCurrency">
              <option v-for="cur in availableCurrencies" v-bind:key="cur">{{cur}}</option>
            </select> 
          </span>
        </div>
        <transition-group name="list" tag="div" class="cart-list">
          <h-card v-for="avItem in products" v-bind:key="avItem.name" :avitem="avItem" :removeThis="removeThis"/>
        </transition-group>
        <button class="chekout-button" v-if="products.length > 0" @click="checkout">Check out</button>    
      </card>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue';
import VCard from './components/VCard.vue';
import HCard from './components/HCard.vue';

export default {
  components: { 'card': Card, 'v-card': VCard, 'h-card': HCard },
  data() {
    return {
      appTitle: 'Cart calculator',
      availableCurrencies: ['USD', 'EUR', 'RUB'],
      productTemplate: {
        name: '',
        quantity: '',
        currency: '',
        price: 0
      },
      availableProducts: [
        { 
          name: 'Wood',
          quantity: 1,
          price: 1,
          currency: 'USD',
          thumb: 'http://www.pngall.com/wp-content/uploads/2017/05/Wood-Free-Download-PNG.png'
        },
        { 
          name: 'Steel',
          quantity: 1,
          price: 5,
          currency: 'USD',
          thumb: 'https://img.pngio.com/steel-png-hd-steel-png-2000_1500.png'
        },
        { 
          name: 'Bricks',
          quantity: 1,
          price: 2,
          currency: 'USD',
          thumb: 'https://www.freeiconspng.com/uploads/element-3d-apple-iphone-x-4.png'
        }
      ],
      products: [],
      totalPrice: 0,
      selectedCurrency: 'USD'
    };
  },
  methods:{
    addThis: function(item) {
      if(this.products.some(pitem => pitem.name == item.name))
      {
        this.products.forEach(pitem => (pitem.name === item.name) && (pitem.quantity = +pitem.quantity + +item.quantity));
      }
      else
        this.products.push({...item});
    },
    removeThis: function(item){
      this.products = this.products.filter(pitem => pitem.name !== item.name);
    },
    updatePrice: function() {
        const data = { 
          currency: this.selectedCurrency, 
          amount: this.products.reduce((accum, current) => {
            return accum + current.quantity * current.price
          }, 0) 
        };
        axios({
          method: 'POST',
          url: 'http://localhost:3000/recalcCurrency',
          data: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.totalPrice = response.data.converted.toFixed(2);
        })
        .catch(console.error);
    },
    checkout: function(){
      alert('Checked out!')
      this.products = []
    }
  },
  watch: {
    products: {
      handler: function (val, oldVal) {
        this.updatePrice()
      },
      deep: true
    },
    selectedCurrency: function(){
      this.updatePrice()
    }
  }
};
</script>

<style>
body {
  max-width: 1076px;
  align-self: center;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.header {
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
}

.add-new {
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  height: 140px;
}

.card-order {
  display: flex;
  flex-direction: row;
  height: 24px;
  justify-content: stretch;
  margin-top: 15%;
}

.card-order .quantity {
  min-width: 25px;
  max-width: 50px;
  margin-right: 5px;
}

.cart {
  padding: 10px;
  margin-top: 15px;
  transition: all 0.5s;
}

.cart-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
}

.cart-header span{
  margin-left: 10px;
  margin-top: 5px;
  font-weight: 500;
  font-size: 24px;
}

.list-move {
  transition: all 0.5s;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: 50% 0;
}

.chekout-button {
  margin-top: 20px;
}
</style>