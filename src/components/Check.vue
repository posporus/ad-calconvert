<template>
	<div class="check">
		<b-card title="Prüfen und speichern">
			<p>
				Überprüfe, ob alle deine Schichten richig erkannt wurden und speichere die Kalenderdatei.
				</p>

				<b-list-group horizontal="md">
					<b-list-group-item>
						<b>Assistent:</b>
						{{ selectedAs }}
					</b-list-group-item>
					<b-list-group-item>
						<b>Einsatz:</b>
						{{ asn }}
					</b-list-group-item>
					<b-list-group-item>
						<b>Monat:</b>
						{{ monthYear }}
					</b-list-group-item>
				</b-list-group>
			
	
			<b-table striped hover :items="shiftTable"></b-table>
			<b-form-group>
				<b-button @click="generateIcs">
					<font-awesome-icon icon="save"></font-awesome-icon>
					Speichern
				</b-button>
			</b-form-group>
		</b-card>
	</div>
</template>

<script>
const ics = require('ics')
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { saveAs } from 'file-saver'
export default {
	data() {
		return {
			shiftTable: [],
		}
	},
	computed: {
        ...mapGetters({
            asn: 'parseddata/asn',
            monthYear: 'parseddata/monthYear',
			calendar: 'parseddata/calendar',
			selectedAs: 'parseddata/selectedAs'
        }),
    },
    methods: {
		...mapActions({
			lockTab: 'tabcontrol/lockTab',
			unlockTab: 'tabcontrol/unlockTab',
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
			
			saveAs(new Blob([value]),"icalfile.ics")
            //this.downloadBlob(new Blob([value]),"icalfile.ics")
            //console.log(value)
        },
	},
	watch: {
		calendar(items) {
			//reset
			_.remove(this.shiftTable)
			
			items.forEach(element => {
				this.shiftTable.push({
					"Tag":element.day+".",
					"Zeit":element.start+" - "+element.end,
					//"Ende":element.end+" Uhr",
					"Kommentar":element.comment
				})
			})

			//this.generateIcs()
		}
	}
}
</script>

<style>

</style>