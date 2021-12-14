import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate'
import EnvalidationMessages from 'vee-validate/dist/locale/en'
import FrvalidationMessages from 'vee-validate/dist/locale/fr'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

const i18n = new VueI18n()
i18n.locale = "en"
Vue.use(VeeValidate, {
    // i18nRootKey: 'validations', // customize the root path for validation messages.
   i18n,
   dictionary: {
    en: EnvalidationMessages,
    fr: FrvalidationMessages
   }
})