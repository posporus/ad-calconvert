<template>
	<div class="calconverter">
		<Introduction/>
		<b-card no-body>
			<b-tabs v-model="$store.state.tabcontrol.currentTab" align="center" card pills>
			<b-tab title="1. Datei wählen">
				<ChooseFile/>
			</b-tab>
			<b-tab title="2. Assistent wählen" :disabled="$store.state.tabcontrol.chooseDisabled">
				<ChooseAssistant/>
			</b-tab>
			<b-tab title="3. Prüfen und Speichern" :disabled="$store.state.tabcontrol.checkDisabled">
				<Check/>
			</b-tab>
		</b-tabs>
		</b-card>
		
		<PdfViewer/>
	</div>
</template>

<script>

import ChooseFile from '../components/ChooseFile'
import ChooseAssistant from '../components/ChooseAssistant'
import Check from '../components/Check'
import PdfViewer from '../components/PdfViewer'
import Introduction from '../components/Introduction'
import { mapState } from 'vuex'

//import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            
            //tabIndex: 1,
            //tabDisabled: [],
            //currentTab: 0,
            //disabled:[false,true,true]
            //disabledTabs: [2,3]
        }

    },
    components: {
        Introduction,
        ChooseFile,
        ChooseAssistant,
        Check,
        PdfViewer,
    },
    computed: {
        /*
        ...mapGetters({
            getCurrentTab: 'tabcontrol/getCurrentTab',
            getDisabled: 'tabcontrol/disabledTabs',
            chooseDisabled: 'tabcontrol/chooseDisabled',
            checkDisabled: 'tabcontrol/checkDisabled'
        }),
        */
        ...mapState({
            currentTab: state => state.tabcontrol.currentTab,
        }),
    },
    methods: {
        
    },
    watch: {
        getCurrentTab(tab) {
            this.currentTab = tab
        },
        /*
        disabledTabs(tab) {
            console.log('disabledTabs: ' + tab)
        },*/
        /*
        getDisabledTabs: {
            deep: true,
            handler() {
                this.disabledTabs = this.getDisabledTabs
            }
        },*/
        currentTab() {
            console.log("jump "+this.currentTab)
        },
        getDisabled: {
            deep: true,
            handler: function(disabled) {
                disabled.array.forEach((element,index) => {
                    this.disabled[index] = element
                    console.log("diesasdfs")
                });
            }
        }
    }
}
</script>

<style>
.tab-content {
    margin:0px;
}
</style>