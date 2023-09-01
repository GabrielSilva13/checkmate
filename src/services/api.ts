import axios from 'axios'

export const weatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
})

export const geocodingAPI = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0/reverse',
})
