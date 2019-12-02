<template>
  <div class="card item-hcard" >
    <div class="imgcontainer">
      <img :src="avitem.thumb">
    </div>
    <div class="info-section">
      <h4>{{avitem.name}}</h4>
      <p>{{avitem.price * avitem.quantity}} {{avitem.currency}}   (x{{avitem.quantity}}) </p>
      <button @click="removeThis(avitem)">Remove from cart</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { avitem: { type: Object }, removeThis: { type: Function } },
  mounted: function () {
    console.log(this.avitem)
  }
}
</script>

<style>

.item-hcard {
  width: 98%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: start; 
}

.imgcontainer{
  width: 215px;
  justify-content: center;
  display: flex;
}

.item-hcard img {
  width: auto;
  height: 95%;
  padding-left: 10px;
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