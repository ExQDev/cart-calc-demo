<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.card {
  width: auto;
  margin: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.5s all ease-in-out;
  min-height: 90px;
}
</style>