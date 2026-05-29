import "dotenv/config";
import { PrismaClient, ProductType, Prisma } from "@prisma/client";
import { prisma } from "./src/lib/prisma.js";

// const products = [
//   {
//     name: "nuka cola",
//     price: 2.5,
//     description: "The classic post-apocalyptic soft drink with a sweet and iconic flavor.",
//     stock: 120,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cola-1",
//       "nuka-cola-2",
//       "nuka-cola-3",
//       "nuka-cola-4",
//     ],
//     details: [
//       "A timeless favorite across the wasteland.",
//       "Known for its strong caramel flavor.",
//       "Best served ice cold.",
//       "One of the most recognizable drinks ever created.",
//     ],
//   },
//   {
//     name: "nuka dark",
//     price: 3.5,
//     description: "A stronger, darker variation with a bold and intense taste.",
//     stock: 80,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-dark-1",
//       "nuka-dark-2",
//       "nuka-dark-3",
//       "nuka-dark-4",
//     ],
//     details: [
//       "Features a deeper roasted flavor profile.",
//       "Popular among veteran scavengers.",
//       "Pairs well with spicy meals.",
//       "Its dark bottle became iconic after the war.",
//     ],
//   },
//   {
//     name: "nuka grape",
//     price: 2.8,
//     description: "A fruity grape-flavored soda with a refreshing twist.",
//     stock: 95,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-grape-1",
//       "nuka-grape-2",
//       "nuka-grape-3",
//       "nuka-grape-4",
//     ],
//     details: [
//       "Sweet grape aroma with a fizzy finish.",
//       "A favorite among younger consumers.",
//       "Bright purple branding made it stand out.",
//       "Refreshing during long desert journeys.",
//     ],
//   },
//   {
//     name: "nuka orange",
//     price: 2.8,
//     description: "A citrusy orange drink with a bright and tangy flavor.",
//     stock: 90,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-orange-1",
//       "nuka-orange-2",
//       "nuka-orange-3",
//       "nuka-orange-4",
//     ],
//     details: [
//       "Bursting with citrus flavor.",
//       "Perfect for hot wasteland afternoons.",
//       "Its orange glow made it easy to spot.",
//       "A classic alternative to standard Nuka Cola.",
//     ],
//   },
//   {
//     name: "nuka twist",
//     price: 3.0,
//     description: "A unique blend of flavors that delivers a surprising twist.",
//     stock: 70,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-twist-1",
//       "nuka-twist-2",
//       "nuka-twist-3",
//       "nuka-twist-4",
//     ],
//     details: [
//       "Combines lemon and lime-inspired flavors.",
//       "Designed for adventurous drinkers.",
//       "Highly carbonated for extra kick.",
//       "One sip always leaves a surprising aftertaste.",
//     ],
//   },
//   {
//     name: "nuka cherry",
//     price: 2.9,
//     description: "A sweet cherry-flavored soda loved across the wasteland.",
//     stock: 110,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cherry-1",
//       "nuka-cherry-2",
//       "nuka-cherry-3",
//       "nuka-cherry-4",
//     ],
//     details: [
//       "Rich cherry flavor with smooth sweetness.",
//       "One of the earliest Nuka Cola variants.",
//       "Its red bottle cap became collectible.",
//       "A balanced mix of sweetness and fizz.",
//     ],
//   },
//   {
//     name: "nuka clear",
//     price: 2.7,
//     description: "A transparent and crisp drink with a clean taste.",
//     stock: 60,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-clear-1",
//       "nuka-clear-2",
//       "nuka-clear-3",
//       "nuka-clear-4",
//     ],
//     details: [
//       "Crystal clear appearance with subtle sweetness.",
//       "Marketed as a cleaner alternative.",
//       "Its minimalist design became surprisingly popular.",
//       "Very refreshing and light on the palate.",
//     ],
//   },
//   {
//     name: "nuka cola cranberry",
//     price: 3.2,
//     description: "A seasonal cranberry-infused version with a sweet and tart profile.",
//     stock: 75,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cola-cranberry-1",
//       "nuka-cola-cranberry-2",
//       "nuka-cola-cranberry-3",
//       "nuka-cola-cranberry-4",
//     ],
//     details: [
//       "Released during festive seasons.",
//       "Blends cranberry tartness with cola sweetness.",
//       "Its limited availability increased demand.",
//       "A favorite collector's edition among fans.",
//     ],
//   },
//   {
//     name: "nuka cola quantum",
//     price: 5.0,
//     description: "A rare glowing variant with a powerful and exotic flavor.",
//     stock: 40,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cola-quantum-1",
//       "nuka-cola-quantum-2",
//       "nuka-cola-quantum-3",
//       "nuka-cola-quantum-4",
//     ],
//     details: [
//       "Famous for its glowing blue color.",
//       "Contains a highly energetic formula.",
//       "Considered rare throughout the wasteland.",
//       "Collectors are willing to pay huge caps for it.",
//     ],
//   },
//   {
//     name: "nuka cola quartz",
//     price: 4.5,
//     description: "A refined variant with a smooth and luminous finish.",
//     stock: 50,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cola-quartz-1",
//       "nuka-cola-quartz-2",
//       "nuka-cola-quartz-3",
//       "nuka-cola-quartz-4",
//     ],
//     details: [
//       "Recognizable by its bright white glow.",
//       "Produced in limited quantities before the war.",
//       "Its smooth flavor made it premium.",
//       "Often associated with luxury consumers.",
//     ],
//   },
//   {
//     name: "nuka cola victory",
//     price: 4.0,
//     description: "A celebratory edition crafted to honor victory with a bold taste.",
//     stock: 65,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cola-victory-1",
//       "nuka-cola-victory-2",
//       "nuka-cola-victory-3",
//       "nuka-cola-victory-4",
//     ],
//     details: [
//       "Created as a patriotic promotional drink.",
//       "Features a bold and spicy flavor.",
//       "Its design reflects wartime aesthetics.",
//       "Highly valued by Nuka Cola enthusiasts.",
//     ],
//   },
//   {
//     name: "nuka cola wild",
//     price: 3.3,
//     description: "A wild and adventurous flavor inspired by untamed lands.",
//     stock: 85,
//     type: ProductType.DRINK,
//     images: [
//       "nuka-cola-wild-1",
//       "nuka-cola-wild-2",
//       "nuka-cola-wild-3",
//       "nuka-cola-wild-4",
//     ],
//     details: [
//       "Inspired by frontier-style root beverages.",
//       "Has a stronger earthy taste.",
//       "Popular in rural settlements.",
//       "Its cowboy-themed branding became iconic.",
//     ],
//   },
// ] 

