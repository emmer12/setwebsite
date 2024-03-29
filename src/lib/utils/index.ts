import * as uuid from "uuid";
import { NotificationManager } from "react-notifications";
import { format } from "date-fns"

export function serialize(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export const getDiscount = (price: number, discount: number) => {
  return Math.round((price * discount) / 100) + price;
};

export const formattedMoney = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabw", code: "ZN" },
];

export const vendorCategories = [
  "Production Company",
  "Event Planning",
  "Venue",
  "Florist",
  "Cake Baker",
];

export const citiesUAE = [
  { name: "Abu Dhabi" },
  { name: "Dubai" },
  { name: "Sharjah" },
  { name: "Al Ain" },
  { name: "Ajman" },
  { name: "Ras Al Khaimah" },
  { name: "Fujairah" },
  { name: "Umm Al Quwain" },
  { name: "Khor Fakkan" },
  { name: "Dibba Al-Fujairah" },
  { name: "Dibba Al-Hisn" },
  { name: "Al-Madam" },
  { name: "Al Hamriyah" },
  { name: "Al-Jazirah Al-Hamra" },
  { name: "Masafi" },
  { name: "Al-Dhaid" },
  { name: "Al-Madam" },
  { name: "Hatta" },
  {
    name: "All Cities",
  },
];

export const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters
    .replace(/\s+/g, "-") // Replace whitespace with hyphens
    .replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
    .trim(); // Trim leading and trailing whitespace
};

export const paginate = (totalCount: any, page: any, limit: number) => {
  const totalPages = Math.ceil(totalCount / limit);

  const nextPage = page < totalPages ? parseInt(page) + 1 : null;
  const prevPage = page > 1 ? parseInt(page) - 1 : null;

  return {
    totalPages,
    nextPage,
    prevPage,
  };
};

interface MyKeyValuePair {
  key: string;
  value: any;
}

export const dropdown = (values: any[]) => {
  return values.map((val) => {
    return { [val.id]: val.title ? val.title : val.name };
  });
};

export const dropdownCat = (values: any[]) => {
  return values.map((val) => {
    return {
      id: val.id,
      title: val.title,
      services: val.services,
      hasServices: val.hasServices,
      parent_id: val.parent_id,
    };
  });
};

export const dropdownSub = (values: any[]) => {
  return values.filter((val) => {
    return (
      val.parent_id && {
        [val.parent_id]: {
          id: val.id,
          services: val.services,
          title: val.title,
        },
      }
    );
  });
};

export const generateRequestLink = (id: string, rId: string) => {
  return `${process.env.BASE_URL}/account/my-requests/quote/${rId}/${id}`;
};

export const generatePasswordResetLink = (token: string) => {
  return `${process.env.BASE_URL}/auth/reset-password?token=${token}`;
};

export const generateToken = (): string => uuid.v4();

