<template>
    <div class="choose-file">
        <b-card title="Datei wählen">
            <b-form-group
                label="Wähle bitte einen Soll-Einsatzplan als PDF aus"
                description="Dabei werden keine Daten hochgelagen. Die gesamte Verarbeitung geschieht ausschließlich auf deinem Computer/Smartphone."
            >
                <b-form-file
                accept="application/pdf"
                v-model="file"
                @change="loadPdf"
                placeholder="Einsatzplan wählen..."
                drop-placeholder="Einsatzplan ablegen..."
                ></b-form-file>
            </b-form-group>
            <b-alert v-model="$store.state.alert.show" variant="danger" dismissible>
                {{ $store.state.alert.message }}
            </b-alert>
        </b-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            file: null,
            alert: false,
            alertMessage: '',
        }
    },
    methods: {
        ...mapActions({
            setPdfDataUrl: 'parseddata/setPdfDataUrl',
        }),
        loadPdf(ev) {
            //return new Promise((resolve, reject) => {
                const file = ev.target.files[0];
                const reader = new FileReader();

                reader.onload = e => {
                    this.setPdfDataUrl(e.target.result)
                    //resolve(e.target.result)
                    //if(this.isValid)
                }
                reader.onerror = err => {
                    //reject(err)
                    console.log(err)
                }
                reader.readAsDataURL(file);
            //})
        },
        
        
        
    },
    watch: {
        
    }
}
</script>

<style>

</style>