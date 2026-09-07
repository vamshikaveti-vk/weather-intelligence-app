import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudHail,
  CloudSnow,
  Snowflake,
  CloudLightning,
  Droplets,
  Droplet,
  Umbrella,
  Shirt,
  Sparkles,
  Home,
  Compass,
  Wind,
  LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunMedium':
      return <SunMedium {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudRain':
    case 'CloudRainWind':
      return <CloudRain {...props} />;
    case 'CloudHail':
      return <CloudHail {...props} />;
    case 'CloudSnow':
      return <CloudSnow {...props} />;
    case 'Snowflake':
    case 'ThermometerSnowflake':
      return <Snowflake {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Droplet':
      return <Droplet {...props} />;
    case 'Umbrella':
      return <Umbrella {...props} />;
    case 'Shirt':
      return <Shirt {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Home':
      return <Home {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    default:
      return <Sun {...props} />;
  }
};
