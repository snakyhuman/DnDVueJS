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
                        <v-list-item-subtitle class="body-1">Доступно очков: {{player.points}}</v-list-item-subtitle>
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
                    <v-card class="mx-0" outlined>
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
                                            <v-card class="d-flex align-center"
                                                    outlined
                                                    height="50"
                                                    @click="addItemDialog = !addItemDialog">
                                                <div class=" flex-grow-1 text-center">Добавить</div>
                                            </v-card>
                                        </v-item>
                                        <v-dialog
                                                v-model="addItemDialog"
                                                max-width="500"
                                        >
                                            <v-card :color="newItem.quality.color" dark>
                                                <v-card-title class="headline">Добавить предмет
                                                </v-card-title>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-select v-model="newItem.quality" item-text="name"
                                                                      label="Качество предмета" dark
                                                                      :items="gameData.qualities" return-object/>
                                                            <v-autocomplete v-model="newItem.item"
                                                                            :items="gameData.items" item-text="name"
                                                                            return-object label="Предмет"/>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <v-card-actions>
                                                    <v-btn
                                                            text
                                                            @click="addItemDialog = false"
                                                    >
                                                        Отмена
                                                    </v-btn>
                                                    <v-spacer/>
                                                    <v-btn
                                                            text
                                                            @click="addItem()"
                                                    >
                                                        Добавить
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                    <v-col :v-if="player.items && player.items.length>0"
                                           v-for="item in (player.items || [])"
                                           :key="item.name"
                                           cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card utlined @click="toggle">
                                                <v-toolbar dense dark flat
                                                           :color="item.quality.color">
                                                    <v-icon left>mdi-cube</v-icon>
                                                    <v-toolbar-title>{{item.item.name + ' (' + item.quality.name +
                                                        ')'}}
                                                    </v-toolbar-title>
                                                    <v-spacer/>
                                                    <v-btn icon @click="sellItem(item)">
                                                        <v-icon>mdi-currency-usd</v-icon>
                                                    </v-btn>
                                                    <v-btn icon @click="item.weared = !item.weared">
                                                        <v-icon>{{item.weared ? 'mdi-tshirt-crew'
                                                            :'mdi-tshirt-crew-outline' }}
                                                        </v-icon>
                                                    </v-btn>
                                                    <v-btn icon @click="deleteItem(item)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-toolbar>
                                                <v-row>
                                                    <v-col cols="12" md="6">
                                                        <v-card class="ml-1 mr-5" outlined>
                                                            <v-card-subtitle class="py-0">Цена {{item.item.cost *
                                                                item.quality.modificator}}$
                                                            </v-card-subtitle>
                                                            <v-card-subtitle class="py-0">{{item.item.type}}
                                                            </v-card-subtitle>
                                                            <v-card-subtitle v-if="item.item.uses !== '-1'"
                                                                             class="py-0">Исп. {{item.item.uses}}
                                                            </v-card-subtitle>
                                                            <v-card-subtitle v-if="item.item.range >0" class="py-0">
                                                                Дальн. {{item.item.range}}
                                                            </v-card-subtitle>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <v-card-text v-if="item.item.MeleeDamage > 0">Урон (физич.)
                                                            {{item.item.MeleeDamage}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.MagicDamage > 0">Урон (магич.)
                                                            {{item.item.MagicDamage}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.RangeDamage > 0">Урон (дальн.)
                                                            {{item.item.RangeDamage}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.PhysicDef > 0">Защита (физич.)
                                                            {{item.item.PhysicDef}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.MagicDef > 0">Защита (магич.)
                                                            {{item.item.MagicDef}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.ElementsDef > 0">Защита
                                                            (стихии)
                                                            {{item.item.ElementsDef}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Strength > 0">Сила
                                                            {{item.item.Strength}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Perception > 0">Восприятие
                                                            {{item.item.Perception}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Endurance > 0">Выносливость
                                                            {{item.item.Endurance}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Charisma > 0">Харизма
                                                            {{item.item.Charisma}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Intelligence > 0">Интеллект
                                                            {{item.item.Intelligence}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Agility > 0">Ловкость
                                                            {{item.item.Agility}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Luck > 0">Удача
                                                            {{item.item.Luck}}
                                                        </v-card-text>
                                                    </v-col>
                                                    <v-col v-if="item.item.ammo && item.item.ammo.length > 0"
                                                           cols="12">
                                                        <v-card-subtitle class="py-0">Аммуниция</v-card-subtitle>
                                                        <v-chip-group class="ml-4">
                                                            <v-chip v-for="ammo in item.item.ammo" :key="ammo">
                                                                {{ ammo }}
                                                            </v-chip>
                                                        </v-chip-group>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
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
                    <v-card class="mx-0" outlined min-height="50">
                        <v-card-title>
                            <v-icon left>mdi-baseball-bat</v-icon>
                            Перки
                            <v-spacer/>
                            <v-btn icon @click="selectPerkDialog = !selectPerkDialog">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn @click="showPerksBlock = !showPerksBlock" class="ma-0 pa-0" icon>
                                <v-icon>
                                    {{showPerksBlock ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                </v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-item-group v-show="showPerksBlock">
                            <v-container>
                                <v-row dense>
                                    <v-dialog v-model="selectPerkDialog" max-width="700">
                                        <v-card tile>
                                            <v-card-title class="pt-4">
                                                Выбрать перк
                                                <v-spacer/>
                                                Очков {{player.points}}
                                            </v-card-title>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" v-for="perk in availablePerks" :key="perk.name">
                                                        <v-card>
                                                            <v-card-subtitle>{{perk.name}}</v-card-subtitle>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                            <v-card-actions>
                                                <v-btn text
                                                       @click="selectPerkDialog = false">
                                                    Отмена
                                                </v-btn>
                                                <v-spacer/>
                                                <v-btn text
                                                       @click="addItem()">
                                                    Добавить
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-col :v-if="player.perks && player.perks.length>0"
                                           v-for="perk in (player.perks || [])"
                                           :key="perk.name"
                                           cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card utlined @click="toggle">
                                                <v-row>
                                                    <v-col cols="12" md="6">
                                                        <v-card class="ml-1 mr-5" outlined>
                                                            <v-card-subtitle class="py-0">Цена {{item.item.cost *
                                                                item.quality.modificator}}$
                                                            </v-card-subtitle>
                                                            <v-card-subtitle class="py-0">{{item.item.type}}
                                                            </v-card-subtitle>
                                                            <v-card-subtitle v-if="item.item.uses !== '-1'"
                                                                             class="py-0">Исп. {{item.item.uses}}
                                                            </v-card-subtitle>
                                                            <v-card-subtitle v-if="item.item.range >0" class="py-0">
                                                                Дальн. {{item.item.range}}
                                                            </v-card-subtitle>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <v-card-text v-if="item.item.MeleeDamage > 0">Урон (физич.)
                                                            {{item.item.MeleeDamage}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.MagicDamage > 0">Урон (магич.)
                                                            {{item.item.MagicDamage}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.RangeDamage > 0">Урон (дальн.)
                                                            {{item.item.RangeDamage}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.PhysicDef > 0">Защита (физич.)
                                                            {{item.item.PhysicDef}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.MagicDef > 0">Защита (магич.)
                                                            {{item.item.MagicDef}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.ElementsDef > 0">Защита
                                                            (стихии)
                                                            {{item.item.ElementsDef}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Strength > 0">Сила
                                                            {{item.item.Strength}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Perception > 0">Восприятие
                                                            {{item.item.Perception}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Endurance > 0">Выносливость
                                                            {{item.item.Endurance}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Charisma > 0">Харизма
                                                            {{item.item.Charisma}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Intelligence > 0">Интеллект
                                                            {{item.item.Intelligence}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Agility > 0">Ловкость
                                                            {{item.item.Agility}}
                                                        </v-card-text>
                                                        <v-card-text v-if="item.item.Luck > 0">Удача
                                                            {{item.item.Luck}}
                                                        </v-card-text>
                                                    </v-col>
                                                    <v-col v-if="item.item.ammo && item.item.ammo.length > 0"
                                                           cols="12">
                                                        <v-card-subtitle class="py-0">Аммуниция</v-card-subtitle>
                                                        <v-chip-group class="ml-4">
                                                            <v-chip v-for="ammo in item.item.ammo" :key="ammo">
                                                                {{ ammo }}
                                                            </v-chip>
                                                        </v-chip-group>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-item>
                                    </v-col>
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

                let MeleeDamagePerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.MeleeDamage;
                }, 0);
                let MagicDamagePerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.MagicDamage;
                }, 0);
                let RangeDamagePerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.RangeDamage;
                }, 0);
                let PhysicDefPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.PhysicDef;
                }, 0);
                let MagicDefPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.MagicDef;
                }, 0);
                let ElementsDefPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.ElementsDef;
                }, 0);
                let StrengthPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.Strength;
                }, 0);
                let PerceptionPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.Perception;
                }, 0);
                let EndurancePerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.Endurance;
                }, 0);
                let CharismaPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.Charisma;
                }, 0);
                let IntelligencePerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.Intelligence;
                }, 0);
                let AgilityPerksSum = p.perks.reduce((sum, current) => {
                    return sum + +current.Agility;
                }, 0);
                let LuckPerksSum = p.perks.reduce((sum, current) => {
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
            availablePerks() {
                let perks = this.player.perks;
                if (perks && perks.length > 0 && this.gameData.perks) {
                    let filterItems = this.gameData.perks.filter((perk) => !perks.includes(perk));
                    return filterItems || [];
                } else return this.gameData.perks || [];
            }
        },
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
                selectedPerk: {},
                selectPerkDialog: false
            };
        },
        methods: {
            addItem() {
                let item = this.newItem;
                if (item.item && item.quality) {
                    this.player.items.push(item);
                    let profileID = this.$route.params.id;
                    this.profileRef.update({
                        items: firebase.firestore.FieldValue.arrayUnion(item)
                    }).then(() => {
                        this.addItemDialog = false;
                    });
                } else {
                    this.addItemDialog = false;
                }
            },
            updateItem(item) {
                this.profileRef.update({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }).then(() => {
                    this.addItemDialog = false;
                });
            },
            sellItem(item) {
                let gold = this.player.gold + item.item.cost * item.quality.modificator;
                this.player.gold = gold;
                this.deleteItem(item);
                this.profileRef.update({
                    gold: this.player.gold
                });
            },
            deleteItem(item) {
                const index = this.player.items.indexOf(item);
                confirm("Точно выкинуть?") && this.player.items.splice(index, 1) && this.profileRef.update({
                    items: this.player.items
                })
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
                this.player.points = this.player.points + +count;
                this.profileRef.update({
                    points: this.player.points
                }).finally(() => {
                    _this.isEdit = false;
                });
            },
            updateStats() {
                debugger
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
</style>