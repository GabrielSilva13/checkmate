'use client'
import { CurrentDayProps } from '@/@types/current-day'
import { useEffect, useState } from 'react'

export const CurrentHourComponent = ({ currentDay }: CurrentDayProps) => {
  const [currentHour, setCurrentHour] = useState<string>('00')
  const [currentMinute, setCurrentMinute] = useState<string>('00')
  const [currentSecond, setCurrentSecond] = useState<string>('00')

  useEffect(() => {
    const updateCurrentTime = () => {
      const currentDate = new Date()
      setCurrentHour(currentDate.getHours().toString().padStart(2, '0'))
      setCurrentMinute(currentDate.getMinutes().toString().padStart(2, '0'))
      setCurrentSecond(currentDate.getSeconds().toString().padStart(2, '0'))
    }

    updateCurrentTime() // Chamada inicial para definir o tempo atual

    // Configurar o intervalo para chamar updateCurrentTime a cada segundo
    const intervalId = setInterval(updateCurrentTime, 1000)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId)
  }, [])
  return (
    <div className="flex flex-col font-roboto text-xl">
      <time className="relative z-20" dateTime={currentDay}>
        {currentDay}
      </time>

      <time>
        {currentHour}:{currentMinute}:{currentSecond}
      </time>
    </div>
  )
}
