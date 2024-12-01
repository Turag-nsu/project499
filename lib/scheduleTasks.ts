import { schedule } from 'node-schedule'
import { JobCallback, Spec } from 'node-schedule'

//console log in every 5 seconds
schedule('*/5 * * * * *', () => {
    console.log('This job runs every 5 seconds to log a message')
})