import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import Humiditychart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import Rainchart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import Tempchart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import weatherCodeToString from "@/lib/weatherCodeToString";

export const revalidate = 60;
type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};
async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT+0530",
    },
  });

  const results: Root = data.myQuery;

  // const dataToSend = cleanData(results, city);

  // try {
  //   const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       weatherData: dataToSend,
  //     }),
  //   });;
  //   const GPTdata = await res.json();
  //   const { content } = GPTdata;
  //   console.log("SUCCESS");
  // } catch (err) {
  //   console.log("Error:", err);
  // }

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Information Panel */}
      <InformationPanel city={city} lat={lat} long={long} results={results} />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400 ">
              {" "}
              Last Updated at :{" "}
              {new Date(results.current_weather.time).toLocaleString()}
            </p>
          </div>
          <div className="m-2 mb-10">
            <CalloutCard
              message={`
              Hey user, hope you are doing good. This is Rohit presenting you LIVE weather of ${decodeURI(city)}.
Today in ${decodeURI(city)}, the weather is expected to be ${
                weatherCodeToString[results.current_weather.weathercode].label
              }. The maximum temperature will reach ${results.daily.temperature_2m_max[0].toFixed(
                1
              )}°C, while the minimum temperature will be around ${results.daily.temperature_2m_min[0].toFixed(
                1
              )}°C. The UV index is ${
                results.daily.uv_index_max[0].toFixed(1)
              }. Additionally, there will be ${results.current_weather.windspeed.toFixed(
                1
              )} km/h winds blowing throughout the day.

Please note that weather conditions can change rapidly, so it's advisable to stay updated with the latest forecasts and take necessary precautions accordingly.

Stay safe and enjoy your day in ${decodeURI(city)}!`}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
              color="yellow"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
              color="green"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message={"The UV is high today, be sure to wear SPF!"}
                  warning
                />
              )}
            </div>
            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)}km/h`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />

        <div className="space-y-3">
          <Tempchart results={results} />

          <Rainchart results={results} />

          <Humiditychart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
