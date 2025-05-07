import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  ChevronDown,
  Loader2,
  ExternalLink,
  Info,
  Star,
  Heart,
  Phone,
  Navigation,
  X,
  Clock,
  Filter,
  Fuel,
  Zap,
  Coffee,
  ShoppingCart,
  Droplets,
  Car,
  CreditCard,
  Wifi,
  SortAsc,
  SortDesc,
  Locate
} from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Slider
} from "@/components/ui/slider";

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
  regularPrice: number;
  premiumPrice: number;
  dieselPrice: number;
  congestion: 'Low' | 'Medium' | 'High';
  waitTime: string;
  lastUpdated: string;
  phoneNumber: string;
  openingHours: string;
  reviews?: Review[];
  isFavorite?: boolean;
  brand?: string;
};

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  isVerified: boolean;
};

type PriceFilter = {
  min: number;
  max: number;
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

  // This would be expanded to include major cities for each country
];

// Helper function to generate random reviews
const generateReviews = (count: number): Review[] => {
  const reviewTexts = [
    "Great service and clean facilities!",
    "The prices are competitive and staff is friendly.",
    "Very convenient location with good amenities.",
    "Fast service, rarely any waiting time.",
    "Good fuel quality, my car runs smoothly.",
    "The convenience store has a good selection.",
    "Easily accessible from the highway.",
    "Modern pumps that work quickly.",
    "Fair prices compared to others in the area.",
    "Clean restrooms, which is important for me.",
    "The car wash does an excellent job.",
    "Friendly staff who are always helpful.",
    "Good coffee available in the store.",
    "Spacious area to maneuver your vehicle.",
    "The loyalty program offers good discounts.",
    "Well-lit area makes it safe at night.",
    "Fast and efficient service every time.",
    "Regular price updates keep them competitive.",
    "ATM is always working and convenient.",
    "The air pump is free and easy to use."
  ];

  const names = [
    "John S.", "Emily R.", "Michael T.", "Sarah W.", "David L.", "Jessica M.", "Robert P.",
    "Lisa K.", "James B.", "Jennifer C.", "Thomas H.", "Amanda G.", "Christopher V.",
    "Elizabeth N.", "Daniel F.", "Nicole J.", "Matthew Q.", "Rebecca Z.", "Andrew Y.",
    "Michelle X."
  ];

  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    const randomReviewIndex = Math.floor(Math.random() * reviewTexts.length);
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomRating = (Math.floor(Math.random() * 10) + 36) / 10; // Random rating from 3.6 to 4.6
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const randomHelpful = Math.floor(Math.random() * 20);

    reviews.push({
      id: `review-${i}`,
      userName: names[randomNameIndex],
      rating: randomRating,
      comment: reviewTexts[randomReviewIndex],
      date: `${randomDays} days ago`,
      helpful: randomHelpful,
      isVerified: Math.random() > 0.3,
    });
  }

  return reviews;
};

