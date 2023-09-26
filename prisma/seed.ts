
const { PrismaClient } = require("@prisma/client");
import prisma from "@/lib/prisma";

const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters
    .replace(/\s+/g, "-") // Replace whitespace with hyphens
    .replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
    .trim(); // Trim leading and trailing whitespace
};

const categories = [
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
  {
    category: "Photographers",
    services: ["Photographers"],
  },
];

const uploadCategory = async () => {
  categories.forEach(async (cat) => {
    const slug = generateSlug(cat.category)
    await prisma.vendorCategory.create({
      data: {
        title: cat.category,
        slug: slug,
        description: cat.category + 'Category',
        icon: "icon",
        hasServices: cat.subcategories ? false : true,
        services: cat.subcategories ? [] : cat.services
      },
    });
    if (cat.subcategories) {
      const parent = await prisma.vendorCategory.findFirst({
        where: {
          slug: slug
        }
      });

      cat.subcategories.forEach(async (sub) => {
        await prisma.vendorCategory.create({
          data: {
            title: sub.name,
            slug: generateSlug(sub.name),
            description: sub.name + 'Subcategory',
            icon: "icon",
            hasServices: true,
            services: sub.services,
            // parent_id: parent.id
          },
        });
      })

    }
  });
};


uploadCategory()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

