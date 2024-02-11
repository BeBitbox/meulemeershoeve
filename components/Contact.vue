<template>
  <section id="contacteer-ons">
    <h2 v-if="!props.onlyForm" class="contacteer-title">Heeft u Vragen of Opmerkingen?</h2>
    <p v-if="!props.onlyForm" class="contacteer-sub">
      Neem gerust contact met ons op voor al uw vragen of meer informatie over Meulemeershoeve. We horen graag van u!
    </p>
    <section class="c-contacteer-wrapper" :class="{ 'only-form': props.onlyForm }">
      <vee-form @submit="onSubmit">
        <div class="c-contacteer-inner">
          <div class="input-wrapper">
            <p>Volledige naam</p>
            <vee-field type="text" name="Naam" placeholder="Naam" rules="required" />
            <vee-error-message name="Naam" />
          </div>
          <div class="input-wrapper">
            <p>Telefoonnummer</p>
            <vee-field name="Telefoonnummer" placeholder="Telefoonnummer" rules="validPhone" />
            <vee-error-message name="Telefoonnummer" />
          </div>
        </div>
        <div class="input-wrapper">
          <p>Email</p>
          <vee-field name="Email" type="email" placeholder="Email" rules="required|email" />
          <vee-error-message name="Email" />
        </div>
        <div class="input-wrapper">
          <p>Bericht</p>
          <vee-field as="textarea" rows="8" name="Bericht" placeholder="Schrijf een bericht" rules="required" />
          <vee-error-message name="Bericht" />
        </div>
        <button type="submit" :disabled="success" class="form-button"
          :class="{ 'loading': ((loading || success) || !show) }">
          <p :style="(loading || success) || !show ? 'display:none;' : 'display:unset;'">
            Verstuur Bericht
          </p>
          <LottieAnimation v-if="loading && !success" class="c-loading-lottie" :width="24" :height="24" :loop="true"
            :animation-data="lottieOptions.first" />
          <LottieAnimation v-if="success && !loading" class="c-loading-lottie" :width="32" :height="32"
            :animation-data="lottieOptions.second" />
        </button>
      </vee-form>
    </section>
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { LottieAnimation } from "lottie-web-vue"
import * as firstAnimationData from '~/assets/lottie/loading.json';
import * as secondAnimationData from '~/assets/lottie/checkmark.json';

const toast = useToast()

const props = defineProps({
  onlyForm: Boolean
});

const loading = ref(false);
const show = ref(true);
const success = ref(false);

const lottieOptions = {
  first: firstAnimationData.default,
  second: secondAnimationData.default
}

function validPhone(value) {
  if (!value) {
    return true;
  }
  const regex = /^(\+32|0032|0[1-9][0-9]{1,2})?[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}|(\+31|0031|0[1-9][0-9]{1,2})?[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{4}|(\+|00)?[1-9][0-9]{6,14}$/i;
  return regex.test(value);
}

defineRule('required', required);
defineRule('email', email);
defineRule('validPhone', validPhone);

configure({
  generateMessage: localize('nl', {
    messages: {
      required: '{field} is verplicht.',
      email: 'Email is niet geldig.',
      validPhone: 'Telefoonnummer is niet geldig.'
    },
  }),
});

async function onSubmit(values) {
  loading.value = true;
  show.value = false;
  try {
    await fetch('https://tdfpqx7dr6mfvopcso3bxzaswa0qscif.lambda-url.eu-west-3.on.aws/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { "name": values.Naam, "email": values.Email, "telephone": values.Telefoonnummer, "question": values.Bericht })
    })

    setTimeout(() => {
      loading.value = false;
      success.value = true;
      toast.add({
        id: 'toaster-success',
        icon: 'i-heroicons-check-badge',
        title: 'Formulier verzonden',
        description: 'We nemen zo snel mogelijk contact met u op.',
        timeout: 6000,
      })
    }, 1000);


  } catch (e) {
    toast.add({
      id: 'toaster-error',
      icon: 'i-heroicons-information-circle',
      color: 'red',
      title: 'Formulier verzenden mislukt',
      description: 'Probeer het later opnieuw.',
      timeout: 6000,
    })

    loading.value = false;
    show.value = true;
  }
}
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

#contacteer-ons {
  margin-bottom: 160px;
}

.contacteer-sub {
  max-width: 572px;
  font-size: $sub_text;
  font-family: $main-font;
  color: $gray;
  line-height: 34px;
  margin: 0;
  margin-top: 20px;

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

.c-contacteer-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 60px;

  .input-wrapper {
    position: relative;

    p {
      font-size: $text;
      font-family: $main-font;
      padding-left: 20px;
      margin: 0;
      margin-bottom: 5px;
      font-weight: 600;
    }

    span {
      position: absolute;
      bottom: 12px;
      color: rgb(208, 0, 0);
      font-size: $small_text;
      left: 20px;
      font-family: $main-font;
    }
  }

  input,
  textarea {
    border-radius: 20px;
    min-height: 40px;
    border-width: 0;
    background-color: $input-gray;
    margin-bottom: 30px;
    font-family: $main-font;
    padding-left: 20px;
    width: 100%;

    &::placeholder {
      color: $text-gray;
      opacity: 1;
      /* Firefox */
    }

    &::-ms-input-placeholder {
      /* Edge 12 -18 */
      color: $text-gray;
    }

    &:focus {
      outline-color: $lightgreen solid 1px;
    }
  }

  textarea {
    padding-top: 20px;
  }

  .c-contacteer-inner {
    display: grid;

    div {
      position: relative;
    }
  }

  &.only-form {
    margin-top: 30px;

    .c-contacteer-inner {
      grid-template-columns: repeat(1, 1fr);
      grid-column-gap: 0;
    }
  }
}

.form-button {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  background: $lightergreen;
  border: 3px solid $green;
  border: none;
  height: 56px;
  font-family: $main-font;
  font-style: normal;
  font-weight: 600;
  font-size: $text;
  width: fit-content;
  padding: 0 30px;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  color: #fff;
  font-family: $main-font;
  font-size: $text;
  font-weight: 600;
  font-style: normal;
  white-space: nowrap;

  &.loading {
    transition-duration: 600ms;
    border-radius: 56px;

    height: 56px;
    width: 56px;
  }


  &:disabled {
    cursor: pointer;
  }

  &:hover {
    --x: 100%;
  }

  .c-loading-lottie {
    position: absolute;
  }

  p {
    color: #fff;
  }
}

@media only screen and (min-width: 691px) {
  .c-contacteer-inner {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 30px;
  }
}

@media only screen and (max-width: 690px) {
  .c-contacteer-inner {
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 0;
  }
}
</style>
