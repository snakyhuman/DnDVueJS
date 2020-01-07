<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Типы предметов</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" text v-on="on">Новый предмет</v-btn>
          </template>
          <v-card tile>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field label="Назвние" id="id"></v-text-field>
                <v-text-field label="Модификатор" type="number" id="id"></v-text-field>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
              <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" text>Обновить</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "item-types",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Название",
        align: "left",
        value: "name"
      },
      { text: "Модификатор", value: "modificator" },
      { text: "", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      modificator: 0
    },
    defaultItem: {
      name: "",
      modificator: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Новый предмет" : "Редактирование";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          modificator: 6.0
        },
        {
          name: "Ice cream sandwich",
          modificator: 9.0
        },
        {
          name: "Eclair",
          modificator: 16.0
        },
        {
          name: "Cupcake",
          modificator: 3.7
        },
        {
          name: "Gingerbread",
          modificator: 16.0
        },
        {
          name: "Jelly bean",
          modificator: 0.0
        },
        {
          name: "Lollipop",
          modificator: 0.2
        },
        {
          name: "Honeycomb",
          modificator: 3.2
        },
        {
          name: "Donut",
          modificator: 25.0
        },
        {
          name: "KitKat",
          modificator: 26.0
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Точно удалить?") && this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>