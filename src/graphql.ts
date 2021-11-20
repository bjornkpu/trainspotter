import axios from "axios"
import { Logger } from 'tslog'
const log = new Logger()

const URL = 'https://api.entur.io/journey-planner/v2/graphql'

export async function query (
  queryString: string
): Promise<any> {
  const { data } = await axios({
    url: URL,
    method: 'POST',
    data: {
      query: `query Query{ ${queryString} }`,
    }
  })
    .catch((err) => {
      log.error(`status ${err.response.status} ${err.response.statusText}`)
      if(err.isAxiosError && err.response.statusText === 'Bad Request') {
        if (err.response.data.errors) log.error(err.response.data.errors[0].message)
      }
      return err.response.data
    })
    return data.data.trip
}