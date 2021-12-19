<template>
    <div class="locale-changer">
        <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "ChangeLang",
        data () {
            return { langs: ['en', 'fr'] }
        },
        mounted() {
            setInterval(() => {
                if (this.$i18n.locale !== this.$validator.localize.lang)
                {
                    this.$validator.localize(this.$i18n.locale)
                }
            }, 500)
        }
    }
</script>

<style>

</style>