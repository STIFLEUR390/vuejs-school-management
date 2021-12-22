<template>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{ $t('select_a_class') }}</label>
                <v-select :options="classes_select" @input="searchSection" v-model="classe.class_id"></v-select>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label>{{ $t('select_a_section') }}</label>
                <v-select :options="section_select" @input="propageSection" v-model="classe.section_id"></v-select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClassSelect",
        data() {
            return {
                classes_select: [],
                section_select: [],
                classe: {
                    class_id: null,
                    section_id: null
                },
            }
        },
        mounted() {
            this.getDataClassForSelect()
        },
        methods: {
            async getDataClassForSelect() {
                this.axios.get("/superadmin/crud?getData=class_for_select")
                    .then((response) => {
                        this.classes_select = response.data.data
                    })
            },
            async searchSection() {
                this.section_select = []
                this.classe.section_id = null
                this.axios.get("/superadmin/crud?getData=section_for_select&class_id="+ this.classe.class_id.id)
                    .then((response) => {
                        this.section_select = response.data.data
                    })
            },
            propageSection() {
                // envoie l'id de la classe et de la section au composant parent
                let classSection = {
                    class_id: this.classe.class_id.id,
                    section_id: this.classe.section_id.id
                }
                // this.$emit('classSection', this.classe)
                this.$emit('classSection', classSection)
            }
        }
    }
</script>

<style scoped>

</style>