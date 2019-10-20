<template>
  <v-card dark tile class="py-3 px-6">
    <v-card-title class="justify-center text-center">ВХОД</v-card-title>
    <v-form ref="form" v-model="valid" class="py-6">
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="mr-8"
            prepend-icon="mdi-email"
            v-model="email"
            placeholder="example@ex.com"
            :rules="rules.emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="mr-8"
            prepend-icon="mdi-key"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password"
            :rules="rules.passwordRules"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            placeholder="пароль"
            required
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-btn icon color="#dd4b39">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon>
            <v-icon color="#3b5999">mdi-facebook</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon>
            <v-icon color="#0084ff">mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-btn block class="mr-4" color="green" @click="signup">Войти</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn block color="error" class="mr-4" @click.stop="closeDialog">Отмена</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "log-in",
  computed: {
  },
  data: () => ({
    valid: true,
    email: "",
    password: "",
    showPassword: false,
    rules: {
      passwordRules: [
        v => !!v || "Необходимо ввести пароль"
      ],
      emailRules: [
        v => !!v || "Необходимо ввести E-mail",
        v => /.+@.+\..+/.test(v) || "E-mail Должен быть настоящим"
      ]
    }
  }),

  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    signup() {
      if (this.validate()) {
        this.email = "AAAAAAAAAAAAAAAAa";
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>