// Mock data for stations (in production, this would come from Google Places API)
const mockStations: Station[] = [
  {
    id: '1',
    name: 'ARCO Gas Point #19',
    address: '1078 Cypress Dr, Memphis, Albania',
    distance: '0.5 miles',
    rating: 4.4,
    isOpen: true,
    services: ['Fuel', 'Food Court', 'Windshield Service', 'Convenience Store', 'ATM', 'Restrooms'],
    priceLevel: 2,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jnEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    regularPrice: 2.88,
    premiumPrice: 3.28,
    dieselPrice: 3.08,
    congestion: 'Medium',
    waitTime: '5-10 min',
    lastUpdated: '17 min ago',
    phoneNumber: '(355) 555-1234',
    openingHours: '24/7',
    reviews: generateReviews(8),
    isFavorite: false,
    brand: 'ARCO',
  },
  {
    id: '2',
    name: 'RaceTrac Gas & Goods #39',
    address: '831 Magnolia Blvd, Memphis, Albania',
    distance: '0.5 miles',
    rating: 3.9,
    isOpen: true,
    services: ['Fuel', 'Restrooms', 'Coffee Shop', 'Convenience Store', 'ATM'],
    priceLevel: 3,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jlCX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    regularPrice: 2.78,
    premiumPrice: 3.18,
    dieselPrice: 2.98,
    congestion: 'Low',
    waitTime: '< 5 min',
    lastUpdated: '12 min ago',
    phoneNumber: '(355) 555-5678',
    openingHours: '24/7',
    reviews: generateReviews(6),
    isFavorite: false,
    brand: 'RaceTrac',
  },
  {
    id: '3',
    name: 'RaceTrac Gas & Goods #15',
    address: '551 Sycamore Dr, Memphis, Albania',
    distance: '0.6 miles',
    rating: 4.2,
    isOpen: true,
    services: ['Fuel', 'Electric Charging', 'Car Wash', 'ATM', 'Convenience Store'],
    priceLevel: 2,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jmEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    regularPrice: 2.72,
    premiumPrice: 3.12,
    dieselPrice: 2.92,
    congestion: 'Low',
    waitTime: '< 5 min',
    lastUpdated: '25 min ago',
    phoneNumber: '(355) 555-9012',
    openingHours: '24/7',
    reviews: generateReviews(5),
    isFavorite: false,
    brand: 'RaceTrac',
  },
  {
    id: '4',
    name: 'Sunoco Ultra Service',
    address: '321 Riverside Ave, Memphis, Albania',
    distance: '0.8 miles',
    rating: 4.0,
    isOpen: true,
    services: ['Fuel', 'Convenience Store', 'Restaurant', 'Car Wash', 'ATM', 'Restrooms'],
    priceLevel: 1,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jkEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    regularPrice: 2.95,
    premiumPrice: 3.35,
    dieselPrice: 3.15,
    congestion: 'High',
    waitTime: '10-15 min',
    lastUpdated: '15 min ago',
    phoneNumber: '(355) 555-3456',
    openingHours: '24/7',
    reviews: generateReviews(10),
    isFavorite: false,
    brand: 'Sunoco',
  },
  {
    id: '5',
    name: 'Petrol Albania',
    address: '555 Central Blvd, Memphis, Albania',
    distance: '1.2 miles',
    rating: 4.3,
    isOpen: true,
    services: ['Fuel', 'Car Wash', 'ATM', 'Convenience Store', 'Coffee Shop', 'Restrooms'],
    priceLevel: 2,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jkEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    regularPrice: 2.85,
    premiumPrice: 3.25,
    dieselPrice: 3.05,
    congestion: 'Medium',
    waitTime: '5-10 min',
    lastUpdated: '30 min ago',
    phoneNumber: '(355) 555-7890',
    openingHours: '6am - 10pm',
    reviews: generateReviews(7),
    isFavorite: false,
    brand: 'Petrol',
  },
  {
    id: '6',
    name: 'Kastrati Oil',
    address: '789 Harbor Road, Memphis, Albania',
    distance: '1.5 miles',
    rating: 3.9,
    isOpen: true,
    services: ['Fuel', 'Electric Charging', 'ATM', 'Convenience Store', 'Restrooms'],
    priceLevel: 3,
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUjq9jkEX4MxnDjlCgJHAhQprtI4-LFOvzRQBCY5QQ9P1U4Eqp1q6-5qvHfWleHNUzHr9d-1ULBNCzOBVlY1s-s9iE2QhQbLTKo1e3Jx5qXJHPDzVsj6A7Ot0TQWJ1e5u8JR2K1pFnwSQTax0iSgWjsH5LKNDGjQoLWpM&3u1000&5m1&2e1&callback=none&key=AIzaSyBhXn3YLKwUFv9xiIFRKPDjQwbC0y0P1Eo&token=32572',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    regularPrice: 2.82,
    premiumPrice: 3.22,
    dieselPrice: 3.02,
    congestion: 'Low',
    waitTime: '< 5 min',
    lastUpdated: '45 min ago',
    phoneNumber: '(355) 555-2345',
    openingHours: '24/7',
    reviews: generateReviews(9),
    isFavorite: false,
    brand: 'Kastrati',
  },
];

