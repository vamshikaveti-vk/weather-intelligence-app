import { WeatherConditionInfo } from '../types/weather';

export function getWeatherCondition(code: number): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        code,
        label: 'Clear Sky',
        description: 'Sunny and completely clear skies',
        iconName: 'Sun',
        badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        bgGradient: 'from-amber-500/10 via-blue-500/5 to-transparent',
      };
    case 1:
      return {
        code,
        label: 'Mainly Clear',
        description: 'Mostly sunny with occasional light clouds',
        iconName: 'SunMedium',
        badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        bgGradient: 'from-amber-500/10 via-slate-800/10 to-transparent',
      };
    case 2:
      return {
        code,
        label: 'Partly Cloudy',
        description: 'Scattered clouds with periods of sunshine',
        iconName: 'CloudSun',
        badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        bgGradient: 'from-blue-500/10 via-slate-800/10 to-transparent',
      };
    case 3:
      return {
        code,
        label: 'Overcast',
        description: 'Dense cloud cover throughout the day',
        iconName: 'Cloud',
        badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
        bgGradient: 'from-slate-700/15 via-slate-800/10 to-transparent',
      };
    case 45:
      return {
        code,
        label: 'Fog',
        description: 'Reduced visibility due to atmospheric fog',
        iconName: 'CloudFog',
        badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
        bgGradient: 'from-slate-700/15 via-slate-800/10 to-transparent',
      };
    case 48:
      return {
        code,
        label: 'Depositing Rime Fog',
        description: 'Icy fog leaving crystalline frost deposits',
        iconName: 'CloudFog',
        badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        bgGradient: 'from-cyan-500/10 via-slate-800/10 to-transparent',
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: code === 51 ? 'Light Drizzle' : code === 53 ? 'Moderate Drizzle' : 'Dense Drizzle',
        description: 'Fine misty precipitation',
        iconName: 'CloudDrizzle',
        badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        bgGradient: 'from-blue-500/10 via-slate-800/10 to-transparent',
      };
    case 56:
    case 57:
      return {
        code,
        label: 'Freezing Drizzle',
        description: 'Supercooled drizzle forming ice glaze',
        iconName: 'CloudHail',
        badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        bgGradient: 'from-indigo-500/10 via-slate-800/10 to-transparent',
      };
    case 61:
      return {
        code,
        label: 'Slight Rain',
        description: 'Gentle light rain showers',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        bgGradient: 'from-blue-500/10 via-slate-800/10 to-transparent',
      };
    case 63:
      return {
        code,
        label: 'Moderate Rain',
        description: 'Steady consistent rainfall',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        bgGradient: 'from-blue-500/15 via-slate-800/10 to-transparent',
      };
    case 65:
      return {
        code,
        label: 'Heavy Rain',
        description: 'Substantial downpour and wet conditions',
        iconName: 'CloudRainWind',
        badgeColor: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
        bgGradient: 'from-blue-600/20 via-slate-800/15 to-transparent',
      };
    case 66:
    case 67:
      return {
        code,
        label: 'Freezing Rain',
        description: 'Rain that freezes on contact with ground',
        iconName: 'CloudHail',
        badgeColor: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
        bgGradient: 'from-cyan-500/20 via-blue-900/15 to-transparent',
      };
    case 71:
    case 73:
    case 75:
      return {
        code,
        label: code === 71 ? 'Slight Snow' : code === 73 ? 'Moderate Snow' : 'Heavy Snow',
        description: 'Snowfall accumulating on surfaces',
        iconName: 'CloudSnow',
        badgeColor: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
        bgGradient: 'from-sky-400/15 via-slate-800/10 to-transparent',
      };
    case 77:
      return {
        code,
        label: 'Snow Grains',
        description: 'Tiny opaque white grains of ice',
        iconName: 'Snowflake',
        badgeColor: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
        bgGradient: 'from-sky-400/15 via-slate-800/10 to-transparent',
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: code === 80 ? 'Slight Rain Showers' : code === 81 ? 'Moderate Showers' : 'Violent Rain Showers',
        description: 'Intermittent heavy rain bursts',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
        bgGradient: 'from-blue-600/20 via-indigo-900/15 to-transparent',
      };
    case 85:
    case 86:
      return {
        code,
        label: code === 85 ? 'Slight Snow Showers' : 'Heavy Snow Showers',
        description: 'Sudden bursts of snow precipitation',
        iconName: 'CloudSnow',
        badgeColor: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
        bgGradient: 'from-sky-500/15 via-blue-900/10 to-transparent',
      };
    case 95:
      return {
        code,
        label: 'Thunderstorm',
        description: 'Lightning, thunder, and gusty winds',
        iconName: 'CloudLightning',
        badgeColor: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
        bgGradient: 'from-amber-600/20 via-purple-900/15 to-transparent',
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Severe Thunderstorm & Hail',
        description: 'Violent electrical storm with hail pellets',
        iconName: 'CloudLightning',
        badgeColor: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
        bgGradient: 'from-purple-600/20 via-rose-900/15 to-transparent',
      };
    default:
      return {
        code,
        label: 'Partly Cloudy',
        description: 'Variable cloud cover',
        iconName: 'Cloud',
        badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
        bgGradient: 'from-slate-700/15 via-slate-800/10 to-transparent',
      };
  }
}
