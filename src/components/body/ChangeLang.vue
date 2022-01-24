<template>
    <!--<div class="locale-changer">
        <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
    </div>-->
    <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="fas fa-language"></i>
            <span class="badge badge-warning navbar-badge">{{ lang }}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="min-width: 68px !important;">
            <a href="javascript:void(0);" @click="changeLocale('en')" class="dropdown-item dropdown-header">{{ $t('english') }}</a>

            <div class="dropdown-divider"></div>
            <a href="javascript:void(0);" @click="changeLocale('fr')" class="dropdown-item dropdown-footer">{{ $t('french') }}</a>
        </div>
    </li>
</template>

<script>
    export default {
        name: "ChangeLang",
        data () {
            return {
                // langs: ['en', 'fr']
                lang: this.$i18n.locale
            }
        },
        methods: {
            changeLocale(lang){
                this.$i18n.locale = lang
                this.lang = lang
                this.$validator.localize(lang)
            }
        }
        /*mounted() {
            setInterval(() => {
                if (this.$i18n.locale !== this.$validator.localize.lang)
                {
                    this.$validator.localize(this.$i18n.locale)
                }
            }, 500)
        }*/
    }
</script>

<style>

</style>