const NearbyStations: React.FC = () => {
  // Basic state
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { toast } = useToast();

  // Advanced features state
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showStationDetails, setShowStationDetails] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'distance' | 'price' | 'rating'>('distance');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({ min: 0, max: 10 });
  const [fuelTypeFilter, setFuelTypeFilter] = useState<'regular' | 'premium' | 'diesel'>('regular');
  const [amenityFilters, setAmenityFilters] = useState<Record<string, boolean>>({
    'ATM': false,
    'Car Wash': false,
    'Convenience Store': false,
    'Electric Charging': false,
    'Restrooms': false,
    'Coffee Shop': false,
    'Restaurant': false,
    'Wifi': false
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize with Albania and Memphis
  useEffect(() => {
    // Set default country and city
    setSelectedCountry('AL');

    // The city will be auto-selected in the other useEffect

    toast({
      title: 'Welcome to Fuel Friendly',
      description: 'Showing fuel stations in Memphis, Albania by default.',
    });

    // Optional: Get user's geolocation for future use
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, [toast]);

  // Generate default cities for countries without specific city data
  const getDefaultCitiesForCountry = (countryCode: string) => {
    // First check if we have specific cities for this country
    const specificCities = cities.filter(city => city.countryCode === countryCode);

    if (specificCities.length > 0) {
      return specificCities;
    }

    // If no specific cities, generate default ones
    const country = countries.find(c => c.code === countryCode);
    if (!country) return [];

    // Special case for Albania - always include Memphis
    if (countryCode === 'AL') {
      return [
        { name: 'Memphis', countryCode },
        { name: 'Tirana', countryCode },
        { name: 'Durrës', countryCode },
        { name: 'Vlorë', countryCode },
        { name: 'Shkodër', countryCode },
        { name: 'Elbasan', countryCode },
        { name: 'Korçë', countryCode },
        { name: 'Fier', countryCode },
        { name: 'Berat', countryCode },
        { name: 'Lushnjë', countryCode },
      ];
    }

    // Generate capital city and a few other major cities
    return [
      { name: `${country.name} City`, countryCode },
      { name: `Capital City`, countryCode },
      { name: `North ${country.name}`, countryCode },
      { name: `South ${country.name}`, countryCode },
      { name: `East ${country.name}`, countryCode },
      { name: `West ${country.name}`, countryCode },
      { name: `Central ${country.name}`, countryCode },
      { name: `New ${country.name}`, countryCode },
      { name: `Old ${country.name}`, countryCode },
      { name: `${country.name} Harbor`, countryCode },
    ];
  };

  // Filter cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const filtered = getDefaultCitiesForCountry(selectedCountry);
      setFilteredCities(filtered);

      // Auto-select the first city
      if (filtered.length > 0) {
        setSelectedCity(filtered[0].name);
      } else {
        setSelectedCity('');
      }

      // Auto-search when country changes (if a city is available)
      if (filtered.length > 0) {
        // Small delay to ensure the city is set
        setTimeout(() => {
          handleSearch();
        }, 100);
      }
    } else {
      setFilteredCities([]);
      setSelectedCity('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  // Handle search
  const handleSearch = () => {
    if (!selectedCountry || !selectedCity) {
      // Don't show error toast when auto-searching
      if (isLoading) return;

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
      // For Albania, keep the original addresses (they're already set to Memphis, Albania)
      // For other countries, customize the mock data to reflect the selected city and country
      const customizedStations = mockStations.map(station => {
        // If we're already showing Albania and Memphis, don't modify the addresses
        if (selectedCountry === 'AL' && selectedCity === 'Memphis') {
          return {
            ...station,
            // Ensure the address explicitly shows Memphis, Albania (not Memphis, TN)
            address: station.address.includes('Memphis, Albania')
              ? station.address
              : station.address.replace(/Memphis, TN|[^,]+, [^,]+$/, 'Memphis, Albania'),
          };
        }

        // Otherwise, update the addresses to match the selected city and country
        return {
          ...station,
          address: station.address.replace(/Memphis, Albania|Memphis, TN|[^,]+, [^,]+$/, `${selectedCity}, ${countries.find(c => c.code === selectedCountry)?.name}`),
        };
      });

      // Apply any active filters
      let filteredStations = [...customizedStations];

      // Apply price filter based on selected fuel type
      if (priceFilter.min > 0 || priceFilter.max < 10) {
        filteredStations = filteredStations.filter(station => {
          const price = fuelTypeFilter === 'regular'
            ? station.regularPrice
            : fuelTypeFilter === 'premium'
              ? station.premiumPrice
              : station.dieselPrice;

          return price >= priceFilter.min && price <= priceFilter.max;
        });
      }

      // Apply amenity filters
      const selectedAmenities = Object.entries(amenityFilters)
        .filter(([_, isSelected]) => isSelected)
        .map(([amenity]) => amenity);

      if (selectedAmenities.length > 0) {
        filteredStations = filteredStations.filter(station =>
          selectedAmenities.every(amenity => station.services.includes(amenity))
        );
      }

      // Apply sorting
      if (sortOption === 'distance') {
        filteredStations.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      } else if (sortOption === 'price') {
        filteredStations.sort((a, b) => {
          const priceA = fuelTypeFilter === 'regular'
            ? a.regularPrice
            : fuelTypeFilter === 'premium'
              ? a.premiumPrice
              : a.dieselPrice;

          const priceB = fuelTypeFilter === 'regular'
            ? b.regularPrice
            : fuelTypeFilter === 'premium'
              ? b.premiumPrice
              : b.dieselPrice;

          return priceA - priceB;
        });
      } else if (sortOption === 'rating') {
        filteredStations.sort((a, b) => b.rating - a.rating);
      }

      // Mark favorites
      filteredStations = filteredStations.map(station => ({
        ...station,
        isFavorite: favorites.includes(station.id)
      }));

      setStations(filteredStations);
      setIsLoading(false);
      setHasSearched(true);

      toast({
        title: 'Stations Found',
        description: `Found ${filteredStations.length} fuel stations in ${selectedCity}, ${countries.find(c => c.code === selectedCountry)?.name}.`,
      });
    }, 1500);
  };

  // Handle view station details
  const handleViewDetails = (station: Station) => {
    setSelectedStation(station);
    setShowStationDetails(true);
  };

  // Handle open in Google Maps
  const handleOpenInGoogleMaps = (placeId: string) => {
    window.open(`https://www.google.com/maps/place/?q=place_id:${placeId}`, '_blank');
  };

  // Handle toggle favorite
  const handleToggleFavorite = (stationId: string) => {
    setFavorites(prev => {
      if (prev.includes(stationId)) {
        // Remove from favorites
        const newFavorites = prev.filter(id => id !== stationId);

        toast({
          title: 'Removed from Favorites',
          description: 'This station has been removed from your favorites.',
        });

        return newFavorites;
      } else {
        // Add to favorites
        const newFavorites = [...prev, stationId];

        toast({
          title: 'Added to Favorites',
          description: 'This station has been added to your favorites.',
        });

        return newFavorites;
      }
    });

    // Update the stations list to reflect the favorite status
    setStations(prev =>
      prev.map(station =>
        station.id === stationId
          ? { ...station, isFavorite: !station.isFavorite }
          : station
      )
    );
  };

  // Handle filter change
  const handleAmenityFilterChange = (amenity: string) => {
    setAmenityFilters(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  // Handle sort change
  const handleSortChange = (sort: 'distance' | 'price' | 'rating') => {
    setSortOption(sort);

    // Re-sort the stations
    setStations(prev => {
      const newStations = [...prev];

      if (sort === 'distance') {
        newStations.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      } else if (sort === 'price') {
        newStations.sort((a, b) => {
          const priceA = fuelTypeFilter === 'regular'
            ? a.regularPrice
            : fuelTypeFilter === 'premium'
              ? a.premiumPrice
              : a.dieselPrice;

          const priceB = fuelTypeFilter === 'regular'
            ? b.regularPrice
            : fuelTypeFilter === 'premium'
              ? b.premiumPrice
              : b.dieselPrice;

          return priceA - priceB;
        });
      } else if (sort === 'rating') {
        newStations.sort((a, b) => b.rating - a.rating);
      }

      return newStations;
    });
  };

  // Handle fuel type filter change
  const handleFuelTypeChange = (type: 'regular' | 'premium' | 'diesel') => {
    setFuelTypeFilter(type);

    // If sort is by price, re-sort based on the new fuel type
    if (sortOption === 'price') {
      handleSortChange('price');
    }
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

  // Render fuel price
  const renderFuelPrice = (station: Station, type: 'regular' | 'premium' | 'diesel') => {
    const price = type === 'regular'
      ? station.regularPrice
      : type === 'premium'
        ? station.premiumPrice
        : station.dieselPrice;

    return (
      <div className="flex items-center">
        <span className={`font-semibold ${type === fuelTypeFilter ? 'text-green-600' : ''}`}>
          ${price.toFixed(2)}
        </span>
        <span className="text-xs text-gray-500 ml-1">
          {type === 'regular' ? 'Regular' : type === 'premium' ? 'Premium' : 'Diesel'}
        </span>
      </div>
    );
  };

  // Render service icon
  const renderServiceIcon = (service: string) => {
    switch (service) {
      case 'ATM':
        return <CreditCard size={16} className="mr-1" />;
      case 'Car Wash':
        return <Droplets size={16} className="mr-1" />;
      case 'Convenience Store':
        return <ShoppingCart size={16} className="mr-1" />;
      case 'Electric Charging':
        return <Zap size={16} className="mr-1" />;
      case 'Restrooms':
        return <MapPin size={16} className="mr-1" />;
      case 'Coffee Shop':
        return <Coffee size={16} className="mr-1" />;
      case 'Restaurant':
        return <Fuel size={16} className="mr-1" />;
      case 'Wifi':
        return <Wifi size={16} className="mr-1" />;
      default:
        return <Info size={16} className="mr-1" />;
    }
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                onValueChange={(value) => {
                  setSelectedCity(value);
                  // Auto-search when city changes
                  if (value && selectedCountry) {
                    setTimeout(() => {
                      handleSearch();
                    }, 100);
                  }
                }}
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
                      <div className="p-2 text-center text-gray-500">Select another country</div>
                    )}
                  </div>
                </SelectContent>
              </Select>
              {selectedCountry && filteredCities.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {filteredCities.length} cities available
                  {selectedCity && <span className="text-green-500"> • Auto-selected</span>}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={isLoading || !selectedCountry || !selectedCity}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : hasSearched ? (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Refresh Results
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Find Stations
                    </>
                  )}
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (navigator.geolocation) {
                            setIsLoading(true);
                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                setUserLocation({
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude
                                });

                                // Always set to Albania and Memphis
                                setSelectedCountry('AL');
                                setSelectedCity('Memphis');

                                setTimeout(() => {
                                  handleSearch();
                                }, 500);
                              },
                              (error) => {
                                setIsLoading(false);
                                toast({
                                  title: 'Location Error',
                                  description: 'Could not access your location. Please select a country and city manually.',
                                  variant: 'destructive',
                                });
                              }
                            );
                          }
                        }}
                      >
                        <Locate className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use my current location</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={14} />
                  Filters
                  {Object.values(amenityFilters).some(v => v) && (
                    <Badge className="ml-1 bg-green-500 text-white h-5 w-5 p-0 flex items-center justify-center rounded-full">
                      {Object.values(amenityFilters).filter(v => v).length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(amenityFilters).map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`filter-${amenity}`}
                          checked={amenityFilters[amenity]}
                          onChange={() => handleAmenityFilterChange(amenity)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={`filter-${amenity}`} className="text-sm flex items-center">
                          {renderServiceIcon(amenity)}
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Price Range (${priceFilter.min.toFixed(2)} - ${priceFilter.max.toFixed(2)})</h4>
                    <Slider
                      defaultValue={[priceFilter.min, priceFilter.max]}
                      min={2.5}
                      max={5.0}
                      step={0.1}
                      onValueChange={(values) => {
                        setPriceFilter({ min: values[0], max: values[1] });
                      }}
                      className="mt-6"
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAmenityFilters({
                          'ATM': false,
                          'Car Wash': false,
                          'Convenience Store': false,
                          'Electric Charging': false,
                          'Restrooms': false,
                          'Coffee Shop': false,
                          'Restaurant': false,
                          'Wifi': false
                        });
                        setPriceFilter({ min: 0, max: 10 });
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        if (hasSearched) {
                          handleSearch();
                        }
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Select value={fuelTypeFilter} onValueChange={(value: 'regular' | 'premium' | 'diesel') => handleFuelTypeChange(value)}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOption} onValueChange={(value: 'distance' | 'price' | 'rating') => handleSortChange(value)}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            {favorites.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  if (hasSearched) {
                    setStations(prev => {
                      // Move favorites to the top
                      const favs = prev.filter(s => favorites.includes(s.id));
                      const others = prev.filter(s => !favorites.includes(s.id));
                      return [...favs, ...others];
                    });

                    toast({
                      title: 'Favorites First',
                      description: `Showing ${favorites.length} favorite stations at the top.`,
                    });
                  }
                }}
              >
                <Heart size={14} className="text-red-500" />
                Favorites ({favorites.length})
              </Button>
            )}
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
                {stations.map((station, index) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    className="h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col border-2 hover:border-green-500 transition-all duration-300">
                      <div className="h-48 bg-gray-200 relative overflow-hidden group">
                        {station.photoUrl ? (
                          <motion.img
                            src={station.photoUrl}
                            alt={station.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            whileHover={{ scale: 1.05 }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                            <MapPin size={40} className="text-gray-400" />
                          </div>
                        )}
                        <Badge
                          className={`absolute top-2 right-2 ${
                            station.isOpen ? 'bg-green-500' : 'bg-red-500'
                          } transition-all duration-300 hover:scale-110`}
                        >
                          {station.isOpen ? 'Open Now' : 'Closed'}
                        </Badge>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-2 left-2"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/80 hover:bg-white rounded-full h-8 w-8 shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(station.id);
                            }}
                          >
                            <Heart
                              size={16}
                              className={station.isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
                            />
                          </Button>
                        </motion.div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-0">
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="bg-white/90 text-black text-xs font-bold">
                              {station.brand}
                            </Badge>
                            <div className="flex items-center">
                              <Badge variant="outline" className="bg-white/90 text-black text-xs mr-1">
                                {station.congestion === 'Low' ? '🟢 Low Traffic' :
                                 station.congestion === 'Medium' ? '🟡 Medium Traffic' :
                                 '🔴 High Traffic'}
                              </Badge>
                              <Badge variant="outline" className="bg-white/90 text-black text-xs">
                                {station.waitTime}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex justify-between group">
                          <span className="truncate mr-2 group-hover:text-green-600 transition-colors duration-300">{station.name}</span>
                          <span className="text-sm font-normal text-gray-500 whitespace-nowrap">
                            {station.distance}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-xs truncate">
                          {station.address}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <motion.span
                                  key={star}
                                  className={`${star <= Math.round(station.rating) ? "text-yellow-500" : "text-gray-300"}`}
                                  whileHover={{ scale: 1.2, rotate: 5 }}
                                >
                                  ★
                                </motion.span>
                              ))}
                            </div>
                            <span className="ml-1">{station.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Updated {station.lastUpdated}
                          </div>
                        </div>

                        <motion.div
                          className="grid grid-cols-3 gap-1 mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                          whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                        >
                          {renderFuelPrice(station, 'regular')}
                          {renderFuelPrice(station, 'premium')}
                          {renderFuelPrice(station, 'diesel')}
                        </motion.div>

                        <div className="flex flex-wrap gap-1">
                          {station.services.slice(0, 3).map((service, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }}>
                              <Badge variant="outline" className="text-xs flex items-center hover:bg-green-50 hover:text-green-700 transition-colors duration-300">
                                {renderServiceIcon(service)}
                                {service}
                              </Badge>
                            </motion.div>
                          ))}
                          {station.services.length > 3 && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-green-50">
                                  +{station.services.length - 3} more
                                </Badge>
                              </PopoverTrigger>
                              <PopoverContent className="w-48 p-2">
                                <div className="space-y-1">
                                  {station.services.slice(3).map((service, index) => (
                                    <div key={index} className="flex items-center text-sm">
                                      {renderServiceIcon(service)}
                                      {service}
                                    </div>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-2 gap-2">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            variant="outline"
                            className="w-full text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleViewDetails(station)}
                          >
                            <Info size={16} className="mr-2" />
                            Details
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            variant="default"
                            className="w-full bg-green-500 hover:bg-green-600"
                            onClick={() => handleOpenInGoogleMaps(station.placeId)}
                          >
                            <Navigation size={16} className="mr-2" />
                            Directions
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg h-[500px] overflow-hidden relative"
              >
                {/* Interactive map implementation */}
                <div
                  ref={mapRef}
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=" +
                      selectedCity + "," + countries.find(c => c.code === selectedCountry)?.name +
                      "&zoom=13&size=1200x500&maptype=roadmap&markers=color:green|label:S|" +
                      selectedCity + "," + countries.find(c => c.code === selectedCountry)?.name +
                      "&key=YOUR_API_KEY')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Map overlay with station markers */}
                  <div className="absolute inset-0">
                    {/* Simulated station markers */}
                    {stations.map((station, index) => (
                      <motion.div
                        key={station.id}
                        className="absolute"
                        style={{
                          left: `${20 + (index * 5) + Math.random() * 60}%`,
                          top: `${20 + (index * 3) + Math.random() * 60}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                      >
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className={`rounded-full h-8 w-8 p-0 shadow-lg border-2 ${
                                station.isOpen ? 'bg-green-500 border-white text-white' : 'bg-red-500 border-white text-white'
                              }`}
                            >
                              {station.isFavorite ? <Heart className="h-4 w-4 fill-white" /> : <MapPin className="h-4 w-4" />}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-72 p-0 shadow-xl">
                            <div className="relative h-32 bg-gray-200">
                              {station.photoUrl ? (
                                <img
                                  src={station.photoUrl}
                                  alt={station.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <MapPin size={32} className="text-gray-400" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                              <div className="absolute bottom-2 left-2 right-2 text-white">
                                <h3 className="font-bold text-lg">{station.name}</h3>
                                <p className="text-xs opacity-90 truncate">{station.address}</p>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <span className="text-yellow-500 mr-1">★</span>
                                  <span>{station.rating}</span>
                                </div>
                                <Badge className={station.isOpen ? 'bg-green-500' : 'bg-red-500'}>
                                  {station.isOpen ? 'Open Now' : 'Closed'}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-1 mb-2 text-center text-sm">
                                <div>
                                  <div className="font-semibold text-green-600">${station.regularPrice.toFixed(2)}</div>
                                  <div className="text-xs text-gray-500">Regular</div>
                                </div>
                                <div>
                                  <div className="font-semibold">${station.premiumPrice.toFixed(2)}</div>
                                  <div className="text-xs text-gray-500">Premium</div>
                                </div>
                                <div>
                                  <div className="font-semibold">${station.dieselPrice.toFixed(2)}</div>
                                  <div className="text-xs text-gray-500">Diesel</div>
                                </div>
                              </div>
                              <div className="flex justify-between gap-2 mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleViewDetails(station)}
                                >
                                  <Info size={14} className="mr-1" />
                                  Details
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="flex-1 bg-green-500 hover:bg-green-600"
                                  onClick={() => handleOpenInGoogleMaps(station.placeId)}
                                >
                                  <Navigation size={14} className="mr-1" />
                                  Directions
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </motion.div>
                    ))}
                  </div>

                  {/* Map controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
                        onClick={() => setViewType('list')}
                      >
                        <Search size={14} className="mr-1" />
                        List View
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
                        onClick={() => window.open(`https://www.google.com/maps/search/gas+stations+in+${selectedCity},+${countries.find(c => c.code === selectedCountry)?.name}`, '_blank')}
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Google Maps
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-4 left-4 z-20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
                    <h3 className="font-medium text-sm mb-1 flex items-center">
                      <MapPin size={14} className="text-green-500 mr-1" />
                      {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Showing {stations.length} fuel stations in this area
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 right-4 z-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <Badge className="bg-green-500 shadow-lg">
                    {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}
                  </Badge>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Station Details Dialog */}
      <Dialog open={showStationDetails} onOpenChange={setShowStationDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedStation && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-bold">{selectedStation.name}</DialogTitle>
                  <Badge className={selectedStation.isOpen ? 'bg-green-500' : 'bg-red-500'}>
                    {selectedStation.isOpen ? 'Open Now' : 'Closed'}
                  </Badge>
                </div>
                <DialogDescription className="text-sm">
                  {selectedStation.address}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <div className="h-48 md:h-64 bg-gray-200 rounded-md overflow-hidden mb-4">
                    {selectedStation.photoUrl ? (
                      <img
                        src={selectedStation.photoUrl}
                        alt={selectedStation.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <MapPin size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Clock size={14} className="mr-1" /> Hours
                      </h4>
                      <p className="font-medium">{selectedStation.openingHours}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Phone size={14} className="mr-1" /> Phone
                      </h4>
                      <p className="font-medium">{selectedStation.phoneNumber}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Navigation size={14} className="mr-1" /> Distance
                      </h4>
                      <p className="font-medium">{selectedStation.distance}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Clock size={14} className="mr-1" /> Wait Time
                      </h4>
                      <p className="font-medium">{selectedStation.waitTime}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Fuel Prices</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Regular</div>
                        <div className="text-xl font-bold text-green-600">${selectedStation.regularPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Premium</div>
                        <div className="text-xl font-bold">${selectedStation.premiumPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Diesel</div>
                        <div className="text-xl font-bold">${selectedStation.dieselPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Last updated: {selectedStation.lastUpdated}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Services & Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStation.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="flex items-center">
                          {renderServiceIcon(service)}
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500">Rating & Reviews</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1 text-lg">★</span>
                        <span className="font-bold text-lg">{selectedStation.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({selectedStation.reviews?.length || 0} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {selectedStation.reviews?.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-3 last:border-0">
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-2">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium flex items-center">
                                  {review.userName}
                                  {review.isVerified && (
                                    <Badge variant="outline" className="ml-2 text-xs">Verified</Badge>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span>{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm mt-1">{review.comment}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              👍 Helpful ({review.helpful})
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleToggleFavorite(selectedStation.id)}
                >
                  <Heart
                    size={16}
                    className={`mr-2 ${selectedStation.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {selectedStation.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(`tel:${selectedStation.phoneNumber.replace(/[^\d+]/g, '')}`, '_self')}
                >
                  <Phone size={16} className="mr-2" />
                  Call Station
                </Button>
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => handleOpenInGoogleMaps(selectedStation.placeId)}
                >
                  <Navigation size={16} className="mr-2" />
                  Get Directions
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NearbyStations;
