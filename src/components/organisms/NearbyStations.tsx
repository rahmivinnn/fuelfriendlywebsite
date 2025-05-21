import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, ChevronDown, Loader2, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
type Station = {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  services: string[];
  priceLevel: number;
  photoUrl?: string;
  placeId: string;
};

type Country = {
  code: string;
  name: string;
};

type City = {
  name: string;
  countryCode: string;
};

// Mock data for countries (in production, this would come from an API)
const countries: Country[] = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'North Korea' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' }
];

// Mock data for cities (in production, this would be fetched based on selected country)
const cities: City[] = [
  // United States
  { name: 'New York', countryCode: 'US' },
  { name: 'Los Angeles', countryCode: 'US' },
  { name: 'Chicago', countryCode: 'US' },
  { name: 'Houston', countryCode: 'US' },
  { name: 'Phoenix', countryCode: 'US' },
  { name: 'Philadelphia', countryCode: 'US' },
  { name: 'San Antonio', countryCode: 'US' },
  { name: 'San Diego', countryCode: 'US' },
  { name: 'Dallas', countryCode: 'US' },
  { name: 'San Jose', countryCode: 'US' },
  { name: 'Austin', countryCode: 'US' },
  { name: 'Jacksonville', countryCode: 'US' },
  { name: 'Fort Worth', countryCode: 'US' },
  { name: 'Columbus', countryCode: 'US' },
  { name: 'Indianapolis', countryCode: 'US' },
  { name: 'Charlotte', countryCode: 'US' },
  { name: 'San Francisco', countryCode: 'US' },
  { name: 'Seattle', countryCode: 'US' },
  { name: 'Denver', countryCode: 'US' },
  { name: 'Washington DC', countryCode: 'US' },
  { name: 'Boston', countryCode: 'US' },
  { name: 'Nashville', countryCode: 'US' },
  { name: 'Baltimore', countryCode: 'US' },
  { name: 'Oklahoma City', countryCode: 'US' },
  { name: 'Portland', countryCode: 'US' },
  { name: 'Las Vegas', countryCode: 'US' },
  { name: 'Memphis', countryCode: 'US' },
  { name: 'Louisville', countryCode: 'US' },
  { name: 'Detroit', countryCode: 'US' },
  { name: 'Milwaukee', countryCode: 'US' },

  // United Kingdom
  { name: 'London', countryCode: 'GB' },
  { name: 'Manchester', countryCode: 'GB' },
  { name: 'Birmingham', countryCode: 'GB' },
  { name: 'Glasgow', countryCode: 'GB' },
  { name: 'Liverpool', countryCode: 'GB' },
  { name: 'Bristol', countryCode: 'GB' },
  { name: 'Sheffield', countryCode: 'GB' },
  { name: 'Leeds', countryCode: 'GB' },
  { name: 'Edinburgh', countryCode: 'GB' },
  { name: 'Leicester', countryCode: 'GB' },
  { name: 'Coventry', countryCode: 'GB' },
  { name: 'Bradford', countryCode: 'GB' },
  { name: 'Cardiff', countryCode: 'GB' },
  { name: 'Belfast', countryCode: 'GB' },
  { name: 'Nottingham', countryCode: 'GB' },

  // Canada
  { name: 'Toronto', countryCode: 'CA' },
  { name: 'Montreal', countryCode: 'CA' },
  { name: 'Vancouver', countryCode: 'CA' },
  { name: 'Calgary', countryCode: 'CA' },
  { name: 'Edmonton', countryCode: 'CA' },
  { name: 'Ottawa', countryCode: 'CA' },
  { name: 'Winnipeg', countryCode: 'CA' },
  { name: 'Quebec City', countryCode: 'CA' },
  { name: 'Hamilton', countryCode: 'CA' },
  { name: 'Kitchener', countryCode: 'CA' },

  // Australia
  { name: 'Sydney', countryCode: 'AU' },
  { name: 'Melbourne', countryCode: 'AU' },
  { name: 'Brisbane', countryCode: 'AU' },
  { name: 'Perth', countryCode: 'AU' },
  { name: 'Adelaide', countryCode: 'AU' },
  { name: 'Gold Coast', countryCode: 'AU' },
  { name: 'Newcastle', countryCode: 'AU' },
  { name: 'Canberra', countryCode: 'AU' },
  { name: 'Wollongong', countryCode: 'AU' },
  { name: 'Hobart', countryCode: 'AU' },

  // Germany
  { name: 'Berlin', countryCode: 'DE' },
  { name: 'Hamburg', countryCode: 'DE' },
  { name: 'Munich', countryCode: 'DE' },
  { name: 'Cologne', countryCode: 'DE' },
  { name: 'Frankfurt', countryCode: 'DE' },
  { name: 'Stuttgart', countryCode: 'DE' },
  { name: 'Düsseldorf', countryCode: 'DE' },
  { name: 'Leipzig', countryCode: 'DE' },
  { name: 'Dortmund', countryCode: 'DE' },
  { name: 'Essen', countryCode: 'DE' },

  // France
  { name: 'Paris', countryCode: 'FR' },
  { name: 'Marseille', countryCode: 'FR' },
  { name: 'Lyon', countryCode: 'FR' },
  { name: 'Toulouse', countryCode: 'FR' },
  { name: 'Nice', countryCode: 'FR' },
  { name: 'Nantes', countryCode: 'FR' },
  { name: 'Strasbourg', countryCode: 'FR' },
  { name: 'Montpellier', countryCode: 'FR' },
  { name: 'Bordeaux', countryCode: 'FR' },
  { name: 'Lille', countryCode: 'FR' },

  // Japan
  { name: 'Tokyo', countryCode: 'JP' },
  { name: 'Yokohama', countryCode: 'JP' },
  { name: 'Osaka', countryCode: 'JP' },
  { name: 'Nagoya', countryCode: 'JP' },
  { name: 'Sapporo', countryCode: 'JP' },
  { name: 'Fukuoka', countryCode: 'JP' },
  { name: 'Kobe', countryCode: 'JP' },
  { name: 'Kyoto', countryCode: 'JP' },
  { name: 'Kawasaki', countryCode: 'JP' },
  { name: 'Saitama', countryCode: 'JP' },

  // China
  { name: 'Beijing', countryCode: 'CN' },
  { name: 'Shanghai', countryCode: 'CN' },
  { name: 'Guangzhou', countryCode: 'CN' },
  { name: 'Shenzhen', countryCode: 'CN' },
  { name: 'Chengdu', countryCode: 'CN' },
  { name: 'Tianjin', countryCode: 'CN' },
  { name: 'Wuhan', countryCode: 'CN' },
  { name: 'Dongguan', countryCode: 'CN' },
  { name: 'Chongqing', countryCode: 'CN' },
  { name: 'Nanjing', countryCode: 'CN' },

  // India
  { name: 'Mumbai', countryCode: 'IN' },
  { name: 'Delhi', countryCode: 'IN' },
  { name: 'Bangalore', countryCode: 'IN' },
  { name: 'Hyderabad', countryCode: 'IN' },
  { name: 'Chennai', countryCode: 'IN' },
  { name: 'Kolkata', countryCode: 'IN' },
  { name: 'Ahmedabad', countryCode: 'IN' },
  { name: 'Pune', countryCode: 'IN' },
  { name: 'Surat', countryCode: 'IN' },
  { name: 'Jaipur', countryCode: 'IN' },

  // Brazil
  { name: 'São Paulo', countryCode: 'BR' },
  { name: 'Rio de Janeiro', countryCode: 'BR' },
  { name: 'Brasília', countryCode: 'BR' },
  { name: 'Salvador', countryCode: 'BR' },
  { name: 'Fortaleza', countryCode: 'BR' },
  { name: 'Belo Horizonte', countryCode: 'BR' },
  { name: 'Manaus', countryCode: 'BR' },
  { name: 'Curitiba', countryCode: 'BR' },
  { name: 'Recife', countryCode: 'BR' },
  { name: 'Porto Alegre', countryCode: 'BR' },

  // Indonesia
  { name: 'Jakarta', countryCode: 'ID' },
  { name: 'Surabaya', countryCode: 'ID' },
  { name: 'Bandung', countryCode: 'ID' },
  { name: 'Medan', countryCode: 'ID' },
  { name: 'Semarang', countryCode: 'ID' },

  // Mexico
  { name: 'Mexico City', countryCode: 'MX' },
  { name: 'Guadalajara', countryCode: 'MX' },
  { name: 'Monterrey', countryCode: 'MX' },
  { name: 'Puebla', countryCode: 'MX' },
  { name: 'Tijuana', countryCode: 'MX' },

  // South Africa
  { name: 'Johannesburg', countryCode: 'ZA' },
  { name: 'Cape Town', countryCode: 'ZA' },
  { name: 'Durban', countryCode: 'ZA' },
  { name: 'Pretoria', countryCode: 'ZA' },
  { name: 'Port Elizabeth', countryCode: 'ZA' },

  // This would be expanded to include major cities for each country
];

