<template>
    <v-container>
        <v-card>
            <v-btn
                    block
                    depressed
                    :color="isEdit ? 'blue' : 'green'"
                    @click="isEdit = !isEdit"
            >{{ isEdit ? 'Изменить' : 'Сохранить' }}
            </v-btn>
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-list-item>
                        <v-list-item-avatar tile size="150" color="grey"/>
                        <v-list-item-content>
                            <v-text-field dense label="Имя персонажа" :disabled="isEdit" v-model="player.name"/>
                            <v-select :value="player.sex" :items="['Муж.', 'Жен.' ]" :disabled="isEdit" dense label="Пол персонажа"/>
                            <v-select
                                    :value="player.race"
                                    :items="['Человек', 'Эльф','Орк','Пидор','Норд' ]"
                                    :disabled="isEdit"
                                    dense
                                    label="Раса"
                            />
                            <v-list-item-title class="text-uppercase subtitle-2">уровень: {{player.level}}
                            </v-list-item-title>
                            <v-progress-linear value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >опыт: {{player.exp}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-list-item-content>
                    </v-list-item>

                    <v-row class="mx-2">
                        <v-col>
                            <v-progress-linear color="green darken-4" value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >ОЗ: {{player.health}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-col>
                        <v-col>
                            <v-progress-linear color="blue darken-4" value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >ОМ: {{player.magica}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-col>
                        <v-col>
                            <v-progress-linear color="brown darken-4" value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >ОД: {{player.action}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-col>
                    </v-row>
                    <v-card class="mx-3" outlined>
                        <v-card-title>
                            Инвентарь
                            <v-spacer/>
                            <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Поиск"
                                    single-line
                                    hide-details
                            />
                        </v-card-title>
                        <v-data-table
                                @click="invent = true"
                                show-select
                                v-model="player.perks"
                                :headers="headers"
                                :items="gameData.perks"
                                :search="search"
                        />
                    </v-card>
                    <v-dialog v-model="invent" width="1000"/>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                    <v-list-item-title class="text-center body-1">Перки и способности</v-list-item-title>
                    <v-list-item dense class="my-0 py-0" v-for="stat in player.stats" :key="stat.name">
                        <v-list-item-content class="my-0 py-0">
                            <v-col cols="5" class="my-0 py-0">
                                <v-list-item-title>{{stat.name}}</v-list-item-title>
                            </v-col>
                            <v-col cols="6" class="my-0 py-0">
                                <v-card-actions>
                                    <v-btn icon>
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                    <v-list-item-title class="text-center">{{stat.value}}</v-list-item-title>
                                    <v-btn icon>
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions class="mx-3"/>

                    <v-row class="mx-1 my-0">
                        <v-col class="ma-0" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="blue-grey darken-1" dark label>
                                <v-icon left>mdi-shield-plus</v-icon>
                                Класс брони
                                <v-avatar right class>{{player.armorDef}}</v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col class="ma-0" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="blue darken-1" dark label>
                                <v-icon left>mdi-star</v-icon>
                                Сопр. магии
                                <v-avatar right class>1</v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col align-self="center" class="ma-0" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="red darken-4" dark label>
                                <v-icon left>mdi-flash</v-icon>
                                Сопр. стихиям
                                <v-avatar right class>1</v-avatar>
                            </v-chip>
                        </v-col>
                    </v-row>

                    <v-card class="mx-3" outlined>
                        <v-card-title>
                            Перки
                            <v-spacer/>
                            <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Поиск"
                                    single-line
                                    hide-details
                            />
                        </v-card-title>
                        <v-data-table
                                show-select
                                :v-model="player.perks"
                                :headers="headers"
                                :items="gameData.perks"
                                :search="search"
                        />
                    </v-card>
                </v-col>
            </v-row>
            <v-divider/>
            <v-row style="height:300px"/>
            <v-row class="ma-0"/>
        </v-card>
    </v-container>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "player-profile",
        computed: {},
        data() {
            return {
                invent: false,
                isEdit: false,
                player: {
                    name: "Сырный пидор",
                    race: "",
                    sex: "",
                    hp: 150,
                    avatar: "",
                    level: 15,
                    exp: 12000,
                    stats: [
                        {name: "СИЛА", value: 15},
                        {name: "ЛОВКОСТЬ", value: 10},
                        {name: "ИНТЕЛЛЕКТ", value: 20},
                        {name: "ВЫНОСЛИВОСТЬ", value: 35},
                        {name: "ХАРИЗМА", value: 11},
                        {name: "УДАЧА", value: 12},
                        {name: "ВОСПРИЯТИЕ", value: 55}
                    ],
                    inventory: {},
                    equipment: {},
                    perks: []
                },
                gameData: {
                    items: {},
                    stats: [
                        "СИЛА",
                        "ЛОВКОСТЬ",
                        "ИНТЕЛЛЕКТ",
                        "ВЫНОСЛИВОСТЬ",
                        "ХАРИЗМА",
                        "УДАЧА",
                        "ВОСПРИЯТИЕ"
                    ],
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
                            description:
                                "Вы можете решить последствия перестрелки малой кровью",
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
                },
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
                ]
            };
        },
        created() {
            let profileID = this.$route.params.id;
            if (profileID) {
                firebase.firestore().collection('playerProfiles').doc(profileID).onSnapshot((doc) => {
                    this.player = doc.data();
                });
                firebase.firestore().collection('gamerules').doc('main').onSnapshot((doc) => {
                    this.gameData = doc.data();
                });
            }
        }
    };
</script>

<style lang="css" scoped>
</style>