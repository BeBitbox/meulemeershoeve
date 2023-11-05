<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="logo" src="~assets/logo.jpg" />
          </q-avatar>
          Welkom bij de Meulemeershoeve
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-tab
          @click="selectTab('home')"
          :class="selectedTabClass('home')"
          label="Home"
        />
        <q-tab
          @click="selectTab('aboutUs')"
          :class="selectedTabClass('aboutUs')"
          label="Over ons"
        />
        <q-tab
          @click="selectTab('vision')"
          :class="selectedTabClass('vision')"
          label="Onze visie"
        />
        <q-tab
          @click="selectTab('nesten')"
          :class="selectedTabClass('nesten')"
          label="Verwachte nesten"
        />
        <q-tab
          @click="selectTab('rassen')"
          :class="selectedTabClass('rassen')"
          label="Rassen"
        />
        <q-tab
          @click="selectTab('fotos')"
          :class="selectedTabClass('fotos')"
          label="Foto's"
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
        <q-banner v-if="this.$route.query.mail === 'success'" v-show="showMailNotification" class="text-h2 bg-green-3">
          Er werd een e-mail verstuurd naar de Meulemeershoeve
        </q-banner>

        <div
          class="full-height full-width flex flex-center text-center"
          id="home"
        >
          <div class="">
            <div
              class="text-h6 text-grey-5"
              v-if="!$q.platform.is.mobile || upperTitleMobile"
              v-html="upperTitle"
            />
            <div
              class="text-h3 text-white q-py-sm q-my-md"
              style="
                border-top: 3px solid #1595de;
                border-bottom: 3px solid #2faa64;
              "
            >
              Meulemeershoeve
            </div>
            <div
              v-if="!$q.platform.is.mobile || underTitleMobile"
              class="text-h5 q-mt-md text-grey-2 flex-center"
              v-html="underTitle"
            />
          </div>
        </div>

        <div
          class="full-height full-width flex flex-center"
          id="aboutUs"
          v-if="!$q.platform.is.mobile || aboutUsMobile"
        >
          <div class="text-h4 text-grey-5 text-center">Over ons</div>
          <div class="text-body1 text-left q-pa-sm" v-html="aboutUs" />
        </div>
        <div
          class="full-height full-width flex flex-center bg-amber-2"
          id="vision"
          v-if="!$q.platform.is.mobile || visionMobile"
        >
          <div class="text-h4 text-grey-5 text-center">Onze visie</div>
          <div class="text-body1 text-left q-pa-sm" v-html="vision" />
        </div>

        <div id="nesten" class="flex flex-center q-pa-md">
          <div class="text-h4 text-grey-5 text-center full-width">Verwachte nesten</div>
            <q-responsive :ratio="16/9" style="min-width:600px">
              <q-carousel
              arrows
              animated
              swipeable
              navigation
              infinite
              class="full-width"
              v-model="slideNesten"
            >
              <q-carousel-slide
                v-for="(nest, index) in nesten"
                :name="'slide' + index"
                :key="'slide' + index"
                :img-src="nest.image"
              >
                <div class="absolute-bottom custom-caption">
                  <div class="text-h2">{{ nest.name }}</div>
                  <div class="text-subtitle1">{{ nest.description }}</div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-responsive>
        </div>

        <div class="full-height full-width flex flex-center" id="rassen">
          <div class="text-h4 text-grey-5 text-center">Rassen</div>
          <div class="row">
            <div class="col-6">
              <q-img src="~assets/golden_retriever.jpg">
                <div class="absolute-bottom text-subtitle1 text-center">
                  Golden Retriever
                </div>
              </q-img>
            </div>
            <div class="col-6 text-body1 q-pa-md q-mt-md" v-html="goldenRetriever"/>
          </div>
          <div class="row">
            <div class="col-6 text-body1 q-pa-md q-mt-md" v-html="bernerSennen" />
            <div class="col-6">
              <q-img src="~assets/berner_sennenhond.jpeg">
                <div class="absolute-top text-center">Berner Sennen</div>
              </q-img>
            </div>
          </div>
        </div>

        <div id="fotos" class="full-width flex flex-center q-pa-md">
          <div class="text-h4 text-grey-5 text-center full-width">Foto's</div>
          <q-responsive :ratio="9/16" style="min-width:500px">
            <q-carousel
              arrows
              animated
              swipeable
              navigation
              infinite
              class="full-width"
              v-model="slideFotos"
            >
              <q-carousel-slide
                v-for="(foto, index) in fotos"
                :name="'foto' + index"
                :key="'foto' + index"
                :img-src="foto"
              />
            </q-carousel>
          </q-responsive>
        </div>

        <div id="contacteer" class="full-width flex flex-center q-pa-md">
          <q-card bordered class="q-pa-lg shadow-1 mycard">
            <q-parallax
              src="https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/backhome.jpg"
              :height="150"
            >
              <div class="text-pink-2 infoDiv text-h4">Contacteer ons</div>
            </q-parallax>

            <q-card-section>
              <q-form action="https://53746oo2kybim3tbs6qiud662a0qglra.lambda-url.eu-west-1.on.aws/" method="get" ref="myForm" class="q-gutter-md">
                <q-input
                  square
                  filled
                  v-model="naam"
                  name="name"
                  type="text"
                  label="Naam*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Naam is verplicht',
                  ]"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="email"
                  type="email"
                  name="email"
                  label="E-mail*"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val &&
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          val
                        )) ||
                      'Voorzie een correct e-mail adres',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" />
                  </template>
                </q-input>
                <q-input
                  square
                  filled
                  clearable
                  v-model="telefoon"
                  name="telephone"
                  type="tel"
                  label="Telefoonnummer"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
                <q-input
                  square
                  filled
                  clearable
                  v-model="vraag"
                  type="textarea"
                  label="Uw vraag*"
                  name="question"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Vraag is verplicht in te vullen',

                  ]"
                />
                <q-card-actions class="q-px-md">
                <q-btn
                    unelevated
                    color="secondary"
                    size="lg"
                    class="full-width"
                    label="Verzend"
                    type="submit"
                />
                </q-card-actions>
              </q-form>
            </q-card-section>

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
      selectedTab: "home",
      naam: "",
      email: "",
      telefoon: "",
      vraag: "",
      upperTitle: "",
      upperTitleMobile: true,
      underTitle: "",
      underTitleMobile: true,
      aboutUs: "",
      aboutUsMobile: true,
      vision: "",
      visionMobile: true,
      slideNesten: ref("slide1"),
      nesten: ref([]),
      goldenRetriever: "",
      bernerSennen: "",
      slideFotos: ref("foto1"),
      fotos: ref([]),
      showMailNotification: true
    };
  },
  mounted() {
    fetch("https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.upperTitle = data.upperTitle.text;
        this.upperTitleMobile = data.upperTitle.showMobile;
        this.underTitle = data.underTitle.text;
        this.underTitleMobile = data.underTitle.showMobile;
        this.aboutUs = data.aboutUs.text;
        this.aboutUsMobile = data.aboutUs.showMobile;
        this.vision = data.vision.text;
        this.visionMobile = data.vision.showMobile;
        this.nesten = data.nesten;
        this.goldenRetriever = data.goldenRetriever.text;
        this.bernerSennen = data.bernerSennen.text;
        this.fotos = data.fotos;
      });
    setTimeout(() => this.showMailNotification = false, 4000);
  },
  setup() {
    const myForm = ref(null);

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

    function onSubmit() {
      myForm.value.validate().then((success) => {
        if (success) {/*
          fetch('https://tdfpqx7dr6mfvopcso3bxzaswa0qscif.lambda-url.eu-west-3.on.aws/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { "name": this.naam, "email": this.email, "telephone": this.telefoon, "question": this.vraag })
          })
              .then(response => response.json())
              .then(response => console.log(JSON.stringify(response)))*/
          console.log("ok");
        } else {
          console.log("Falses");
        }
      });
    }

    return {
      selectedTabClass,
      selectTab,
      onSubmit,
      myForm,
    };
  },
});
</script>

<style>
#home {
  background: url(https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/backhome.jpg)
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.68) !important;
  z-index: 0;
}

.mycard {
  min-width: 500px;
  width: 100%;
  max-width: 1000px;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