// Mock data for stations (in production, this would come from Google Places API)
const mockStations: Station[] = [
  {
    id: '1',
    name: 'Shell Gas Station',
    address: '123 Main St, New York, NY 10001',
    distance: '0.5 miles',
    rating: 4.5,
    isOpen: true,
    services: ['Fuel', 'Car Wash', 'Convenience Store'],
    priceLevel: 2,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jnEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  },
  {
    id: '2',
    name: 'Exxon Mobil',
    address: '456 Broadway, New York, NY 10012',
    distance: '1.2 miles',
    rating: 4.2,
    isOpen: true,
    services: ['Fuel', 'ATM', 'Convenience Store'],
    priceLevel: 3,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jlCX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  },
  {
    id: '3',
    name: 'BP Gas Station',
    address: '789 5th Ave, New York, NY 10022',
    distance: '1.8 miles',
    rating: 3.8,
    isOpen: false,
    services: ['Fuel', 'Electric Charging', 'Car Wash'],
    priceLevel: 2,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jmEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  },
  {
    id: '4',
    name: 'Chevron',
    address: '321 Park Ave, New York, NY 10016',
    distance: '2.3 miles',
    rating: 4.0,
    isOpen: true,
    services: ['Fuel', 'Convenience Store', 'Restaurant'],
    priceLevel: 1,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jkEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  },
];

