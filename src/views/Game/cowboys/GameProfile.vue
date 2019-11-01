<template>
  <v-container fluid>
    <v-row class="mt-5">
      <v-col sm="12" md="6">
        <v-card outlined height="100%" min-height="200px">
          <v-list-item three-line>
            <v-list-item-avatar tile left size="150" color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 text-uppercase">Сырный пидор</v-list-item-title>
              <div class="text-uppercase">санчес</div>
              <v-row
                class="headline ml-0 mb-1 mr-2 align-center align-content-center text-uppercase"
              >
                <v-col cols="12">
                  <v-icon color="success">mdi-progress-upload</v-icon>уровень:
                  <strong class="mr-2">15</strong>
                  <v-btn icon color="teal" dark>
                    <v-icon>mdi-arrow-up-bold</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-row align="center" justify="center">
                    <p class="text-uppercase">
                      <strong>опыт</strong> 100/100
                    </p>
                    <v-progress-linear value="20" height="10"></v-progress-linear>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card outlined dark height="100%" min-height="200px">
          <v-list-item>
            <v-icon size="45" class="mr-1">mdi-flash-circle</v-icon>
            <v-list-item-content>
              <v-list-item-title class="headline">Основные сведения</v-list-item-title>
              <v-list-item-subtitle>персонажа</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="headline">
            <v-row class="ma-1">
              <v-col align-self="center" cols="12">
                <v-row class="my-2">
                  <v-icon size="35" class="mr-3">mdi-cash-multiple</v-icon>
                  <v-chip label>10000,25</v-chip>
                  <v-icon size="35" class="mr-1">mdi-currency-usd</v-icon>
                </v-row>
                <v-row>
                  <img
                    class="align-self-center mr-3"
                    height="35"
                    src="../../../assets/icons/wanted.svg"
                  />
                  <v-chip color="red lighten-2" label>10000,25</v-chip>
                  <v-icon size="35" class="mr-1">mdi-currency-usd</v-icon>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row class="ma-0">
      <v-container flex fluid>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <div class="text-uppercase headline mb-3">Перки и навыки</div>
            <v-card>
              <v-card-title primary-title>Уже куплено</v-card-title>
              <v-data-table
                :headers="headers"
                :items="selected"
                hide-default-footer
                class="elevation-1 mb-5"
              ></v-data-table>
            </v-card>

            <v-card>
              <v-card-title>
                Перки
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-card-search"
                  label="Поиск"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="perks"
                :search="search"
                item-key="name"
                show-select
              ></v-data-table>
            </v-card>
          </v-col>
          <v-divider vertical class="mx-3 hidden-sm-and-down"></v-divider>
          <v-divider class="mx-3 hidden-md-and-up"></v-divider>
          <v-col cols="12" sm="12" md="5">
            <div class="text-uppercase headline mb-3">одежда и эффекты</div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "game-profile",
  computed: {},
  data() {
    return {
      search: "",
      selected: [],
      headers: [
        {
          text: "Перк",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Описание",
          value: "description",
          sortable: false
        },
        {
          text: "Cтоимость",
          value: "cost",
          align: "right"
        }
      ],
      acquiredperks: [],
      perks: [
        {
          name: "ЕЗДА ВЕРХОМ",
          description: "Позволяет оседлать лошадь",
          cost: "60",
          ispositive: "1"
        },
        {
          name: "СТРЕЛЬБА НА БЕГУ",
          description: "Штраф к точности при перемещении? Забудьте про него!",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "ВЛАДЕНИЕ ОРУЖИЕМ",
          description:
            "Чтобы стрелять - держи пушку крепко и жми на курок. Удачи, солдат!",
          cost: "60",
          ispositive: "1"
        },
        {
          name: "ТРОЙНОЙ ВЫСТРЕЛ",
          description:
            "Позволяет провести два выстрела подряд с точностью =15. Если хотя \r\nбы два патрона попадают в цель – критический выстрел и мгновенная \r\nсмерть.",
          cost: "70",
          ispositive: "1"
        },
        {
          name: "БРОСОК ЛАССО",
          description:
            "Вы можете обездвижить персонажа, накинув на него лассо (точность) до тех пор, пока его не освободят. Можно подтянуть обездвиженного к себе (ваша скорость+2 за действие)",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "БАНДИТ",
          description:
            "Езда верхом, Зоркость +2, Точность -20, револьвер, Харизма -30.",
          cost: "70",
          ispositive: "1"
        },
        {
          name: "ЖАРЕНЫМ ЗАПАХЛО",
          description:
            "Вы всегда чувствуете, если окружающие настроены к вам негативно.",
          cost: "70",
          ispositive: "1"
        },
        {
          name: "ШЕРИФ",
          description: "Вы нашли значок шерифа и револьвер",
          cost: "40",
          ispositive: "1"
        },
        {
          name: "ПОВАР",
          description:
            "Можете готовить полноценную еду из всего подряд и даже в чистом поле",
          cost: "40",
          ispositive: "1"
        },
        {
          name: "МОРЯК",
          description:
            "Вы отлично умеете вязать узлы, ваше эмоциональное равновесие получает +25, точность +10, проворность +1",
          cost: "70",
          ispositive: "1"
        },
        {
          name: "ШУСТРЫЙ",
          description: "Сила -10, инициатива +5, проворность +2",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "АТЛЕТ",
          description: "Сила +30, инициатива +1, проворность +1",
          cost: "80",
          ispositive: "1"
        },
        {
          name: "КАДРИЛА",
          description: "Харизма +30, инициатива +1",
          cost: "60",
          ispositive: "1"
        },
        {
          name: "КОВБОЙ",
          description:
            "Бросок лассо, езда верхом, револьвер, +2 инициативы, +1 проворность, +10 силы",
          cost: "100",
          ispositive: "1"
        },
        {
          name: "ТЕХАСЕЦ",
          description:
            "20 к точности, перезарядка не является действием, 2 револьвера, стрельба с 2 рук.",
          cost: "140",
          ispositive: "1"
        },
        {
          name: "КАРТЕЖНИК",
          description: "При игре в карты ваш бонус +10 к кубу D20",
          cost: "40",
          ispositive: "1"
        },
        {
          name: "ВОРИШКА",
          description: "При воровстве +10 к кубу D20",
          cost: "40",
          ispositive: "1"
        },
        {
          name: "ТИШАЙШИЙ",
          description: "Вас не замечают, пока вы не совершите действие",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "OLLA!",
          description: "Вы мексиканец. В вашем рюкзаке лежит 5 бурито",
          cost: "10",
          ispositive: "1"
        },
        {
          name: "БЫВШИЙ ПИВОВАР",
          description: "Способен сварить любое бухлище из любого говна",
          cost: "40",
          ispositive: "1"
        },
        {
          name: "АВАНТЮРИСТ",
          description: "за привал + 20 эмоц.равновесия",
          cost: "60",
          ispositive: "1"
        },
        {
          name: "БЫВШИЙ СОЛДАТ",
          description: "X2 к уменьшению ЭР за урон",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "ПЛОВЕЦ",
          description: "Вы отлично плаваете",
          cost: "30",
          ispositive: "1"
        },
        {
          name: "ПОЛЕВОЙ МЕДИК",
          description: "Вы можете решить последствия перестрелки малой кровью",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "СОБИРАТЕЛЬ",
          description: "Вы отлично разбираетесь в травах",
          cost: "30",
          ispositive: "1"
        },
        {
          name: "ОРУЖЕЙНИК",
          description: "Вы способны создавать сложное оружие",
          cost: "50",
          ispositive: "1"
        },
        {
          name: "ПОДМАСТЕРЬЕ ОРУЖЕЙНИКА",
          description: "Вы способны создавать простое оружие",
          cost: "35",
          ispositive: "1"
        },
        {
          name: "УКРОТИТЕЛЬ",
          description:
            "Можете приманить животных и приручить, за каждое (разное) прирученное животное +1 к проворности",
          cost: "100",
          ispositive: "1"
        },
        {
          name: "ОРУЖЕЙНЫЙ МАСТЕР",
          description: "Может создавать любое оружие",
          ispositive: "0"
        },
        {
          name: "УРОД",
          description: "Вы урод. Харизма = 0",
          cost: "-100",
          ispositive: "0"
        },
        {
          name: "ТАК СЕБЕ ПЛОВЕЦ",
          description: "Вы не умеете плавать",
          cost: "-30",
          ispositive: "0"
        },
        {
          name: "ЖИРНЫЙ",
          description: "Сила -10, проворность -1, скорость -1",
          cost: "-50",
          ispositive: "0"
        },
        {
          name: "МЕДЛИТЕЛЬНЫЙ СТРЕЛОК",
          description: "Перезарядка стоит 2х очков действия",
          cost: "-30",
          ispositive: "0"
        },
        {
          name: "ССЫКЛО",
          description: "Инициатива = 1.",
          cost: "-30",
          ispositive: "0"
        },
        {
          name: "КРИВОРУКИЙ\r\nСТРЕЛОК",
          description: "Точность стрельбы на 20 меньше",
          cost: "-40",
          ispositive: "0"
        },
        {
          name: "НЕУМЕЛЫЙ ВОР",
          description: "Вы не можете воровать",
          cost: "-15",
          ispositive: "0"
        },
        {
          name: "УТОНЧЕННАЯ НАТУРА",
          description:
            "Вы не можете питаться чем попало (только полноценные блюда)",
          cost: "40",
          ispositive: "1"
        },
        {
          name: "НАРКОМАН",
          description: "вам требуются препараты",
          cost: "-15",
          ispositive: "0"
        },
        {
          name: "ЗАВСЕГДАТАЙ\r\nСАЛУНА",
          description:
            "Переодически у вас жесткий отходняк\r\n(в момент отходняка статы становятся начальными) (отходняк раз в 2 хода)",
          cost: "-100",
          ispositive: "0"
        },
        {
          name: "МАМЕНЬКИН СЫНОК",
          description: "Эмоц равновесие максимальное - 15",
          cost: "-35",
          ispositive: "0"
        },
        {
          name: "ПЛОХОЙ НАЕЗДНИК",
          description: "Возможна езда пассажиром",
          cost: "-30",
          ispositive: "0"
        },
        {
          name: "ОТ БЕДРА",
          description:
            "Нет возможности вести прицельную стрельбу ( точность всегда 40)",
          cost: "-80",
          ispositive: "0"
        },
        {
          name: "НИК ВУЙЧИЧ",
          description:
            "У вас отсутствуют верхние конечности ниже локтя\r\n(всё как бы валится из рук)",
          cost: "-300",
          ispositive: "0"
        },
        {
          name: "ИСТЕРИЧКА",
          description: "Коф.минуса эмоционального равновесия X2",
          cost: "-60",
          ispositive: "0"
        },
        {
          name: "ОСТРАЯ РАПИРА\r\n",
          description: "вы отлично справляетесь с холодным оружием!",
          cost: "100",
          ispositive: "1"
        }
      ]
    };
  }
};
</script>

<style lang="css" scoped>
</style>