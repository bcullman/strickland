<template>
  <div>
    <form class="form"
          @input="vueStricklandOnInput"
          @change="vueStricklandOnChange"
          @focusout="vueStricklandOnFocusOut"
          @submit="vueStricklandOnSubmit">
      <div class="formfield">
        <input id="firstName" name="firstName" type="text" aria-placeholder="First name"
               :class="firstNameState.validationClassName" v-model.trim="form.firstName">
        <label for="firstName"
               :data-validation-message="firstNameState.validationMessage">First name</label>
      </div>
      <div class="formfield">
        <input id="lastName" name="lastName" type="text" aria-placeholder="Last name"
               :class="lastNameState.validationClassName" v-model.trim="form.lastName">
        <label for="lastName"
               :data-validation-message="lastNameState.validationMessage">Last name</label>
      </div>
      <div class="formfield-select" :class="ageState.validationClassName">
        <label for="age">Age</label><br>
        <select id="age" name="age" type="text" v-model.number="form.age">
          <option :value="null" selected>-- Please select --</option>
          <option :value="age" :key="age" v-for="age in ages">{{ age }}</option>
        </select>
        <label class="formfield-error">{{ ageState.validationMessage }}</label>
      </div>
      <div class="formfield-radio" :class="genderState.validationClassName">
        <label>Gender</label><br>
        <span v-for="gender in genders" :key="gender">
          <input :id="'gender-' + gender" name="gender" type="radio"
                 :value="gender" v-model="form.gender">
          <label :for="'gender-' + gender">{{ gender }}</label>
        </span>
        <label class="formfield-error">{{ genderState.validationMessage }}</label>
      </div>
      <div class="formfield">
        <input id="username" name="username" type="text" aria-placeholder="Username"
               :class="usernameState.validationClassName" v-model.trim="form.username">
        <label for="username"
               :data-validation-message="usernameState.validationMessage">Username</label>
      </div>
      <div class="formfield">
        <input id="password" name="password" type="password" aria-placeholder="Password"
               :class="passwordState.validationClassName" v-model="form.password">
        <label for="password"
               :data-validation-message="passwordState.validationMessage">Password</label>
      </div>
      <div class="formfield">
        <input id="confirmPassword" name="confirmPassword" type="password" aria-placeholder="Confirm password"
               :class="confirmPasswordState.validationClassName" v-model="form.confirmPassword">
        <label for="confirmPassword"
               :data-validation-message="confirmPasswordState.validationMessage">Confirm password</label>
      </div>
      <div class="formfield-checkbox" :class="acceptsTermsState.validationClassName">
        <div>
          <input id="acceptsTerms" name="acceptsTerms" type="checkbox" v-model="form.acceptsTerms">
          <label for="acceptsTerms">
            Accept <a href="#">terms and conditions</a>
          </label>
        </div>
        <label class="formfield-error">{{ acceptsTermsState.validationMessage }}</label>
      </div>
      <div class="formactions">
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
    <p>{{ vueStricklandIsValid ? 'Can Submit' : 'Cannot Submit Yet' }}</p>
    <pre id="current-state">{{ JSON.stringify({ form, validation, validationHistory }, null, 2) }}</pre>
  </div>
</template>

<script>
import signUpForm from '../forms/signUpForm';
import formMixinFactory from '../vue-strickland/formMixinFactory';

// Change to use Vuex
let signUpFormVuex = Object.assign({}, signUpForm, { useVuex: true });

export default {
  name: 'Vuex',
  mixins: [
    formMixinFactory(signUpFormVuex)
  ],
  data: () => ({
    // TODO: Remove soon
    validationHistory: [],
    ages: [...Array(100).keys()].slice(1),
    genders: ['Male', 'Female', 'Trans*']
  }),
  methods: {
    onSubmission (event) {
      alert('submission allowed');
    },
    onSubmissionRejection (event) {
      alert('submission denied');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
