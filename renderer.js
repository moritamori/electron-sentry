import { remote } from 'electron'

const { app } = remote
import { init } from '@sentry/electron/dist/renderer'
import * as Sentry from '@sentry/electron'

init({dsn: 'https://c367e13160724e94af531b9e2d19f682@o416167.ingest.sentry.io/5310008'})

document.addEventListener("DOMContentLoaded", () => {
  myUndefinedFunction()
})
