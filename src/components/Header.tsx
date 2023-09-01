import Image from 'next/image'
import { Divider } from './Divider'
import { WeatherBox } from './WeatherBox'

export const Header = () => {
  return (
    <div className="flex flex-col items-center gap-16 lg:flex-row">
      <WeatherBox />
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-6 tracking-wider">
          <Divider width={48} />

          <h1 className="font-heading text-4xl text-white lg:text-6xl">
            CheckMate
          </h1>

          <Divider width={48} />
        </div>

        <div className="flex w-full items-center gap-6 tracking-wider">
          <Divider width={240} />

          <Image
            className="mx-auto object-cover"
            src="/note-pencil.svg"
            alt=""
            width={32}
            height={32}
          />

          <Divider width={240} />
        </div>
      </div>
    </div>
  )
}
