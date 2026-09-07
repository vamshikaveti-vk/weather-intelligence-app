import { WeatherRecommendation } from '../types/weather';

interface IntelligenceInput {
  currentTemp: number; // in Celsius
  apparentTemp: number; // in Celsius
  humidity: number; // percentage
  windSpeed: number; // km/h
  weatherCode: number;
  precipitationProbability: number; // percentage
  todayMax: number; // Celsius
  todayMin: number; // Celsius
}

export function generateWeatherRecommendations(data: IntelligenceInput): WeatherRecommendation[] {
  const recommendations: WeatherRecommendation[] = [];

  // 1. Umbrella & Precipitation recommendation
  if (data.precipitationProbability >= 60 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(data.weatherCode)) {
    recommendations.push({
      id: 'umbrella-high',
      category: 'umbrella',
      title: 'Carry an Umbrella',
      description: `High rain probability (${data.precipitationProbability}%). Keep an umbrella or waterproof jacket handy for your commute.`,
      severity: 'warning',
      icon: 'Umbrella',
    });
  } else if (data.precipitationProbability >= 30) {
    recommendations.push({
      id: 'umbrella-moderate',
      category: 'umbrella',
      title: 'Possible Rain Showers',
      description: `Scattered showers possible (${data.precipitationProbability}% chance). A compact umbrella is recommended.`,
      severity: 'caution',
      icon: 'CloudRain',
    });
  } else {
    recommendations.push({
      id: 'umbrella-none',
      category: 'umbrella',
      title: 'No Rain Expected',
      description: `Precipitation probability is very low (${data.precipitationProbability}%). Rain gear will not be needed today.`,
      severity: 'favorable',
      icon: 'Sun',
    });
  }

  // 2. Temperature & Clothing recommendation
  if (data.currentTemp <= 0 || data.todayMin <= 0) {
    recommendations.push({
      id: 'clothing-freezing',
      category: 'clothing',
      title: 'Freezing Conditions — Heavy Layers',
      description: 'Sub-zero temperatures detected. Wear an insulated winter coat, thermal layers, gloves, and watch out for icy sidewalks.',
      severity: 'warning',
      icon: 'ThermometerSnowflake',
    });
  } else if (data.currentTemp < 12 || data.apparentTemp < 10) {
    recommendations.push({
      id: 'clothing-cold',
      category: 'clothing',
      title: 'Wear Warm Clothing',
      description: 'Chilly temperatures today. Dress in warm layers, a fleece or sweater, and a windproof jacket when stepping outside.',
      severity: 'caution',
      icon: 'Shirt',
    });
  } else if (data.currentTemp >= 28 || data.apparentTemp >= 30) {
    recommendations.push({
      id: 'clothing-hot',
      category: 'clothing',
      title: 'Light & Breathable Attire',
      description: 'Warm conditions ahead. Opt for lightweight, breathable fabrics, sunglasses, and UV protection.',
      severity: 'info',
      icon: 'Shirt',
    });
  } else {
    recommendations.push({
      id: 'clothing-mild',
      category: 'clothing',
      title: 'Comfortable Everyday Attire',
      description: 'Pleasant and balanced temperatures. Standard daily clothing with a light cardigan or overshirt is ideal.',
      severity: 'favorable',
      icon: 'Shirt',
    });
  }

  // 3. Hydration & Heat advisory
  if (data.currentTemp >= 30 || data.apparentTemp >= 32) {
    recommendations.push({
      id: 'hydration-high',
      category: 'hydration',
      title: 'Stay Well Hydrated',
      description: 'High heat index. Drink plenty of water throughout the day, avoid prolonged midday sun exposure, and seek shade.',
      severity: 'warning',
      icon: 'Droplets',
    });
  } else if (data.currentTemp >= 24) {
    recommendations.push({
      id: 'hydration-moderate',
      category: 'hydration',
      title: 'Keep Water Nearby',
      description: 'Warm conditions can increase water loss. Carry a reusable water bottle, especially if walking or working out.',
      severity: 'info',
      icon: 'Droplet',
    });
  }

  // 4. Outdoor Activity Favorability
  const isGoodWeatherCode = [0, 1, 2].includes(data.weatherCode);
  const isComfortableTemp = data.currentTemp >= 15 && data.currentTemp <= 26;
  const isLowWind = data.windSpeed < 22;
  const isLowRain = data.precipitationProbability <= 20;

  if (isGoodWeatherCode && isComfortableTemp && isLowWind && isLowRain) {
    recommendations.push({
      id: 'outdoor-favorable',
      category: 'outdoor',
      title: 'Favorable Outdoor Conditions',
      description: 'Conditions are optimal for outdoor walks, cycling, running, sports, or patio dining. Enjoy the great weather!',
      severity: 'favorable',
      icon: 'Sparkles',
    });
  } else if (data.precipitationProbability > 60 || data.windSpeed > 35 || data.currentTemp < 5 || data.currentTemp > 33) {
    recommendations.push({
      id: 'outdoor-unfavorable',
      category: 'outdoor',
      title: 'Consider Indoor Activities',
      description: 'Adverse weather factors (rain, high winds, or temperature extremes) make indoor fitness or entertainment more comfortable.',
      severity: 'caution',
      icon: 'Home',
    });
  } else {
    recommendations.push({
      id: 'outdoor-moderate',
      category: 'outdoor',
      title: 'Acceptable for Outdoor Activities',
      description: 'Outdoor outings are viable with slight preparation. Check hourly conditions if planning extended sessions.',
      severity: 'info',
      icon: 'Compass',
    });
  }

  // 5. Wind advisories if notable
  if (data.windSpeed >= 38) {
    recommendations.push({
      id: 'wind-strong',
      category: 'wind',
      title: 'Brisk & Gusty Winds',
      description: `Wind speeds reaching ${Math.round(data.windSpeed)} km/h. Secure loose outdoor furniture and expect buffeting winds while driving.`,
      severity: 'caution',
      icon: 'Wind',
    });
  }

  return recommendations;
}
