<template>
  <div>
        <pdf class="pdf-view" :src="pdfDataUrl"
            style="display:none"
            ref="adPlan"
            @loaded="parsePDF"
            @num-pages="pages = $event"
        ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            pages: 0,
            tabinfo: "info",
        }
    },
    components: {
        pdf
    },
    computed: {
        ...mapGetters({
            pdfDataUrl: 'parseddata/pdfDataUrl',
            isValid: 'parseddata/isValid',
            //currentTab: 'tabcontrol/currentTab'
        }),
    },
    methods: {
        ...mapActions({
            addData: 'parseddata/addData',
            straighten: 'parseddata/straighten',
            jumpToTab: 'tabcontrol/jumpToTab',
            reset: 'parseddata/reset'
        }),
        ...mapMutations({
            chooseDisabled: 'tabcontrol/setChooseDisabled',
            checkDisabled: 'tabcontrol/setCheckDisabled',
            showAlert: 'alert/showAlert',
            hideAlert: 'alert/hide'
        }),
        parsePDF() {
            this.reset()
            this.hideAlert()
            console.log("PARSE PDF")
            //console.log(this.$refs.adPlan)
            let pagecounter = 0
            this.$refs.adPlan.pdf.forEachPage(page => {
				return page.getTextContent()
				.then(content => {

                    var text = content.items.map(item => item.str);
                    this.addData(text)
                    
                    pagecounter++
                    //When last page is parsed
                    if(pagecounter >= this.pages) {
                        //console.log('ASN: '+this.asn)
                        //console.log('MONAT: '+this.month)
                        //this.validate()
                        if(this.isValid){
                            console.log("valid")
                            
                            this.straighten()
                            this.chooseDisabled(false)
                            this.checkDisabled(true)
                            window.setTimeout(() => {
                                this.jumpToTab(1)
                            },500)
                            //this.jumpToTab(1)
                            
                        }
                        else {
                            this.showAlert('Diese Datei ist nicht Kompatibel.')
                            this.checkDisabled(true)
                            this.chooseDisabled(true)
                        }
                        
                    }
				})
			})
        }
    },
        
    watch:{
        
    }
}
</script>

<style>
    .pdf-view {
        display: none;
    }
</style>