const merchProducts = [
    {
        name: "Bottlecap Sunglasses",
        price: 24.99,
        description: "Retro-futuristic sunglasses decorated with authentic Nuka Cola bottlecaps.",
        stock: 18,
        type: ProductType.MERCH,
        images: [],
        details: [
            "UV protected lenses",
            "Hand-painted bottlecap finish",
            "Lightweight plastic frame",
            "Limited Wasteland Edition"
        ]
    },
    {
        name: "Thirst Zapper",
        price: 89.50,
        description: "Iconic Nuka World water pistol replica for collectors and wasteland enthusiasts.",
        stock: 7,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Functional water spray system",
            "Nuka World themed design",
            "Collector display stand included",
            "Requires 2 AA batteries"
        ]
    },
    {
        name: "Nuka Cola Lunchbox",
        price: 19.75,
        description: "Classic metal lunchbox inspired by pre-war Nuka Cola advertising.",
        stock: 32,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Vintage printed artwork",
            "Metallic finish",
            "Secure latch closure",
            "Perfect for collectibles storage"
        ]
    },
    {
        name: "Nuka Cola Boy Truck",
        price: 34.90,
        description: "Miniature delivery truck featuring the cheerful Nuka Cola mascot.",
        stock: 14,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Die-cast metal body",
            "Rolling wheels",
            "Detailed interior",
            "Collector series packaging"
        ]
    },
    {
        name: "Nuka World Paddle Ball",
        price: 12.49,
        description: "Old-school paddle ball toy straight from the Nuka World prize stands.",
        stock: 40,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Wooden paddle",
            "Printed Nuka World logo",
            "Elastic cord attachment",
            "Arcade-style packaging"
        ]
    },
    {
        name: "Nuka Cola Fridge",
        price: 399.99,
        description: "Compact retro refrigerator styled after classic Nuka Cola coolers.",
        stock: 3,
        type: ProductType.MERCH,
        images: [],
        details: [
            "LED interior lighting",
            "Adjustable temperature",
            "Holds up to 40 cans",
            "Vintage red enamel finish"
        ]
    },
    {
        name: "Nuka Cola Vending Machine",
        price: 1299.99,
        description: "Full-size decorative vending machine replica inspired by Fallout.",
        stock: 1,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Illuminated front panel",
            "Custom sound effects",
            "Steel construction",
            "Collector's numbered edition"
        ]
    },
    {
        name: "Nuka Nuke",
        price: 59.99,
        description: "Highly detailed replica of the legendary Nuka Nuke bottle.",
        stock: 10,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Resin collector model",
            "Glow-in-the-dark effect",
            "Display base included",
            "Inspired by Fallout 4 design"
        ]
    },
    {
        name: "Gunther's Big Iron",
        price: 249.99,
        description: "Premium replica revolver inspired by the legendary wasteland showman.",
        stock: 2,
        type: ProductType.MERCH,
        images: [],
        details: [
            "Non-functional prop replica",
            "Engraved metallic finish",
            "Wood-style grip",
            "Display case included"
        ]
    }
] satisfies Prisma.ProductCreateInput[]

async function main() {
  for (const product of merchProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("🌱 Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });