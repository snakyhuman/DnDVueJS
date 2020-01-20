<template>
    <v-value v-slot:default="{ active, toggle }">
        <div :style="'box-shadow: -5px 0px 0px 0px ' +value.quality.color+';'">
            <v-card :color="value.weared ? 'green' : 'white'" tile @click="toggle">
                <v-card-title>
                    <v-icon left>mdi-cube</v-icon>
                    {{value.name}}
                    <v-spacer/>
                    <v-chip color="green"
                            outlined>
                        X{{value.count}}
                    </v-chip>
                    <v-btn v-if="player" icon @click="$emit('sellItem', value)">
                        <v-icon>mdi-currency-usd</v-icon>
                    </v-btn>
                    <v-btn v-if="player" icon @click="$emit('wear',value)">
                        <v-icon :color="value.weared ? 'white' : 'grey'">
                            {{value.weared ? 'mdi-tshirt-crew'
                            :'mdi-tshirt-crew-outline' }}
                        </v-icon>
                    </v-btn>
                    <v-btn v-if="player" icon color="red" @click="$emit( 'deleteItemClick',value)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-subtitle class="pb-0">{{value.type}},
                    {{value.quality.name}}
                    <v-spacer/>
                    {{Math.round(value.cost * value.quality.modificator * 100) / 100}}
                    <v-icon color="#FFD700" right>mdi-coins</v-icon>
                </v-card-subtitle>
                <v-card-subtitle v-if="value.uses > 0"
                                 class="py-0 my-0">Использований {{value.uses}}
                </v-card-subtitle>
                <v-card-subtitle v-if="value.range >0" class="py-0 my-0">
                    Дальность {{value.range}}
                </v-card-subtitle>
                <v-chip-group column dark active-class="dark" class="mx-1 px-0">
                    <v-chip :color="randDarkColor()"
                            v-if="value.MeleeDamage > 0">
                        Урон (физич.)
                        <v-avatar right>{{Math.round(+value.MeleeDamage *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()"
                            v-if="value.MagicDamage > 0">
                        Урон (магич.)
                        <v-avatar right>{{Math.round(+value.MagicDamage *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()"
                            v-if="value.RangeDamage > 0">
                        Урон (дальн.)
                        <v-avatar right>{{Math.round(+value.RangeDamage *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.PhysicDef > 0">
                        Защита (физич.)
                        <v-avatar right>{{Math.round(+value.PhysicDef *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.MagicDef > 0">
                        Защита (магич.)
                        <v-avatar right>{{Math.round(+value.MagicDef *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()"
                            v-if="value.ElementsDef > 0">
                        Защита (стихии)
                        <v-avatar right>{{Math.round(+value.ElementsDef *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.Strength > 0">
                        Сила
                        <v-avatar right>{{Math.round(+value.Strength *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()"
                            v-if="value.Perception > 0">
                        Восприятие
                        <v-avatar right>{{Math.round(+value.Perception *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.Endurance > 0">
                        Выносливость
                        <v-avatar right>{{Math.round(+value.Endurance *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.Charisma > 0">
                        Харизма
                        <v-avatar right>{{Math.round(+value.Charisma *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()"
                            v-if="value.Intelligence > 0">
                        Интеллект
                        <v-avatar right>{{Math.round(+value.Intelligence *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.Agility > 0">
                        Ловкость
                        <v-avatar right>{{Math.round(+value.Agility *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                    <v-chip :color="randDarkColor()" v-if="value.Luck > 0">Удача
                        <v-avatar right>{{Math.round(+value.Luck *
                            +value.quality.modificator)}}
                        </v-avatar>
                    </v-chip>
                </v-chip-group>
            </v-card>
        </div>
    </v-value>
</template>

<script>
    export default {
        name: "value-view",
        props: {
            value: Object,
            player: Boolean
        },
        methods: {
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
        }
    };
</script>
