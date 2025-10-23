import { createI18n } from 'vue-i18n'
import { datetimeFormats } from './date-time-formats'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  datetimeFormats,
})

/**
 * Example to use useI18n in Vue Component
 *
 * <script setup>
 * import { useI18n } from 'vue-i18n'
 *
 * const { t } = useI18n() // use as global scope
 * </script>
 *
 * <template>
 *   <p>{{ $t('You.Lang.Key') }}</p>
 *   <p>{{ t('You.Lang.Key') }}</p>
 * </template>
 *
 */
