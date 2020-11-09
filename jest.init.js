import { config } from '@vue/test-utils'
import Lang from '@/lang.js'

const locale = 'ja'

config.mocks['$t'] = (msg) => Lang[locale][msg]
