import {
  ForecastResponse,
  GeocodingResponse,
  GeoLocation,
  ProcessedWeatherData,
  DayForecast,
} from '../types/weather';
import { getWeatherCondition } from '../utils/weatherCodes';
import { generateWeatherRecommendations } from '../utils/weatherIntelligence';
import { formatDayName, formatShortDate } from '../utils/formatters';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast';

export class CityNotFoundError extends Error {
  constructor(message = 'City not found. Please check the city name and try again.') {
    super(message);
    this.name = 'CityNotFoundError';
  }
}

export class WeatherApiError extends Error {
  constructor(message = 'Unable to fetch weather data. Please check your connection and try again.') {
    super(message);
    this.name = 'WeatherApiError';
  }
}

/**
 * Searches for matching cities using the Open-Meteo Geocoding API.
 */
export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  try {
    const url = `${GEOCODING_API_URL}?name=${encodeURIComponent(trimmed)}&count=8&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new WeatherApiError(`Geocoding service returned status ${response.status}`);
    }

    const data: GeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new CityNotFoundError();
    }

    return data.results;
  } catch (err: unknown) {
    if (err instanceof CityNotFoundError) {
      throw err;
    }
    if (err instanceof WeatherApiError) {
      throw err;
    }
    throw new WeatherApiError(
      'Network connection issue or Open-Meteo service unreachable. Please try again.'
    );
  }
}

/**
 * Fetches forecast data for a specified location from the Open-Meteo Forecast API.
 */
export async function fetchWeatherData(location: GeoLocation): Promise<ProcessedWeatherData> {
  const { latitude, longitude } = location;

  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
      timezone: 'auto',
    });

    const url = `${FORECAST_API_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new WeatherApiError(`Weather forecast service returned status ${response.status}`);
    }

    const data: ForecastResponse = await response.json();

    if (!data.current || !data.daily || !data.daily.time) {
      throw new WeatherApiError('Incomplete weather forecast payload received.');
    }

    const currentCondition = getWeatherCondition(data.current.weather_code);

    // Map 7-day forecast
    const dailyCount = Math.min(data.daily.time.length, 7);
    const daily: DayForecast[] = [];

    for (let i = 0; i < dailyCount; i++) {
      const dateStr = data.daily.time[i];
      const code = data.daily.weather_code[i];
      const maxT = data.daily.temperature_2m_max[i];
      const minT = data.daily.temperature_2m_min[i];
      const precipProb = data.daily.precipitation_probability_max?.[i] ?? 0;
      const windSpeedMax = data.daily.wind_speed_10m_max?.[i] ?? 0;

      daily.push({
        date: dateStr,
        dayName: formatDayName(dateStr, i === 0),
        formattedDate: formatShortDate(dateStr),
        isToday: i === 0,
        weatherCode: code,
        condition: getWeatherCondition(code),
        maxTemp: maxT,
        minTemp: minT,
        precipitationProbability: precipProb,
        maxWindSpeed: windSpeedMax,
      });
    }

    const todayMax = daily[0]?.maxTemp ?? data.current.temperature_2m;
    const todayMin = daily[0]?.minTemp ?? data.current.temperature_2m;
    const todayPrecipProb = daily[0]?.precipitationProbability ?? 0;

    const recommendations = generateWeatherRecommendations({
      currentTemp: data.current.temperature_2m,
      apparentTemp: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
      precipitationProbability: todayPrecipProb,
      todayMax,
      todayMin,
    });

    return {
      location,
      current: {
        time: data.current.time,
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        weatherCode: data.current.weather_code,
        condition: currentCondition,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
        todayMax,
        todayMin,
        todayPrecipitationProbability: todayPrecipProb,
      },
      daily,
      recommendations,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (err: unknown) {
    if (err instanceof WeatherApiError) {
      throw err;
    }
    throw new WeatherApiError(
      'Failed to load weather forecast. Please check your internet connection or try again.'
    );
  }
}
