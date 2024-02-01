<template>
  <div class="e_layout e_top">
    <home
      :title="siteTitle"
      :subTitle="siteData.upperTitle.text"
      :text="siteData.underTitle.text"
    />
  </div>
  <over-ons
    :overOns="siteData.aboutUs.text"
    :vizie="siteData.vision.text"
  />
  <div class="e_layout">
    <rassen 
      :bernerSennen="siteData.bernerSennen.text"
      :goldenRetriever="siteData.goldenRetriever.text"
     />
    <foto-gallerij 
      :images="siteData.fotos"
      :max-images="8"
    />
    <verwachte-nesten
      :nesten="siteData.nesten"
    />
    <contact />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/data.json')

const siteTitle = '<h1>Welkom bij de Meulemeershoeve</h1>';
const siteData = JSON.parse((data?.value ?? '{}') as string)
</script>