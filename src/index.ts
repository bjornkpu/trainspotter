import 'dotenv/config'
import config from './config'
import cron from 'cron'
import { DateTime } from 'luxon'
import * as gql from './graphql'
import { sendMail } from './mail'
import { Logger } from 'tslog'
import { PugOption, Trip } from './typedef'
const log = new Logger()
const CronJob = cron.CronJob

const skansen = {
  place: "NSR:Quay:224",
  name: "Skansen stasjon",
  coordinates: {
    latitude: 63.431159,
    longitude: 10.377665,
  }
}
const stjørdal = {
  place: "NSR:Quay:1160",
  name: "Stjørdal stasjon",
  latitude: 63.470154,
  longitude: 10.913654,
}

log.info('Starting trainspotter')
// log.debug('with config:', config)

const job = new CronJob(
  config.cronTime,
  async function() {
    log.info('Starting fetch')

    const date = DateTime.now().toISODate().toString()
    const time = 'T07:00:00+0100'
    const normalExpectedStartTime = date + 'T07:08:00+0100'
    let error = false
    let pugOption:PugOption = {
      from: skansen.name,
      to: stjørdal.name,
      normalExpectedStartTime,
      expectedStartTime: '',
      errorMsg: '',
      trip: null
    }

    const QueryString = `
    trip(
      from: {
        place: "NSR:Quay:224"
        name: "Skansen stasjon"
        coordinates: {
          latitude: 63.431159
          longitude: 10.377665
        }
      }
      to: {
        place: "NSR:Quay:1160"
        name: "Stjørdal stasjon"
        coordinates: {
          latitude: 63.470154
          longitude: 10.913654
        }
      }
      numTripPatterns: 1
      dateTime: "${date + time}"
      ) {
        tripPatterns {
          expectedStartTime
          legs {
            mode
            line {
              id
              publicCode
            }
          }
        }
        messageEnums
        messageStrings
      }
      `
    
    const trip:Trip = await gql.query(QueryString)

    pugOption.trip = JSON.stringify(trip)

    for (let index = 0; index < trip.messageEnums.length; index++) {
      pugOption.errorMsg += (trip.messageEnums[index] + ' : ' + trip.messageStrings[index] + '\n')
      error = true
    }
    
    const expectedStartTime = trip
      .tripPatterns[0]
      .expectedStartTime
    if (expectedStartTime !== normalExpectedStartTime) {
      // log.debug({
      //   normalExpectedStartTime,
      //   expectedStartTime
      // })
      pugOption.expectedStartTime = expectedStartTime
      error = true
    }

    if (error) {
      log.info('Errors found. Sending mail.')
      sendMail(pugOption)
    } else {
      log.info('Fetch finished without errors.')
    }
  },
  null, true, 'Europe/Oslo');

job.start();
