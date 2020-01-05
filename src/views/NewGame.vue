<template>
  <v-card>
    <v-container>
      <v-card-title primary-title class="mb-0 pb-0">Новая игра</v-card-title>
      <v-subheader class="mt-0 pt-0">Зарегистрировать новую партию</v-subheader>
      <v-row>
        <v-col cols="12" xs="12" sm="6" lg="6">
          <v-img
            src="../assets/imagePlaceholder.jpg"
            class="new-game--image white--text align-end pl-3 pt-3 mb-3"
            lazy-src="../assets/imagePlaceholder.jpg"
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.8)"
            height="250"
          >
            <v-card-title class="ma-0 pa-0 text-break">Изображение партии</v-card-title>
          </v-img>
          <v-text-field label="Название" placeholder="Новая партия" filled rounded clearable></v-text-field>
          <v-row>
            <!-- Date picker -->
            <v-col cols="12" xs="12" sm="6" lg="6">
              <v-dialog
                ref="dialog"
                v-model="dateModal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Дата мероприятия"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable locale="ru-ru">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateModal = false">Отмена</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <!-- Time picker -->
            <v-col cols="12" xs="12" sm="6" lg="6">
              <v-dialog
                ref="dialog"
                v-model="timeModal"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="Время мероприятия"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeModal"
                  v-model="time"
                  full-width
                  ampm-in-title
                  locale="ru-ru"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="timeModal = false">Отмена</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="6">
          <v-textarea
            v-model="description"
            auto-grow
            filled
            rounded
            clearable
            color="deep-purple"
            label="Описание"
            rows="1"
          ></v-textarea>
          <v-col cols="12" xs="12" sm="6" lg="6">
            <v-switch v-model="invites" inset label="Только по приглашениям"></v-switch>
          </v-col>
          <v-col cols="12">
            <v-subheader class="mb-6 mt-0 pl-0 mx-4">Максимальное количество игроков</v-subheader>
            <v-slider class="mx-1" v-model="maxPlayers" thumb-label="always" th max="20" min="2"></v-slider>
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn to="/admin">Создать партию</v-btn>
          <v-btn>Отмена</v-btn>
        </v-card-actions>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "new-game",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toISOString().substr(11, 5),
      menu: false,
      dateModal: false,
      timeModal: false,
      invites: false,
      maxPlayers: 6,
      description: ""
    };
  }
};
</script>

<style lang="css">
.new-game--image {
  border-radius: 28px;
  display: inline-block;
  cursor: pointer;
  font-size: 17px;
  padding: 14px 60px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
}
.new-game--image:hover {
  background-color: transparent;
}
.new-game--image:active {
  position: relative;
  transform: scale(0.9);
}
</style>