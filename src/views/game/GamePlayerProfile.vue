<template>
    <v-container>
        <v-card>
            <v-btn :loading="isEdit"
                   block
                   depressed
                   color="green"
                   @click="saveProfile()"
            >Принудительное сохранение
            </v-btn>
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-list-item-title class="text-center body-1">Информация о персонаже</v-list-item-title>
                    <v-list-item>
                        <v-list-item-content>
                            <v-card outlined min-height="30" class="pa-1">
                                <v-card-actions>
                                    <v-text-field dense label="Имя персонажа" :disabled="isEdit" v-model="player.name"/>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-select :value="player.sex" :items="['Муж.', 'Жен.' ]" :disabled="isEdit" dense
                                              label="Пол персонажа"/>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-select
                                            v-model="player.race"
                                            :items="gameData.races"
                                            :item-value="gameData.races"
                                            item-text="name"
                                            return-object
                                            :disabled="isEdit"
                                            dense
                                            label="Раса"/>
                                    <v-spacer/>
                                    <v-btn @click="showRaceDescription = !showRaceDescription" class="ma-0 pa-0" icon>
                                        <v-icon>
                                            {{showRaceDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                        </v-icon>
                                    </v-btn>
                                </v-card-actions>

                                <v-row v-show="showRaceDescription">
                                    <v-col cols="12" md="6">
                                        <v-card-subtitle>Описание</v-card-subtitle>
                                        <v-card-text>{{player.race.description}}</v-card-text>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-card-subtitle>Базовые характеристики</v-card-subtitle>
                                        <v-card-text class="my-0 py-0">Сила: {{player.race.Strength}}</v-card-text>
                                        <v-card-text class="my-0 py-0">Восприятие: {{player.race.Perception}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Выносливость: {{player.race.Endurance}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Харизма: {{player.race.Charisma}}</v-card-text>
                                        <v-card-text class="my-0 py-0">Интеллект: {{player.race.Intelligence}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Ловкость: {{player.race.Agility}}</v-card-text>
                                        <v-card-text class="my-0 py-0">Удача: {{player.race.Luck}}</v-card-text>
                                        <v-divider/>
                                        <v-card-text v-show="player.race.MagicDamage > 0" class="my-0 py-0">Маг. урон
                                            (доп.): {{player.race.MagicDamage}}
                                        </v-card-text>
                                        <v-card-text v-show="player.race.MagicDef > 0" class="my-0 py-0">Маг. защита
                                            (доп.): {{player.race.MagicDef}}
                                        </v-card-text>
                                        <v-card-text v-show="player.race.MeleeDamage > 0" class="my-0 py-0">Физ. урон
                                            (доп.): {{player.race.MeleeDamage}}
                                        </v-card-text>
                                        <v-card-text v-show="player.race.PhysicDef > 0" class="my-0 py-0">Маг. защита
                                            (доп.): {{player.race.PhysicDef}}
                                        </v-card-text>
                                        <v-card-text v-show="player.race.RangeDamage > 0" class="my-0 py-0">Дальн. урон
                                            (доп.): {{player.race.RangeDamage}}
                                        </v-card-text>
                                        <v-card-text v-show="player.race.ElementsDef > 0" class="my-0 py-0">Сопр. стииям
                                            (доп.): {{player.race.ElementsDef}}
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-list-item-content>
                    </v-list-item>
                    <!--Admin panel?-->
                    <div>
                        <v-list-item>
                            <v-text-field
                                    v-model="giveXpCount"
                                    label="Выдать опыт"
                                    outlined
                                    clearable
                                    color="green"
                                    append-icon="mdi-plus"
                                    @click:append="giveXP(giveXpCount)"
                                    type="number"
                            />
                        </v-list-item>
                        <v-list-item>
                            <v-text-field
                                    v-model="giveMoneyCount"
                                    label="Выдать денег"
                                    outlined
                                    clearable
                                    color="green"
                                    append-icon="mdi-plus"
                                    @click:append="giveMoney(giveMoneyCount)"
                                    type="number"
                            />
                        </v-list-item>
                    </div>
                    <v-list-item>
                        <v-list-item-subtitle class="body-1">
                            <v-icon>mdi-circle-expand</v-icon>
                            {{player.points}}
                        </v-list-item-subtitle>
                        <v-btn text :disabled="!(player.exp >= result_xp)" @click="levelUp()">
                            Уровень {{player.level}}
                            <v-icon right>
                                mdi-arrow-up-bold
                            </v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-progress-linear :value="(player.exp/result_xp) * 100" height="25" dark>
                            ОПЫТ {{player.exp}}/{{result_xp}}
                        </v-progress-linear>
                    </v-list-item>
                    <v-list-item>
                        <v-progress-linear color="green darken-4" value="20" height="25" dark>
                            ЗДОРОВЬЕ {{player.health}}/ {{player.level*1000}}
                        </v-progress-linear>
                    </v-list-item>
                    <v-list-item>
                        <v-progress-linear color="blue darken-4" value="20" height="25" dark>
                            МАГИЯ: {{player.magica}}/ {{player.level*1000}}
                        </v-progress-linear>
                    </v-list-item>
                    <v-list-item>
                        <v-progress-linear color="brown" value="20" height="25" dark>
                            ДЕЙСТВИЯ: {{player.action}}/{{player.level*1000}}
                        </v-progress-linear>
                    </v-list-item>

                    <!--Defences-->
                    <v-list-item>
                        <v-icon left>mdi-shield-plus</v-icon>
                        <v-list-item-title>Класс брони</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.PhysicDef}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-icon left>mdi-star</v-icon>
                        <v-list-item-title>Сопр. магии</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.MagicDef}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-icon left>mdi-flash</v-icon>
                        <v-list-item-title>Сопр. стихиям</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.ElementsDef}}</v-list-item-title>
                    </v-list-item>

                    <v-divider/>

                    <v-list-item>
                        <v-icon left>mdi-sword-cross</v-icon>
                        <v-list-item-title>Урон (Ближн. оружие)</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.MeleeDamage}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-icon left>mdi-auto-fix</v-icon>
                        <v-list-item-title>Урон (Магия)</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.MagicDamage}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-icon left>mdi-bullseye-arrow</v-icon>
                        <v-list-item-title>Урон (Дальн. оружие)</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.RangeDamage}}</v-list-item-title>
                    </v-list-item>

                    <!--Inventory-->
                    <v-card class="mx-0" flat>
                        <v-card-title>
                            <v-icon left>mdi-bag-personal</v-icon>
                            Инвентарь
                        </v-card-title>
                        <v-card-subtitle>Золото {{this.player.gold}}
                            <v-icon color="#FFD700" right>mdi-coins</v-icon>
                        </v-card-subtitle>
                        <v-item-group>
                            <v-container>
                                <v-row dense>
                                    <v-col cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card class="pa-3" :color="newItem.quality.color"
                                                    :dark="!!newItem.quality.color">
                                                <v-card-title class="headline">Добавить предмет
                                                </v-card-title>
                                                <v-select v-model="newItem.quality" item-text="name"
                                                          label="Качество предмета"
                                                          :items="gameData.qualities" return-object/>
                                                <v-text-field v-model="newItem.count" type="number"
                                                              label="Количество"/>
                                                <v-autocomplete v-model="newItem.item"
                                                                :items="gameData.items" item-text="name"
                                                                return-object label="Предмет"/>
                                                <v-card-actions>
                                                    <v-spacer/>
                                                    <v-btn text @click="addItem()">
                                                        Добавить
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-item>

                                    </v-col>

                                    <v-dialog v-model="deleteDialog" width="500">
                                        <v-card>
                                            <v-card-title class="headline grey lighten-2"
                                                          primary-title>
                                                Выкинуть {{itemToDelete.name}}?
                                            </v-card-title>
                                            <v-card-text>

                                            </v-card-text>
                                            <v-card flat class="px-6">
                                                <v-subheader class="pl-0">Количество</v-subheader>
                                                <v-slider v-model="countToDelete"
                                                          color="red"
                                                          :min="1"
                                                          :max="itemToDelete.count"
                                                          thumb-color="red"
                                                          track-color="grey"
                                                          thumb-label="always"/>
                                            </v-card>
                                            <v-divider/>
                                            <v-card-actions>
                                                <v-spacer/>
                                                <v-btn color="primary"
                                                       text
                                                       @click="deleteItem()">
                                                    Выкинуть
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                    <v-col :v-if="player.items && player.items.length>0"
                                           v-for="item in (player.items || [])"
                                           :key="item.name"
                                           cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <div :style="'box-shadow: -5px 0px 0px 0px ' +item.quality.color+';'">
                                                <v-card tile @click="toggle">
                                                    <v-card-title>
                                                        <v-icon left>mdi-cube</v-icon>
                                                        {{item.name}}
                                                        <v-spacer/>
                                                        <v-chip color="green"
                                                                outlined>
                                                            X{{item.count}}
                                                        </v-chip>
                                                        <v-btn icon @click="sellItem(item)">
                                                            <v-icon>mdi-currency-usd</v-icon>
                                                        </v-btn>
                                                        <v-btn icon @click="item.weared = !item.weared">
                                                            <v-icon :color="item.weared ? 'green' : 'grey'">{{item.weared ? 'mdi-tshirt-crew'
                                                                :'mdi-tshirt-crew-outline' }}
                                                            </v-icon>
                                                        </v-btn>
                                                        <v-btn icon color="red" @click="deleteItemClick(item)">
                                                            <v-icon>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </v-card-title>

                                                    <v-card-subtitle class="pb-0">{{item.type}},
                                                        {{item.quality.name}}
                                                        <v-spacer/>
                                                        {{item.cost * item.quality.modificator}}
                                                        <v-icon color="#FFD700" right>mdi-coins</v-icon>
                                                    </v-card-subtitle>
                                                    <v-card-subtitle v-if="item.uses > 0"
                                                                     class="py-0 my-0">Использований {{item.uses}}
                                                    </v-card-subtitle>
                                                    <v-card-subtitle v-if="item.range >0" class="py-0 my-0">
                                                        Дальность {{item.range}}
                                                    </v-card-subtitle>
                                                    <v-chip-group column dark active-class="dark" class="mx-1 px-0">
                                                        <v-chip :color="randDarkColor()"
                                                                v-if="item.MeleeDamage > 0">
                                                            Урон (физич.)
                                                            <v-avatar right>{{item.MeleeDamage}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()"
                                                                v-if="item.MagicDamage > 0">
                                                            Урон (магич.)
                                                            <v-avatar right>{{item.MagicDamage}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()"
                                                                v-if="item.RangeDamage > 0">
                                                            Урон (дальн.)
                                                            <v-avatar right>{{item.RangeDamage}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.PhysicDef > 0">
                                                            Защита (физич.)
                                                            <v-avatar right>{{item.PhysicDef}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.MagicDef > 0">
                                                            Защита (магич.)
                                                            <v-avatar right>{{item.MagicDef}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()"
                                                                v-if="item.ElementsDef > 0">
                                                            Защита (стихии)
                                                            <v-avatar right>{{item.ElementsDef}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.Strength > 0">
                                                            Сила
                                                            <v-avatar right>{{item.Strength}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()"
                                                                v-if="item.Perception > 0">
                                                            Восприятие
                                                            <v-avatar right>{{item.Perception}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.Endurance > 0">
                                                            Выносливость
                                                            <v-avatar right>{{item.Endurance}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.Charisma > 0">
                                                            Харизма
                                                            <v-avatar right>{{item.Charisma}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()"
                                                                v-if="item.Intelligence > 0">
                                                            Интеллект
                                                            <v-avatar right>{{item.Intelligence}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.Agility > 0">
                                                            Ловкость
                                                            <v-avatar right>{{item.Agility}}</v-avatar>
                                                        </v-chip>
                                                        <v-chip :color="randDarkColor()" v-if="item.Luck > 0">Удача
                                                            <v-avatar right>{{item.Luck}}</v-avatar>
                                                        </v-chip>
                                                    </v-chip-group>
                                                </v-card>
                                            </div>
                                        </v-item>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-item-group>
                        <v-dialog v-model="addItemDialog" width="1000"/>
                    </v-card>
                </v-col>

                <v-col xs="12" sm="12" md="6">
                    <v-list-item-title class="text-center body-1">Перки и способности</v-list-item-title>
                    <v-list-item-subtitle class="ml-4">Стоимость 25 очков</v-list-item-subtitle>

                    <v-list-item>
                        <v-list-item-title>Сила</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Strength}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Strength}})
                        </v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Strength ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Восприятие</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Perception}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Perception}})
                        </v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Perception ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Выносливость</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Endurance}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Endurance}})
                        </v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Endurance ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Харизма</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Charisma}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Charisma}})
                        </v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Charisma ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Интеллект</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Intelligence}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Intelligence}})
                        </v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Intelligence ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Ловкость</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Agility}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Agility}})</v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Agility ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Удача</v-list-item-title>
                        <v-list-item-title class="text-center">{{result_stats.Luck}}</v-list-item-title>
                        <v-list-item-title class="green--text text-left ">({{player.stats.Luck}})</v-list-item-title>
                        <v-btn icon :disabled="player.points < 25"
                               @click="(player.stats.Luck ++) && (player.points-=25) && updateStats()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-card-actions class="mx-3"/>
                    <!--Perks-->
                    <v-card class="mx-0" flat min-height="50">
                        <v-card-title>
                            <v-icon left>mdi-baseball-bat</v-icon>
                            Перки
                            <v-spacer/>
                            <v-btn @click="showPerksBlock = !showPerksBlock" class="ma-0 pa-0" icon>
                                <v-icon>
                                    {{showPerksBlock ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                </v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-item-group v-show="showPerksBlock">
                            <v-container fluid class="mx-0 px-0">
                                <v-card-title>
                                    Выбрать перк
                                    <v-spacer/>
                                    <v-icon>mdi-circle-expand</v-icon>
                                    {{player.points}}
                                </v-card-title>
                                <v-row dense>
                                    <v-container>
                                        <v-row dense>
                                            <v-col cols="12" v-for="perk in sortedPerks" :key="perk.name">
                                                <v-card tile>
                                                    <div :class="perkAcquired(perk) && 'perk--selected'">
                                                        <v-card-title>{{perk.name}}
                                                            <v-spacer/>
                                                            <v-icon v-if="!perkAcquired(perk)">mdi-circle-expand
                                                            </v-icon>
                                                            {{perkAcquired(perk) ? '' : perk.cost}}
                                                            <v-btn class="ml-2" x-large icon v-if="!perkAcquired(perk)"
                                                                   :disabled="player.points < perk.cost"
                                                                   @click="buyPerk(perk)">
                                                                <v-icon light x-large>
                                                                    mdi-plus
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-card-title>
                                                        <v-card-subtitle>{{perk.description}}</v-card-subtitle>

                                                        <v-chip-group dark active-class="dark" class="mx-1 px-0">
                                                            <v-chip :color="randDarkColor()"
                                                                    v-if="perk.MeleeDamage > 0">
                                                                Урон
                                                                (физич.)
                                                                <v-avatar right>{{perk.MeleeDamage}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()"
                                                                    v-if="perk.MagicDamage > 0">
                                                                Урон
                                                                (магич.)
                                                                <v-avatar right>{{perk.MagicDamage}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()"
                                                                    v-if="perk.RangeDamage > 0">
                                                                Урон
                                                                (дальн.)
                                                                <v-avatar right>{{perk.RangeDamage}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.PhysicDef > 0">
                                                                Защита
                                                                (физич.)
                                                                <v-avatar right>{{perk.PhysicDef}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.MagicDef > 0">
                                                                Защита
                                                                (магич.)
                                                                <v-avatar right>{{perk.MagicDef}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()"
                                                                    v-if="perk.ElementsDef > 0">
                                                                Защита
                                                                (стихии)
                                                                <v-avatar right>{{perk.ElementsDef}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.Strength > 0">
                                                                Сила
                                                                <v-avatar right>{{perk.Strength}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.Perception > 0">
                                                                Восприятие
                                                                <v-avatar right>{{perk.Perception}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.Endurance > 0">
                                                                Выносливость
                                                                <v-avatar right>{{perk.Endurance}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.Charisma > 0">
                                                                Харизма
                                                                <v-avatar right>{{perk.Charisma}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()"
                                                                    v-if="perk.Intelligence > 0">
                                                                Интеллект
                                                                <v-avatar right>{{perk.Intelligence}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.Agility > 0">
                                                                Ловкость
                                                                <v-avatar right>{{perk.Agility}}</v-avatar>
                                                            </v-chip>
                                                            <v-chip :color="randDarkColor()" v-if="perk.Luck > 0">Удача
                                                                <v-avatar right>{{perk.Luck}}</v-avatar>
                                                            </v-chip>
                                                        </v-chip-group>
                                                    </div>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-row>
                            </v-container>
                        </v-item-group>
                        <v-dialog v-model="addItemDialog" width="1000"/>
                    </v-card>
                </v-col>
            </v-row>
            <v-row style="height:300px"/>
            <v-row class="ma-0"/>
        </v-card>
    </v-container>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "player-profile",
        data() {
            return {
                addItemDialog: false,
                isEdit: false,
                player: {},
                gameData: {},
                showRaceDescription: false,
                newItem: {
                    item: {},
                    quality: {},
                    weared: false,
                    count: 1
                },
                profileRef: "",
                giveXpCount: 100,
                giveMoneyCount: 100,
                showPerksBlock: true,
                countToDelete: 1,
                itemToDelete: {},
                deleteDialog: false
            };
        },
        computed: {
            result_stats() {
                let p = this.player;
                let MeleeDamageSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.MeleeDamage;
                }, 0);
                let MagicDamageSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.MagicDamage;
                }, 0);
                let RangeDamageSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.RangeDamage;
                }, 0);
                let PhysicDefSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.PhysicDef;
                }, 0);
                let MagicDefSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.MagicDef;
                }, 0);
                let ElementsDefSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.ElementsDef;
                }, 0);
                let StrengthSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Strength;
                }, 0);
                let PerceptionSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Perception;
                }, 0);
                let EnduranceSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Endurance;
                }, 0);
                let CharismaSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Charisma;
                }, 0);
                let IntelligenceSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Intelligence;
                }, 0);
                let AgilitySum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Agility;
                }, 0);
                let LuckSum = p.items.filter(i => i.weared).reduce((sum, current) => {
                    return sum + +current.item.Luck;
                }, 0);

                let MeleeDamagePerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.MeleeDamage;
                }, 0);
                let MagicDamagePerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.MagicDamage;
                }, 0);
                let RangeDamagePerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.RangeDamage;
                }, 0);
                let PhysicDefPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.PhysicDef;
                }, 0);
                let MagicDefPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.MagicDef;
                }, 0);
                let ElementsDefPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.ElementsDef;
                }, 0);
                let StrengthPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Strength;
                }, 0);
                let PerceptionPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Perception;
                }, 0);
                let EndurancePerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Endurance;
                }, 0);
                let CharismaPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Charisma;
                }, 0);
                let IntelligencePerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Intelligence;
                }, 0);
                let AgilityPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Agility;
                }, 0);
                let LuckPerksSum = this.playerPerks.reduce((sum, current) => {
                    return sum + +current.Luck;
                }, 0);
                return new Object({
                    MeleeDamage: p.stats.MeleeDamage + +p.race.MeleeDamage + +MeleeDamageSum + +MeleeDamagePerksSum,
                    MagicDamage: p.stats.MagicDamage + +p.race.MagicDamage + +MagicDamageSum + +MagicDamagePerksSum,
                    RangeDamage: p.stats.RangeDamage + +p.race.RangeDamage + +RangeDamageSum + +RangeDamagePerksSum,
                    PhysicDef: p.stats.PhysicDef + +p.race.PhysicDef + +PhysicDefSum + +PhysicDefPerksSum,
                    MagicDef: p.stats.MagicDef + +p.race.MagicDef + +MagicDefSum + +MagicDefPerksSum,
                    ElementsDef: p.stats.ElementsDef + +p.race.ElementsDef + +ElementsDefSum + +ElementsDefPerksSum,
                    Strength: p.stats.Strength + +p.race.Strength + +StrengthSum + +StrengthPerksSum,
                    Perception: p.stats.Perception + +p.race.Perception + +PerceptionSum + +PerceptionPerksSum,
                    Endurance: p.stats.Endurance + +p.race.Endurance + +EnduranceSum + +EndurancePerksSum,
                    Charisma: p.stats.Charisma + +p.race.Charisma + +CharismaSum + +CharismaPerksSum,
                    Intelligence: p.stats.Intelligence + +p.race.Intelligence + +IntelligenceSum + +IntelligencePerksSum,
                    Agility: p.stats.Agility + +p.race.Agility + +AgilitySum + +AgilityPerksSum,
                    Luck: p.stats.Luck + +p.race.Luck + +LuckSum + +LuckPerksSum,
                });
            },
            result_xp() {
                let p = this.player;
                return Math.pow(p.level, 2) * 200;
            },
            playerPerks() {
                let perks = this.player.perks;
                if (perks && perks.length > 0) {
                    let resPerks = [];
                    this.gameData.perks.forEach(p => {
                        if (this.perkAcquired(p)) {
                            resPerks.push(p);
                        }
                    });
                    return resPerks;
                } else return [];
            },
            sortedPerks() {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                return this.gameData.perks ? this.gameData.perks.sort((x, y) => {
                    return (this.perkAcquired(x) === this.perkAcquired(y)) ? 0 : this.perkAcquired(x) ? -1 : 1;
                }) : [];
            },
            filtredItems() {
                let items = this.player.items;
                let result = items;
                return result;
            }
        },
        methods: {
            addItem() {
                let item = this.newItem;
                if (item.item && item.quality) {
                    item = Object.assign({}, item.item);
                    item.count = this.newItem.count;
                    item.weared = this.newItem.weared;
                    item.quality = this.newItem.quality;
                    let result = [];
                    let cnt = 0;
                    this.player.items.forEach(i => {
                        let a = Object.assign({}, item);
                        let b = Object.assign({}, i);
                        a.count = b.count;
                        if (this.deepEqual(a, b)) {
                            i.count = +i.count + +item.count;
                            if (i.count < 1) {
                                i.count = 1;
                            }
                            cnt++;
                        }
                        result.push(i);
                    });
                    if (cnt === 0) {
                        result.push(item);
                    }
                    this.player.items = result;
                    this.profileRef.update({
                        items: this.player.items
                    }).then(() => {
                    });
                }
            },
            sellItem(item) {
                let gold = this.player.gold + item.item.cost * item.quality.modificator;
                this.player.gold = gold;
                this.deleteItem(item);
                this.profileRef.update({
                    gold: this.player.gold
                });
            },

            deepEqual(a, b) {
                if (a === b) {
                    return true;
                }
                if (a == null || typeof (a) !== 'object' || b == null && typeof (b) !== 'object') {
                    return false;
                }
                var equal = true;
                for (var key in a) {
                    if (typeof (a) === 'object' && typeof (b) === 'object') {
                        if (!a[key] == b[key]) {
                            if (typeof (a) === 'object' && typeof (b) === 'object') {
                                if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
                                    equal = false;
                                }
                            } else equal = false;
                        }
                    } else if (a !== b) {
                        equal = false;
                    }
                }
                return equal;
            },
            deleteItemClick(item) {
                this.itemToDelete = item;
                this.deleteDialog = true;
            },
            deleteItem() {
                if (this.itemToDelete) {
                    const index = this.player.items.indexOf(this.itemToDelete);
                    if (this.countToDelete == this.itemToDelete.count) {
                        this.player.items.splice(index, 1);
                    } else {
                        this.player.items[index].count -= +this.countToDelete
                    }
                    this.profileRef.update({items: this.player.items});
                    this.deleteDialog = false;
                }
            },
            perkAcquired(perk) {
                let filtered = this.player.perks.filter(p => p === perk.id);
                return filtered && filtered.length > 0;
            },
            buyPerk(perk) {
                let player = this.player;
                if (player.points >= perk.cost) {
                    this.isEdit = true;
                    let _this = this;
                    this.player.perks.push(perk.id);
                    this.player.points -= perk.cost;
                    this.profileRef.update({
                        perks: this.player.perks,
                        points: this.player.points
                    }).finally(() => {
                        _this.isEdit = false;
                    });
                }
            },
            randDarkColor() {
                let lum = -0.25;
                let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
                if (hex.length < 6) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                let rgb = "#",
                    c, i;
                for (i = 0; i < 3; i++) {
                    c = parseInt(hex.substr(i * 2, 2), 16);
                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                    rgb += ("00" + c).substr(c.length);
                }
                return rgb;
            },
            saveProfile() {
                this.isEdit = true;
                let _this = this;
                this.profileRef.set(this.player).finally(() => {
                    _this.isEdit = false;
                });
            },
            giveMoney(count) {
                let _this = this;
                this.isEdit = true;
                let newGold = this.player.gold + +count;
                this.player.gold = newGold >= 0 ? this.player.gold + +count : 0;
                this.profileRef.update({
                    gold: this.player.gold
                }).finally(() => {
                    _this.isEdit = false;
                });
            },
            giveXP(count) {
                let _this = this;
                this.isEdit = true;
                this.player.exp = this.player.exp + +count;
                this.profileRef.update({
                    exp: this.player.exp
                }).finally(() => {
                    _this.isEdit = false;
                });
            },
            updateStats() {
                this.isEdit = true;
                let _this = this;
                this.profileRef.update({
                    stats: this.player.stats,
                    points: this.player.points
                }).finally(() => {
                    _this.isEdit = false;
                });
            },
            levelUp() {
                if (this.player.exp >= this.result_xp) {
                    this.player.level++;
                    this.player.points += 50;
                    this.saveProfile();
                } else {
                    return;
                }
            }
        },
        created() {
            let profileID = this.$route.params.id;
            if (profileID) {
                this.profileRef = firebase.firestore().collection('playerProfiles').doc(profileID);
                this.profileRef.onSnapshot((doc) => {
                    this.player = doc.data() || {};
                });
                firebase.firestore().collection('gamerules').doc('main').onSnapshot((doc) => {
                    this.gameData = doc.data() || {};
                });
            }
        }
    };
</script>

<style lang="css" scoped>
    .perk--selected {
        box-shadow: -5px 0px 0px 0px #388e3c;
    }
</style>