const NearbyStations: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { toast } = useToast();

  // Filter cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const filtered = cities.filter(city => city.countryCode === selectedCountry);
      setFilteredCities(filtered);
      setSelectedCity('');
    } else {
      setFilteredCities([]);
    }
  }, [selectedCountry]);

  // Handle search
  const handleSearch = () => {
    if (!selectedCountry || !selectedCity) {
      toast({
        title: 'Selection Required',
        description: 'Please select both a country and a city to search for nearby stations.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(false);

    // Simulate API call to Google Places
    // In a real implementation, this would call the Google Places API with the selected country and city
    setTimeout(() => {
      // Customize the mock data to reflect the selected city and country
      const customizedStations = mockStations.map(station => ({
        ...station,
        address: station.address.replace('New York, NY', `${selectedCity}, ${countries.find(c => c.code === selectedCountry)?.name}`),
      }));

      setStations(customizedStations);
      setIsLoading(false);
      setHasSearched(true);

      toast({
        title: 'Stations Found',
        description: `Found ${customizedStations.length} fuel stations in ${selectedCity}, ${countries.find(c => c.code === selectedCountry)?.name}.`,
      });
    }, 1500);
  };

  // Handle view station details
  const handleViewDetails = (placeId: string) => {
    // In production, this would open Google Maps with the place details
    window.open(`https://www.google.com/maps/place/?q=place_id:${placeId}`, '_blank');
  };

  // Render price level
  const renderPriceLevel = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={`text-sm ${index < level ? 'text-green-500' : 'text-gray-300'}`}>
          $
        </span>
      ));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <MapPin className="mr-2 text-green-500" />
          Find Nearby Fuel Stations
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Select from 195 countries worldwide and find fuel stations registered on Google Maps in your chosen city.
          Get real-time information on prices, services, and more.
        </p>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Search for a specific station or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="max-h-[300px] overflow-y-auto">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">All 195 countries available</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Select
                value={selectedCity}
                onValueChange={setSelectedCity}
                disabled={!selectedCountry || filteredCities.length === 0}
              >
                <SelectTrigger className={selectedCountry ? "border-green-500 focus:ring-green-500" : ""}>
                  <SelectValue placeholder={!selectedCountry ? "Select a country first" : filteredCities.length === 0 ? "No cities available" : "Select a city"} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-500">No cities available for this country yet</div>
                    )}
                  </div>
                </SelectContent>
              </Select>
              {selectedCountry && filteredCities.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">{filteredCities.length} cities available</p>
              )}
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={isLoading || !selectedCountry || !selectedCity}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Stations
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {hasSearched && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Fuel Stations in {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {stations.length} stations • Updated just now
                  </p>
                </div>
                <Tabs defaultValue="list" className="w-[200px] mt-3 md:mt-0">
                  <TabsList>
                    <TabsTrigger value="list" onClick={() => setViewType('list')}>List View</TabsTrigger>
                    <TabsTrigger value="map" onClick={() => setViewType('map')}>Map View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {searchQuery && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mb-4 flex items-center">
                  <Info size={18} className="text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Filtering results for "{searchQuery}" in {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}
                  </p>
                </div>
              )}
            </div>

            {viewType === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stations.map((station) => (
                  <Card key={station.id} className="overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      {station.photoUrl ? (
                        <img
                          src={station.photoUrl}
                          alt={station.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                          <MapPin size={40} className="text-gray-400" />
                        </div>
                      )}
                      <Badge
                        className={`absolute top-2 right-2 ${
                          station.isOpen ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {station.isOpen ? 'Open Now' : 'Closed'}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between">
                        {station.name}
                        <span className="text-sm font-normal text-gray-500">
                          {station.distance}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-xs truncate">
                        {station.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{station.rating}</span>
                        </div>
                        <div>{renderPriceLevel(station.priceLevel)}</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {station.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleViewDetails(station.placeId)}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View on Google Maps
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-[500px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 opacity-50 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center">
                    <Info size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Interactive Map View</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      This would display an interactive Google Map with markers for each of the {stations.length} fuel stations in {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => window.open(`https://www.google.com/maps/search/gas+stations+in+${selectedCity},+${countries.find(c => c.code === selectedCountry)?.name}`, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View on Google Maps
                      </Button>
                      <Button
                        variant="default"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => setViewType('list')}
                      >
                        Return to List View
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-20">
                  <Badge className="bg-green-500">
                    {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}
                  </Badge>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NearbyStations;
