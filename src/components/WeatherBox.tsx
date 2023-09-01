'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { LocationData } from '@/@types/weather'
import { toast } from 'react-toastify'
import { geocodingAPI, weatherAPI } from '@/services/api'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactAnimatedWeather from 'react-animated-weather'
import { CurrentHourComponent } from './CurrentHourComponent'

const getUserLocation = async (): Promise<LocationData> => {
  const position = await new Promise<GeolocationCoordinates>(
    (resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords)
          },
          (error) => {
            reject(error)
          },
        )
      } else {
        reject(new Error('Geolocalização não suportada'))
      }
    },
  )

  const { latitude, longitude } = position

  return { latitude, longitude }
}

const iconMapping: Record<string, string> = {
  '01d': 'CLEAR_DAY',
  '02d': 'PARTLY_CLOUDY_DAY',
  '03d': 'CLOUDY',
  '04d': 'CLOUDY',
  '09d': 'RAIN',
  '10d': 'SLEET',
  '11d': 'WIND',
  '13d': 'SNOW',
  '50d': 'FOG',
}

export const WeatherBox = () => {
  const { data: userLocation } = useQuery<LocationData | undefined>(
    ['userLocation'],
    getUserLocation,
  )

  const handleLocationNotFound = () => {
    toast.error('Localização não encontrada')
    return null
  }

  const getLocationDetails = async (latitude: number, longitude: number) => {
    const response = await geocodingAPI.get('', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      },
    })

    return response.data
  }

  const getWeatherInfo = async (latitude: number, longitude: number) => {
    const response = await weatherAPI.get('', {
      params: {
        lat: latitude,
        lon: longitude,
        exclude: 'minutely,hourly,daily,alerts',
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        units: 'metric',
      },
    })

    return response.data
  }

  const { data: locationDetails, isLoading: isLocationDetailsLoading } =
    useQuery(
      ['locationDetails', userLocation],
      async () => {
        if (!userLocation) {
          return handleLocationNotFound()
        }

        return getLocationDetails(userLocation.latitude, userLocation.longitude)
      },
      {
        enabled: !!userLocation,
        refetchOnWindowFocus: false,
      },
    )

  const { data: WeatherInfo, isLoading } = useQuery(
    ['weather', userLocation],
    async () => {
      if (!userLocation) {
        return handleLocationNotFound()
      }

      return getWeatherInfo(userLocation.latitude, userLocation.longitude)
    },
    {
      enabled: !!userLocation,
      refetchOnWindowFocus: false,
    },
  )

  const currentDay = new Date(
    WeatherInfo?.current.dt * 1000,
  ).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="relative h-40 w-full max-w-sm rounded-md bg-opacity-0 bg-weather-gradient bg-clip-padding px-6 py-6 backdrop-blur-md backdrop-filter">
      {isLoading || isLocationDetailsLoading ? (
        <div className="absolute inset-0 h-40 w-full max-w-sm animate-pulse bg-zinc-800" />
      ) : (
        <>
          <strong className="relative z-20 flex gap-2 font-roboto text-3xl font-normal">
            {Math.round(WeatherInfo.current.temp)}{' '}
            <span className="text-3xl">ºC</span>
          </strong>

          <div className="absolute right-3 top-5 z-10 object-cover">
            <ReactAnimatedWeather
              icon={iconMapping[WeatherInfo.current.weather[0].icon]}
              color="#ffffff"
              size={100}
              animate={true}
            />
          </div>

          <CurrentHourComponent currentDay={currentDay} />

          <div className="relative z-20 flex items-center gap-2">
            <Image
              className="object-cover"
              src="/pinpoint.svg"
              alt="ícone de marcação"
              width={20}
              height={20}
            />

            <strong className="font-roboto text-2xl font-normal">
              {locationDetails[0].name}, {locationDetails[0].state}
            </strong>
          </div>
        </>
      )}
    </div>
  )
}
