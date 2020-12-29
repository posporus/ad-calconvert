<template>
    <div class="choose-assistant">
        <b-card title="Assistent wählen">
            <b-form-group
                label="Für wen soll der Plan umgewandelt werden?"
                description="Es kann sein, dass einige Bemerkungen als Namen erkannt und hier aufgelistet werden. Diese bitte einfach ignorieren.">
                
                <b-form-select v-model="selectedAs" :options="asOptions">
                </b-form-select>
            </b-form-group>
        </b-card>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            selectedAs: null,
            asOptions: [],
        }
    },
    computed: {
        ...mapGetters({
            asn: 'parseddata/asn',
            month: 'parseddata/month',
            assis: 'parseddata/assis',
        }),
    },
    methods: {
        ...mapMutations({
            chooseDisabled: 'tabcontrol/setChooseDisabled',
            checkDisabled: 'tabcontrol/setCheckDisabled',
        }),
        ...mapActions({
            setAs: 'parseddata/setAs',
            jumpToTab: 'tabcontrol/jumpToTab',
        }),
    },
    watch:{
        assis: function() {
            let asOptions = []
            this.assis.forEach(element => {
                asOptions.push({
                    value: element,
                    text: element
                })
            });
            this.asOptions =  asOptions
        },
        selectedAs: function(as) {
            this.setAs(as)
            //this.unlockTab(3)
            this.chooseDisabled(false)
            this.checkDisabled(false)
            window.setTimeout(() => {
                this.jumpToTab(2)
            },500)
            
        }
    }
}
</script>

<style>
    
</style>