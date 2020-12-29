<template>
  <div>
        <h2>pdf viewer</h2>
        <pdf src="./Maja Nov.PDF"
            ref="adPlan"
            @loaded="parsePDF"
            @num-pages="pages = $event"
        ></pdf>
        <!--
        {{ pages }}
        <b-form-select v-model="selectedAs" :options="asOptions">

        </b-form-select>
        <b-table striped hover :items="calendar"></b-table>
        <b-button @click="generateIcs">
            Download Calendar
        </b-button>
        -->
        
  </div>
</template>

<script>
import pdf from 'vue-pdf'
const ics = require('ics')
//import { ics } from 'ics'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            pages:0,
            asOptions:[],
            selectedAs: null,
        }
    },
    components: {
        pdf
    },
    computed: {
        ...mapState({
            rawData: state => state.parseddata.rawData,
            cleanData: state => state.parseddata.cleanData,
        }),
        ...mapGetters({
            asn: 'parseddata/asn',
            month: 'parseddata/month',
            assis: 'parseddata/assis',
            calendar: 'parseddata/calendar',
        }),
        
    },
    methods: {
        ...mapActions({
            addData: 'parseddata/addData', // map `this.increment()` to `this.$store.dispatch('increment')`
            //validate: 'parseddata/validate',
            straighten: 'parseddata/straighten',
            setAs: 'parseddata/setAs',
            dayChunks: 'parseddata/dayChunks'
        }),
        downloadBlob(blob, filename) {
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = filename

            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link);
        },
        generateIcs() {
            let events = []
            this.calendar.forEach((element) => {
                //console.log("ics",element)
                events.push({
                    title: this.asn,
                    start: [
                        parseInt(element.year),
                        parseInt(element.month),
                        parseInt(element.day),
                        parseInt(element.start.split(':')[0]),
                        parseInt(element.start.split(':')[1])
                    ],
                    end: [
                        parseInt(element.year),
                        parseInt(element.month),
                        parseInt(element.day),
                        parseInt(element.end.split(':')[0]),
                        parseInt(element.end.split(':')[1]),
                    ],
                    description: element.comment
                })
            })
            console.log(events)
            const { error, value } = ics.createEvents(events)
            if (error) {
                console.log(error)
                return
            }
            this.downloadBlob(new Blob([value]),"icalfile.ics")
            //console.log(value)
        },
        parsePDF() {
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
                        this.straighten()
                    }
				})
			})
        }
    },
    watch:{
        assis: function() {
            let asOptions = [{ value: null, text: 'Please select an option' }]
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
            //console.log(as)
        }
    }
}
</script>

<style>

</style>