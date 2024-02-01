<template>
  <div class="e_layout e_top fotos">
    <foto-gallerij 
      :images="siteData.fotos"
    />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/data.json')

const siteData = JSON.parse((data?.value ?? '{}') as string)
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.fotos {
  min-height: 100vh;
}
</style>