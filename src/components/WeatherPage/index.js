import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';

const StyledWeatherPage = styled.div`
  padding: 16px;
`;

const CurrentWeather = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 16px;
`;

const ErrorMessage = styled.div`
  color: darkred;
`;

const FutureForecasts = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForecastCard = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: white;
  width: 150px;
  padding: 16px;
  border-radius: 4px;
`;

const futureForecastArray = [1, 2, 3, 4, 5];

const WeatherPage = ({ lon, lat, name }) => {
  const [isLoading, setIsLoading] = useState(lat && lon);
  const [weather, setWeather] = useState(null);
  const today = moment().format('MM/DD/YYYY');

  useEffect(() => {
    if (!lon || !lat) {
      return;
    }
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall`, {
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_OPENWEATHER_KEY,
          exclude: 'minutely,hourly,alerts',
          units: 'imperial',
        },
      })
      .then((result) => {
        setWeather(result.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [lon, lat]);

  const getWeatherFor = (day) => weather?.daily?.[day];

  return (
    <StyledWeatherPage>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <CurrentWeather>
            {weather && (
              <h1>
                {name} ({today})
              </h1>
            )}
            {!weather && (
              <ErrorMessage>
                Failed to fetch data, an unexpected error occured
              </ErrorMessage>
            )}
            <p>Temp: {weather?.current?.temp}F</p>
            <p>Wind: {weather?.current?.wind_speed} MPH</p>
            <p>Humidity: {weather?.current?.humidity}%</p>
            <p>UV Index: {weather?.current?.uvi}</p>
          </CurrentWeather>
          <h2>5-Day Forecast:</h2>
          <FutureForecasts>
            {futureForecastArray.map((day, i) => {
              const weatherForDay = getWeatherFor(day);
              return (
                <ForecastCard key={i}>
                  <h3>{moment().add({ day }).format('MM/DD/YYYY')}</h3>
                  <p>Temp: {weatherForDay?.temp?.day}F</p>
                  <p>Wind: {weatherForDay?.wind_speed} MPH</p>
                  <p>Humidity: {weatherForDay?.humidity}%</p>
                </ForecastCard>
              );
            })}
          </FutureForecasts>
        </>
      )}
    </StyledWeatherPage>
  );
};

export default WeatherPage;
