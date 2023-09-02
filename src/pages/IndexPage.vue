<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="logo" src="~assets/logo.jpeg" />
          </q-avatar>
          Welkom bij de Meulemeershoeve
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-tab
          @click="selectTab('start')"
          :class="selectedTabClass('start')"
          label="Start"
        />
        <q-tab
            @click="selectTab('puppies')"
            :class="selectedTabClass('puppies')"
            label="Puppies"
        />
        <q-tab
          @click="selectTab('info')"
          :class="selectedTabClass('info')"
          label="Over ons"
        />
        <q-tab
          @click="selectTab('contacteer')"
          :class="selectedTabClass('contacteer')"
          label="Contacteer ons"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <div
          class="full-height full-width flex flex-center text-center"
          id="start"
        >
          <div class="">
            <div class="text-h6 text-grey-5">
              {{ boventitel }}
            </div>
            <div
              class="text-h2 text-white q-py-sm q-my-md"
              style="
                border-top: 3px solid #1595de;
                border-bottom: 3px solid #2faa64;
              "
            >
              Meulemeershoeve
            </div>
            <img src="~assets/hoeve.png" alt="hoeve"/>
            <div
              class="text-h5 q-mt-md text-grey-2 flex-center"
              v-html="ondertitel"
            />
          </div>
        </div>

        <div id="puppies" class="flex">
          <div class="text-h4 row text-primary q-py-sm q-my-md text-center flex-center full-width">
            Beschikbare puppies
          </div>
          <div class="q-pa-md row justify-center q-gutter-md">
            <q-card
              v-for="puppy in puppies"
              class="col-xs-6 col-sm-4 col-md-3"
              v-ripple
              :key="puppy.name"
            >
              <q-card-section class="row justify-center">
                <q-img
                  size="12em"
                  name="image_search"
                  color="grey"
                  :src="puppy.photo"
                >
                  <div
                    style="color: #1495de !important"
                    class="absolute-bottom text-center text-h5 text-grey-2"
                  >
                    {{ puppy.name }}
                  </div>
                </q-img>
              </q-card-section>
              <q-card-actions class="">
                {{ puppy.description }}
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <div
            class="full-height full-width flex flex-center"
            id="info"
        >
          <div class="text-h4 text-grey-5 text-center infoDiv">
            Over ons
          </div>
          <div class="text-body1 text-left text-pink-1 infoDiv q-pa-sm" v-html="informatie" />
        </div>

        <div id="contacteer" class="flex">
          <q-card bordered class="q-pa-lg shadow-1 mycard">
            <q-parallax
                src="https://cdn.quasar.dev/img/parallax1.jpg"
                :height="150"
            >
              <div class="text-pink-2 infoDiv text-h4">
                Contacteer ons
              </div>
            </q-parallax>

            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                    square
                    filled
                    clearable
                    v-model="naam"
                    type="text"
                    label="Naam"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="email"
                  type="email"
                  label="E-mail"
                />
                <q-input
                    square
                    filled
                    clearable
                    v-model="telefoon"
                    type="tel"
                    label="Telefoonnummer"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="vraag"
                  type="textarea"
                  label="Uw vraag"
                />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="light-green-7"
                size="lg"
                class="full-width"
                label="Verzend"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { scroll } from "quasar";

const { getScrollTarget, setVerticalScrollPosition } = scroll;

export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      selectedTab: "start",
      naam: "",
      email: "",
      telefoon: "",
      vraag: "",
      boventitel: "",
      ondertitel: "",
      informatie: "",
      puppies: []
    };
  },
  mounted() {
    fetch("https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/data.json")
        .then((response) => response.json())
        .then((data) => {
          this.boventitel = data.boventitel;
          this.ondertitel = data.ondertitel;
          this.informatie = data.informatie;
          this.puppies = data.puppies;
        });
  },
  setup() {
    const leftDrawerOpen = ref(false);

    function selectTab(val) {
      this.selectedTab = val;

      let el = document.getElementById(val);
      const target = getScrollTarget(el);
      const offset = el.offsetTop - 65;
      const duration = 800;
      setVerticalScrollPosition(target, offset, duration);
    }

    function selectedTabClass(val) {
      if (this.selectedTab === val) {
        return "text-bold";
      } else {
        return "";
      }
    }

    return {
      leftDrawerOpen,
      selectedTabClass,
      selectTab,
    };
  },
});
</script>

<style>
#start {
  background: url(https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/background.jpg)
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.68) !important;
  z-index: 0;
}

#info {
  background: url(https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/info_background.jpg)
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.68) !important;
  z-index: 0;
}

.infoDiv {
  background-color: rgba(0, 0, 0, 0.50) !important;
}

.mycard {
  min-width: 500px;
  width: 100%;
  max-width: 1000px;
}
</style>
