export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country_code?: string;
  country: string;
  admin1?: string; // State / Region / Province
  admin2?: string;
  timezone?: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeoLocation[];
  generationtime_ms?: number;
}

export interface CurrentWeatherRaw {
  time: string;
  interval?: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyWeatherRaw {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation: string;
    weather_code: string;
    wind_speed_10m: string;
  };
  current: CurrentWeatherRaw;
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_probability_max: string;
    wind_speed_10m_max: string;
  };
  daily: DailyWeatherRaw;
}

export interface DayForecast {
  date: string;
  dayName: string;
  formattedDate: string;
  isToday: boolean;
  weatherCode: number;
  condition: WeatherConditionInfo;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
  maxWindSpeed: number;
}

export interface WeatherConditionInfo {
  code: number;
  label: string;
  description: string;
  iconName: string; // lucide icon identifier
  badgeColor: string; // tailwind color class
  bgGradient: string; // CSS or tailwind gradient
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherRecommendation {
  id: string;
  category: 'umbrella' | 'clothing' | 'hydration' | 'outdoor' | 'wind' | 'general';
  title: string;
  description: string;
  severity: 'favorable' | 'info' | 'caution' | 'warning';
  icon: string;
}

export interface ProcessedWeatherData {
  location: GeoLocation;
  current: {
    time: string;
    temperature: number;
    apparentTemperature: number;
    weatherCode: number;
    condition: WeatherConditionInfo;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    todayMax: number;
    todayMin: number;
    todayPrecipitationProbability: number;
  };
  daily: DayForecast[];
  recommendations: WeatherRecommendation[];
  fetchedAt: string;
}
