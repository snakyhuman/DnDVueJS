<template>
  <v-card dark tile class="py-3 px-6" :loading="processing">
    <v-card-title class="justify-center text-center">РЕГИСТРАЦИЯ</v-card-title>
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
            :rules="[rules.passwordRules, passwordConfirmationRule]"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            placeholder="пароль"
            required
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="ml-8 mr-8"
            :type="showPassword ? 'text' : 'password'"
            label="Повторите пароль"
            placeholder="пароль"
            v-model="rePassword"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="6" justify-self="center" align-self="center">
          <a
            @click.stop="usereLicense = true"
            class="white--text caption text-center ml-8"
          >Пользовательское соглашение</a>

          <v-dialog v-model="usereLicense" max-width="90%" scrollable>
            <v-card>
              <v-card-title class="headline">Use Google's location service?</v-card-title>
              <embed
                src="../assets/polzovatelskoe-soglashenie-shablon.pdf"
                width="800px"
                height="2100px"
              />
              <v-card-actions>
                <v-btn color="green darken-1" text @click="usereLicense = false">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="6" justify-self="center" align-self="center">
          <v-checkbox
            class="ml-8 mr-8 text-wrap"
            v-model="checkbox"
            :rules="[v => !!v || 'Вы должны прочитать соглашение!']"
            label="Я ознакомлен с пользовательким соглашением и даю согласи на обработку моих персональных данных"
            required
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-btn icon @click="googleSignIn" color="#dd4b39">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn disabled icon>
            <v-icon color="#3b5999">mdi-facebook</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn disabled icon>
            <v-icon color="#0084ff">mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-alert
        v-show="error"
        :value="error"
        border="top"
        colored-border
        type="warning"
        elevation="1"
      >{{error}}</v-alert>
      <v-row>
        <v-col cols="12" md="6">
          <v-btn
            :loading="processing"
            block
            class="mr-4"
            color="green"
            @click="signup"
          >Зарегистрироваться</v-btn>
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
  name: "sign-up",
  computed: {
    passwordConfirmationRule() {
      if (this.password === this.rePassword) {
        return true;
      } else {
        return "Пароли не совпадают";
      }
    },
    error() {
      return this.$store.getters.get_error;
    },
    processing() {
      return this.$store.getters.get_processing;
    },
    isAuth() {
      return this.$store.getters.get_isAuth;
    }
  },
  watch: {
    isAuth(val) {
      if (val === true) this.closeDialog();
    }
  },
  data: () => ({
    valid: true,
    email: "",
    password: "",
    rePassword: "",
    checkbox: false,
    usereLicense: false,
    showPassword: false,
    rules: {
      passwordRules: [
        v => !!v || "Необходимо ввести пароль",
        v => v.length >= 6 || "Слишком слабый пароль"
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
    reset() {
      this.$refs.form.reset();
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    signup() {
      if (this.validate()) {
        this.$store.dispatch("signUp", {
          email: this.email,
          password: this.password
        });
        this.$store.currentUser;
      }
    },
    googleSignIn() {
      this.$store.dispatch("googleSignIn");
    }
  }
};
</script>

<style lang="css" scoped>
</style>