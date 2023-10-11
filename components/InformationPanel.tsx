"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";
type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

function InformationPanel({ city, lat, long, results }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#99c1d9] to-[#e8e8e8] p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="text-sm text-gray-400">
          Long/Lat : {long}
          {","} {lat}
        </p>
      </div>
      <CityPicker />

      <hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="mt-5 flex items-center justify-between space-between-10 mb-5">
        <div>
          <p className="text-lg">
            {new Date().toLocaleString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-light">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold">
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </p>
      </div>

      <hr className="h-px mb-5 mt-10 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[results.current_weather.weathercode].label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-6xl font-bold">{`${results.current_weather.temperature}°C`}</p>
            <p className="text-right font-light text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-5 ">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#98c1d9] rounded-md bg-[#98c1d9]">
          <SunIcon className="h-10 w-10 text-white" />

          <div className="flex-1 flex justify-between items-center">
            <p className="text-white font-extralight">Sunrise</p>
            <p className="uppercase text-2xl text-white">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#98c1d9] rounded-md bg-[#98c1d9]">
          <MoonIcon className="h-10 w-10 text-white" />

          <div className="flex-1 flex justify-between items-center">
            <p className="text-white font-extralight">Sunset</p>
            <p className="uppercase text-2xl text-white">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
