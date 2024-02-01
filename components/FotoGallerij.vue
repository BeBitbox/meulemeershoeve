<template>
  <section id="fotos">
    <h2 class="gallery-title">Momentopnames</h2>
    <p class="gallery-sub">Ontdek in onze galerij de vreugdevolle momenten van Meulemeershoeve, vastgelegd in beeld met
      onze <span>Berner Sennenhonden</span> en <span>Golden Retrievers</span>.</p>
    <div class="gallery">
      <img v-for="image in images" :src="(image as string)" @click="setSelectedImage(image)"
        alt="Meulemeershoeve gallerij image" />
      <div v-if="maxImages && props.images.length > maxImages" class="show-more">
        <h2>Meer foto's</h2>
        <Button text="Toon alles" to="/fotos" />
      </div>
    </div>
  </section>
  <Carrousel 
    :selectedImage="selectedImage"
    @closeModal="setSelectedImage(null)"
    @setPreviousImage="setPreviousImage" 
    @setNextImage="setNextImage" 
  />
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  images: Array,
  maxImages: {
    type: Number,
    default: null
  }
});

const images = ref(props.maxImages ? props.images.slice(0, props.maxImages ?? props.images.length) : props.images);

const selectedImage = ref(null);

const setSelectedImage = (image) => {
  selectedImage.value = image;
};
const setPreviousImage = () => {
  const index = props.images.findIndex(image => image === selectedImage.value)
  selectedImage.value = props.images[index - 1] ?? props.images[props.images.length - 1]
};
const setNextImage = () => {
  const index = props.images.findIndex(image => image === selectedImage.value)
  selectedImage.value = props.images[index + 1] ?? props.images[0]
};
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.gallery-title {
  margin-top: 160px;
}

.gallery-sub {
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

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-bottom: 160px;

  .show-more {
    background: url('../assets/images/nerves.jpg') no-repeat center center;
    background-size: cover;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      padding: 0 40px;
      margin: 0;
      padding-top: 0;
      color: #fff;
    }

    .c-button {
      margin: 0 0 0 40px;
      background-color: #fff;
      border-color: #fff;

      p {
        color: #000;
      }
    }
  }

  img {
    cursor: pointer;
    transition-duration: 400ms;

    &:hover {
      transition-duration: 400ms;
      transform: scale(1.01);
    }
  }

  img,
  .show-more {
    object-fit: cover;
    width: 100%;
    height: 412.67px;
    border-radius: 10px;
  }
}

@media only screen and (max-width: 1250px) {
  .gallery {
    grid-column-gap: 2vw;
    grid-row-gap: 2vw;

    img,
    .show-more {
      height: calc(33vw - 4vw);
    }
  }
}

@media only screen and (max-width: 1050px) {}

@media only screen and (max-width: 877px) {}

@media only screen and (max-width: 570px) {}
</style>
