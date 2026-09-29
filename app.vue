<template>
  <UApp :toaster="{ class: 'toaster' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
.toaster {
  z-index: 9999999;
}
</style>
