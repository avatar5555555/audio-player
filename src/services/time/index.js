import moment from 'moment'

export const getTrackDuration = (ms, period = 'milliseconds') => {
  const time = moment.duration(ms, period)
  const seconds = time.seconds() >= 10 ? time.seconds() : `0${time.seconds()}`

  return `${time.minutes()}:${seconds}`
}