export const categories = [
  {
    category: "Event Planners",
    subcategories: [
      {
        name: "Corporate Events",
        services: [
          "Conferences",
          "Seminars",
          "Workshops",
          "Trade Shows",
          "Product Launches",
          "Corporate Parties",
          "Team-Building Events",
          "Company Anniversary Celebrations",
        ],
      },
      {
        name: "Social Events",
        services: [
          "Weddings",
          "Engagement Parties",
          "Anniversary Celebrations",
          "Birthday Parties",
          "Hospital Arrangements",
          "Baby Showers",
          "Family Reunions",
          "Special Celebrations",
        ],
      },
      {
        name: "Non-Profit Events",
        services: [
          "Fundraising Events",
          "Charity Galas",
          "Awareness Campaigns",
          "Community Outreach Programs",
        ],
      },
      {
        name: "Educational Events",
        services: [
          "Workshops",
          "Training Sessions",
          "Educational Conferences",
          "Academic Seminars",
        ],
      },
      {
        name: "Entertainment Events",
        services: [
          "Concerts",
          "Music Festivals",
          "Theater Performances",
          "Movie Premieres",
        ],
      },
      {
        name: "Cultural and Festive Events",
        services: [
          "Cultural Festivals",
          "Religious Celebrations",
          "Holiday Parties",
          "Cultural Exhibitions",
        ],
      },
      {
        name: "Sports Events",
        services: [
          "Sports Tournaments",
          "Athletic Competitions",
          "Sports-Themed Events",
        ],
      },
      {
        name: "Trade Shows and Exhibitions",
        services: ["Trade Shows", "Industry Exhibitions", "Business Expos"],
      },
      {
        name: "Government and Public Events",
        services: [
          "Official Ceremonies",
          "Inaugurations",
          "Public Rallies",
          "Community Events",
        ],
      },
      {
        name: "Destination Events",
        services: [
          "Destination Weddings",
          "Corporate Retreats",
          "Travel Incentives",
        ],
      },
    ],
  },
  {
    category: "Wedding Planners",
    services: [
      "Full-Service Wedding Planners",
      "Day-Of Wedding Coordinator (On-Site Coordination on the Wedding Day)",
      "Destination Wedding Planners (specializing in planning weddings at destination locations)",
      "Cultural/Traditional Wedding Planners (for specific cultural or religious weddings)",
    ],
  },
  {
    category: "Cake Artists",
    services: [
      "Custom Wedding Cakes",
      "Birthday Cakes",
      "Specialty Cakes (for specific occasions or themes)",
      "Cupcakes and Desserts",
      "Vegan/Gluten-Free Cakes (for dietary preferences)",
    ],
  },
  {
    category: "Production Companies",
    subcategories: [
      {
        name: "Stage and Set Design and Production",
        services: [
          "Custom Stage Design",
          "Set Construction and Installation",
          "Backdrops and Scenic Elements",
          "Props and Decorations",
        ],
      },
      {
        name: "Lighting and Audio-Visual",
        services: [
          "Lighting Design and Setup",
          "Sound System Installation",
          "Audio and Visual Equipment Rental",
          "Technical Support during Events",
        ],
      },
      {
        name: "Event Staging and Rigging",
        services: [
          "Platform and Riser Setup",
          "Trussing and Rigging Services",
          "Special Effects (Fog, Pyrotechnics, etc.)",
        ],
      },
      {
        name: "Event Furniture and Rentals",
        services: [
          "Event Furniture Selection and Setup",
          "Table and Chair Rentals",
          "Linen and Tableware Rentals",
        ],
      },
      {
        name: "Event Production Management",
        services: [
          "Coordination with Vendors and Suppliers",
          "Event Logistics and Timelines",
          "On-Site Event Management",
        ],
      },
      {
        name: "Audio-Visual Production",
        services: [
          "Video Production and Editing",
          "Live Streaming Services",
          "Projection Mapping",
        ],
      },
      {
        name: "Special Effects",
        services: ["Visual Effects", "Special Lighting Effects", "Laser Shows"],
      },
      {
        name: "Event Technical Support",
        services: [
          "On-Site Technical Support",
          "Troubleshooting during Events",
          "Backup Systems",
        ],
      },
      {
        name: "Production Crew and Staffing",
        services: [
          "Skilled Technicians and Operators",
          "Stagehands and Crew Members",
        ],
      },
      {
        name: "Tents",
        services: [
          "Traditional Pole Tents",
          "Frame Tents",
          "Clear Span Tents",
          "Marquee Tents",
          "Stretch Tents",
          "Pop-up Canopies",
          "Event Gazebos",
          "Wedding Tents",
          "Festival Tents",
          "Exhibition Tents",
          "Corporate Event Tents",
          "Party Tents",
          "VIP/High-End Tents",
          "Custom Designed Tents",
        ],
      },
    ],
  },
  {
    category: "Venues",
    subcategories: [
      {
        name: "Hotel Venues",
        services: [
          "5-Star Luxury Hotels",
          "4-Star Luxury Hotels",
          "3 star hotels",
          "Boutique Hotels",
          "Resort Hotels",
          "Business Hotels",
          "Beachfront Hotels",
        ],
      },
      {
        name: "Venue Spaces",
        services: [
          "Hotel Rooms",
          "Ballrooms",
          "Restaurants",
          "Meeting Rooms",
          "Conference Halls",
        ],
      },
      {
        name: "Special Venues",
        services: [
          "Garden Venues",
          "Park Venues",
          "Beach Venues",
          "Rooftop Venues",
          "Open-Air Venues",
          "Indoor Event Spaces",
          "Function Rooms",
          "Indoor Ballrooms",
          "Indoor Auditoriums",
          "Indoor Conference Rooms",
        ],
      },
      {
        name: "Exhibition Halls/Convention Centers",
        services: [
          "Trade Show Halls",
          "Convention Centers",
          "Exhibition Pavilions",
          "Event Halls",
        ],
      },
    ],
  },
  {
    category: "Event Planning and Management",
    services: [
      "Event Planning and Management",
      "Venue Selection",
      "Registration and Attendee Management",
      "Program Development",
      "Exhibition and Sponsorship Management",
      "Marketing and Promotion",
      "On-Site Coordination",
      "Audio-Visual and Technology Support",
      "Abstract Management",
      "Accommodation and Travel Arrangements",
      "Budget Management",
      "Networking and Social Events",
      "Delegate Services",
      "Post-Event Evaluation",
      "Customized Solutions",
      "Risk Management",
      "Multilingual Support",
      "Sustainability Initiatives",
      "Legal and Compliance",
      "Technology Integration",
      "Crisis Management",
    ],
  },
];

export function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function removeEmptyValues(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
        delete obj[key];
      }
    }
  }
  return obj;
}


export function parseError(errorRes: any) {
  const err = errorRes.data;
  if ([400, 401, 500].includes(errorRes?.status)) {
    NotificationManager.error(
      err?.msg || err?.error.errors[0].message || err.error.message,
      "Error message"
    );
  } else if (errorRes?.status == 404) {
    NotificationManager.error(
      err?.msg,
      "Not Found"
    );
  } else {
    NotificationManager.error(
      "Opps, something went wrong",
      "Error Message"
    );
  }
}

export function parseSuccess(msg: string) {
  NotificationManager.success(
    msg,
    "Success Message"
  );
}

export const pointPackages = {
  ai: [
    {
      price: 20,
      val: 10
    },
    {
      price: 50,
      val: 25
    }, {
      price: 100,
      val: 50
    }
  ],
  saf: [
    {
      price: 10,
      val: 10
    },
    {
      price: 20,
      val: 22
    }, {
      price: 30,
      val: 30
    }
  ]
}

export function getContentType(fileExtension: string) {
  const contentTypeMap: any = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.xml': 'application/xml',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.doc': 'application/msword',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xls': 'pplication/vnd.ms-excel',
    '.csv': 'text/csv'
  };

  const defaultContentType: any = 'application/octet-stream'; // Default content type for unknown extensions

  const normalizedExtension: string = fileExtension.toLowerCase();

  if (contentTypeMap.hasOwnProperty(normalizedExtension)) {
    return contentTypeMap[normalizedExtension];
  } else {
    return defaultContentType;
  }
}


export const formatDate = (date: string) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss')