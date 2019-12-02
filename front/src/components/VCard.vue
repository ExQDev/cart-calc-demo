<template>
  <div class="card item-vcard">
    <img :src="avitem.thumb">
    <div class="info-section">
      <h4>{{avitem.name}}</h4>
      <p>{{avitem.price}} {{avitem.currency}}</p>
      <div class="card-order">
        <input class="quantity" type="number" min="0" v-model="avitem.quantity">
        <button @click="addThis(avitem)">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { avitem: { type: Object }, addThis: { type: Function } },
}
</script>

<style>
.item-vcard {
  width: 30%;
  padding: 5px;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start; 
}

.item-vcard:hover {
  background: rgba(0,0,0,0.05);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
}

.item-vcard img {
  width: 40%;
  height: auto;
}

.info-section {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.info-section h4,p {
  margin-bottom: 2px;
  padding-bottom: 2px;
  margin-top: 5px;
}

</style>