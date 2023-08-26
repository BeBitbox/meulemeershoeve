<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="logo" src="~assets/logo.jpeg">
          </q-avatar>
          Welkom bij de Meulemeershoeve
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-tab @click="selectTab('start')" :class="selectedTabClass('start')" label="Start"/>
        <q-tab @click="selectTab('puppies')" :class="selectedTabClass('puppies')" label="Puppies"/>
        <q-tab @click="selectTab('kaart')" :class="selectedTabClass('kaart')" label="Kaart"/>
        <q-tab @click="selectTab('contacteer')" :class="selectedTabClass('contacteer')" label="Contacteer ons"/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center my-wrapper">
        <div class="full-height full-width flex flex-center text-center"
             style="background-color: rgba(0, 0, 0, 0.68) !important;z-index:0;height: 100vh !important;" id="start">
          <div class="">
            <div class="text-h6 text-grey-5">Erkende kweker van Benner Senner honden</div>
            <div class="text-h2 text-white q-py-sm q-my-md"
                 style="border-top:3px solid #1595de;border-bottom: 3px solid #2faa64;">Meulemeershoeve
            </div>
            <img src="~assets/hoeve.png">
            <div style="color: #1495de !important;" class="text-h5 q-mt-md text-grey-2 flex-center">
              {{ information }}
            </div>
          </div>
        </div>

        <div id="puppies" class="flex">
<!--          <div class="q-pa-md row justify-center q-gutter-md cursor-pointer">-->
<!--            <q-card v-for="puppy in puppies" class="my-card col-xs-2" v-ripple>-->
<!--              <q-card-section class="row justify-center">-->
<!--                <q-img name="image_search" size="6em" color="grey" :src="puppy.photo"/>-->
<!--              </q-card-section>-->
<!--              <q-card-actions class="text-bold text-subtitle2 my-text">-->
<!--                {{text}}-->
<!--              </q-card-actions>-->
<!--            </q-card>-->

            <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
          <div class="text-h6 text-grey-5">Lorem</div>
        </div>

        <div id="kaart" class="flex">
          aaaaaa
        </div>

        <div id="contacteer" class="flex">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="email" type="email" label="email"/>
                <q-input square filled clearable v-model="password" type="password" label="password"/>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login"/>
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">Not reigistered? Created an Account</p>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import {defineComponent, ref} from 'vue'
import {scroll} from 'quasar'

const {getScrollTarget, setVerticalScrollPosition} = scroll


export default defineComponent({
  name: 'IndexPage',

  data() {
    return {
      selectedTab: 'start',
      email: '',
      password: '',
      information: 'Deze hoeve van meer dan 150 jaar oud is erkend erfgoed. Gelegen vlak bij Lotenhulle en het kasteel van Poeke, wonen er 5 Benner Senners: Luka, Luna, Zora, Basiel en Kamiel. Af en toe komen hier mooie puppies uit, die na medische opvolging een warm nest zoeken. Bent u geïnteresseerd? Neem vrijwillig contact op!',
      puppies: [
        {
          name: 'Max',
          photo: 'logo.jpeg',
          description: 'Deze puppy is schuchter van karakter en houdt zich liever afzijdig van andere honden. Max speelt liever met de kinderen.'
        }
      ]
    }
  },
  setup() {
    const leftDrawerOpen = ref(false)

    function selectTab(val) {
      this.selectedTab = val;

      let el = document.getElementById(val)
      const target = getScrollTarget(el)
      const offset = el.offsetTop - 65
      const duration = 800
      setVerticalScrollPosition(target, offset, duration)
    }

    function selectedTabClass(val) {
      if (this.selectedTab === val) {
        return 'text-bold';
      } else {
        return '';
      }
    }

    return {
      leftDrawerOpen,
      selectedTabClass,
      selectTab
    }
  }
})

</script>

<style>
.my-wrapper {
  background: url(https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/background.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh !important;
}

</style>
