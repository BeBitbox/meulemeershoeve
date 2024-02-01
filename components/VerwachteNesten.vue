<template>
  <div id="verwachte-nesten">
    <h2 class="nesten-title">Verwachte nesten</h2>
    <p class="nesten-sub">Blijf op de hoogte van de aankomende nesten van onze <span>Berner Sennenhonden</span> en
      <span>Golden Retrievers</span>, een belofte van nieuw leven en vreugde bij Meulemeershoeve.
    </p>
    <div class="nesten">
      <div class="nest" v-for="nest in props.nesten" @click="setSelectedNest(nest)">
        <img :src="nest.image" alt="Meulemeershoeve rassen image" class="c-nesten-image">
        <h4>{{ nest.name }}</h4>
        <p>
          {{ truncateDescription(nest.description) }}
        </p>
      </div>
    </div>
  </div>
  <Carrousel mod-side-panel :selectedImage="selectedNest?.image || null" @closeModal="setSelectedNest(null)"
    @setPreviousImage="setPreviousNest" @setNextImage="setNextNest">
    <div class="nest-info">
      <h3>{{ selectedNest.name }}</h3>
      <p>{{ selectedNest.description }}</p>
      <div class="seperator" />
      <h4>Contacteer ons</h4>
      <p>Heeft u interesse in een puppy uit dit nieuwe nest? Neem contact met ons op voor meer informatie en om uw plek te
        reserveren.</p>
      <contact only-form />
    </div>
  </Carrousel>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  nesten: Array
});

const selectedNest = ref(null);

const setSelectedNest = (nest) => {
  selectedNest.value = nest;
};

const setPreviousNest = () => {
  const index = props.nesten.findIndex(nest => nest.uuid === selectedNest.value.uuid)
  selectedNest.value = props.nesten[index - 1] ?? props.nesten[props.nesten.length - 1]
};
const setNextNest = () => {
  const index = props.nesten.findIndex(nest => nest.uuid === selectedNest.value.uuid)
  selectedNest.value = props.nesten[index + 1] ?? props.nesten[0]
};

const maxLength = 50; // Set your desired maximum length

function truncateDescription(description) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings.scss';

#verwachte-nesten {
  margin-bottom: 160px;
}

.nest-info {
  margin: 20px;

  h3 {
    max-width: 572px;
    font-size: $hero_sub_text;
    font-family: $main-font;
    line-height: 34px;
    margin: 10px 0 0 0;
    color: #000;
    margin: 0;
    margin-top: 40px;
  }

  h4 {
    max-width: 572px;
    font-size: $sub_text;
    font-family: $main-font;
    line-height: 34px;
    margin: 10px 0 0 0;
    color: #000;
    margin: 0;
  }

  p {
    max-width: 572px;
    font-size: $text;
    font-family: $main-font;
    color: $gray;
    line-height: 24px;
    margin: 0;
    margin-top: 20px;
  }

  .seperator {
    margin: 20px 0;
    width: 100%;
    border: .1px solid $line-gray;
  }
}

.nesten-sub {
  max-width: 572px;
  font-size: $sub_text;
  font-family: $main-font;
  color: $gray;
  line-height: 34px;
  margin: 0;
  margin-bottom: 60px;

  a {
    color: #000;
  }

  span {
    font-weight: 400;
    color: #000;
  }

  i {
    font-family: $detail-font;
    font-weight: 400;
  }
}

.nesten {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .nest {
    border-radius: 20px;
    border: 1.5px solid $light_line-gray;
    width: 100%;
    background-color: #fff;
    cursor: pointer;
    transition-duration: 400ms;

    &:hover {
      transition-duration: 400ms;
      transform: scale(1.01);
    }

    img {
      object-fit: cover;
      width: calc(100% - 40px);
      height: 300px;
      border-radius: 20px;
      margin: 20px;
    }

    h4 {
      margin: 0 0 0 30px;
      font-size: $sub_text;
      font-family: $main-font;
    }

    p {
      margin: 10px 30px 20px 30px;
      font-size: $sub_text;
      font-family: $main-font;
      color: $lighter-gray;
      line-height: 34px;
    }
  }
}
</style>
