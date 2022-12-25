<template>
  <div class="home d-flex justify-content-center">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div class="d-flex justify-content-center mt-5">
    <button @click="goToDaybook" class="btn btn-primary px-5">Entrada</button>
  </div>
</template>

<script>
export default {
  methods:{
    goToDaybook(){
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>