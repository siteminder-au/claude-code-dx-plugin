import { createApp } from 'vue'
import router from './router'
import SuiCore from '@siteminder/sui-core'
import SuiIcons from '@siteminder/sui-icons'
import { SmAppHeader } from '@siteminder/sui-core/components/sm-app-header'
import { SmUserMenu } from '@siteminder/sui-core/components/sm-user-menu'
import { SmPropertyMenu } from '@siteminder/sui-core/components/sm-property-menu'
import { SmVerticalNav, SmVerticalNavItem } from '@siteminder/sui-core/components/sm-vertical-nav'
import { SmNav, SmNavItem } from '@siteminder/sui-core/components/sm-nav'
import { SmContainer } from '@siteminder/sui-core/components/sm-container'
import { SmTooltip } from '@siteminder/sui-core/components/sm-tooltip'
import { SmButton } from '@siteminder/sui-core/components/sm-button'
import { SmAside } from '@siteminder/sui-core/components/sm-aside'
import { SmTag } from '@siteminder/sui-core/components/sm-tag'
import { SmBadge } from '@siteminder/sui-core/components/sm-badge'
import { SmTabs, SmTab } from '@siteminder/sui-core/components/sm-tabs'
import { SmDialog } from '@siteminder/sui-core/components/sm-dialog'
import { SmPopover } from '@siteminder/sui-core/components/sm-popover'
import { SmMedia, SmMediaItem } from '@siteminder/sui-core/components/sm-media'
import { SmCarousel } from '@siteminder/sui-core/components/sm-carousel'
import { SmDivider } from '@siteminder/sui-core/components/sm-divider'
import { SmPagination } from '@siteminder/sui-core/components/sm-pagination'
import { SmCard, SmCardContent, SmCardActions } from '@siteminder/sui-core/components/sm-card'
import { SmHelpCard } from '@siteminder/sui-core/components/sm-help-card'
import { SmLoadingBar, SmLoadingTable, SmLoadingCard } from '@siteminder/sui-core/components/loading'
import { SmTable, SmTableThead, SmTableTr, SmTableTh, SmTableTd, SmTableTbody } from '@siteminder/sui-core/components/sm-table'

// forms
import { SmCheckbox, SmCheckboxGroup } from '@siteminder/sui-core/components/forms/sm-checkbox'
import { SmDatePicker } from '@siteminder/sui-core/components/forms/sm-date-picker'
import { SmForm } from '@siteminder/sui-core/components/forms/sm-form'
import { SmFormGroup } from '@siteminder/sui-core/components/forms/sm-form-group'
import { SmInput, SmInputSuffixContent } from '@siteminder/sui-core/components/forms/sm-input'
import { SmRadio, SmRadioButton, SmRadioGroup } from '@siteminder/sui-core/components/forms/sm-radio'
import { SmSelect } from '@siteminder/sui-core/components/forms/sm-select'
import { SmSwitch } from '@siteminder/sui-core/components/forms/sm-switch'
import { SmCalendar } from '@siteminder/sui-core/components/forms/sm-calendar'

import { setupVueI18n } from '@siteminder/sui-core/libs'

import App from './App.vue'
import { i18n } from './services/i18n'

import './style.css'
import '@siteminder/sui-core/sui-global.css'

const app = createApp(App);

setupVueI18n(i18n)

// app.component('SmAppHeader', SmAppHeader)
// app.component('SmUserMenu', SmUserMenu)
// app.component('SmPropertyMenu', SmPropertyMenu)
// app.component('SmVerticalNav', SmVerticalNav)
// app.component('SmVerticalNavItem', SmVerticalNavItem)
// app.component('SmNav', SmNav)
// app.component('SmNavItem', SmNavItem)
// app.component('SmContainer', SmContainer)
// app.component('SmTooltip', SmTooltip)
// app.component('SmButton', SmButton)
// app.component('SmAside', SmAside)
// app.component('SmTag', SmTag)
// app.component('SmBadge', SmBadge)
// app.component('SmTabs', SmTabs)
// app.component('SmTab', SmTab)
// app.component('SmDialog', SmDialog)
// app.component('SmPopover', SmPopover)
// app.component('SmMedia', SmMedia)
// app.component('SmMediaItem', SmMediaItem)
// app.component('SmCarousel', SmCarousel)
// app.component('SmDivider', SmDivider)
// app.component('SmPagination', SmPagination)
// app.component('SmCard', SmCard)
// app.component('SmHelpCard', SmHelpCard)
// app.component('SmCardContent', SmCardContent)
// app.component('SmCardActions', SmCardActions)
// app.component('SmLoadingBar', SmLoadingBar)
// app.component('SmLoadingTable', SmLoadingTable)
// app.component('SmLoadingCard', SmLoadingCard)
// app.component('SmTable', SmTable)
// app.component('SmTableThead', SmTableThead)
// app.component('SmTableTr', SmTableTr)
// app.component('SmTableTh', SmTableTh)
// app.component('SmTableTd', SmTableTd)
// app.component('SmTableTbody', SmTableTbody)
// app.component('SmForm', SmForm)
// app.component('SmFormGroup', SmFormGroup)
// app.component('SmInput', SmInput)
// app.component('SmSelect', SmSelect)
// app.component('SmDatePicker', SmDatePicker)
// app.component('SmRadioGroup', SmRadioGroup)
// app.component('SmRadio', SmRadio)
// app.component('SmRadioButton', SmRadioButton)
// app.component('SmCheckboxGroup', SmCheckboxGroup)
// app.component('SmCheckbox', SmCheckbox)
// app.component('SmSwitch', SmSwitch)
// app.component('SmInputSuffixContent', SmInputSuffixContent)
// app.component('SmCalendar', SmCalendar)

app.use(router);
app.use(i18n);
app.use(SuiCore, { i18n });
app.use(SuiIcons);

app.mount('#app');
