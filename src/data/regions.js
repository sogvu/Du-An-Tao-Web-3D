export const regions = [
  {
    id: "01",
    name: "WEST JAVA",
    tagline: "The Land of Volcanic Wonders & Cultural Heritage",
    description: "Discover majestic active volcanoes, lush terraced tea plantations, and the rich cultural traditions of the Sundanese people.",
    color: "#0d3121", // Dark emerald
    gradient: "from-[#081e14] via-[#0d3121] to-[#12422e]",
    textColor: "text-emerald-400",
    theme: {
      primary: "#10b981",
      accent: "#34d399",
      islandColor: "#1a5f43",
      waterColor: "#174d38",
    },
    // Camera settings: position [x, y, z], lookAt [x, y, z]
    camera: {
      position: [6, 6, 8],
      lookAt: [0, 0, 0]
    },
    landmarks: [
      {
        name: "Tangkoeban Parahoe",
        desc: "An active stratovolcano featuring steaming sulfur craters.",
        rating: "4.8",
        camera: {
          position: [-1.2, 2.5, 1.2],
          lookAt: [-0.8, 1.2, -1.0]
        }
      },
      {
        name: "Ranca Upas",
        desc: "A beautiful highland camping ground surrounded by pine forests.",
        rating: "4.7",
        camera: {
          position: [-3.5, 1.5, 1.2],
          lookAt: [-2.5, 0.3, -0.6]
        }
      },
      {
        name: "Kawah Putih",
        desc: "A striking crater lake with highly acidic turquoise water.",
        rating: "4.9",
        camera: {
          position: [3.2, 1.8, 2.5],
          lookAt: [2.0, 0.2, 0.8]
        }
      }
    ]
  },
  {
    id: "02",
    name: "PAPUA",
    tagline: "The Last Frontier of Pristine Nature & Marine Life",
    description: "Explore the breathtaking limestone islands of Raja Ampat, towering snowy peaks of Carstensz, and preserved ancient tribal rituals.",
    color: "#0f2f47", // Dark sapphire/blue
    gradient: "from-[#081a28] via-[#0f2f47] to-[#184261]",
    textColor: "text-sky-400",
    theme: {
      primary: "#0ea5e9",
      accent: "#38bdf8",
      islandColor: "#1c4e75",
      waterColor: "#1e3a8a",
    },
    camera: {
      position: [0, 4, 9],
      lookAt: [0, 0.5, 0]
    },
    landmarks: [
      {
        name: "Raja Ampat",
        desc: "The world's most biodiverse marine sanctuary with karst islets.",
        rating: "5.0",
        camera: {
          position: [3.2, 1.5, 0.8],
          lookAt: [2.5, 0.6, -1.2]
        }
      },
      {
        name: "Carstensz Pyramid",
        desc: "The highest summit of Oceania, featuring rare equatorial glaciers.",
        rating: "4.9",
        camera: {
          position: [-0.5, 2.8, 0.8],
          lookAt: [-0.5, 2.0, -2.0]
        }
      },
      {
        name: "Lake Sentani",
        desc: "A vast, peaceful freshwater lake surrounded by rolling green hills.",
        rating: "4.6",
        camera: {
          position: [2.6, 1.2, 2.6],
          lookAt: [1.5, 0.4, 1.2]
        }
      }
    ]
  },
  {
    id: "03",
    name: "BORNEO",
    tagline: "The Wild Heart of Ancient Rainforests",
    description: "Venture into prehistoric jungles, home to the endangered orangutans, mighty winding rivers, and traditional Dayak longhouses.",
    color: "#422e11", // Dark amber/brown
    gradient: "from-[#291b09] via-[#422e11] to-[#5c4018]",
    textColor: "text-amber-500",
    theme: {
      primary: "#f59e0b",
      accent: "#fbbf24",
      islandColor: "#66491d",
      waterColor: "#3b2609",
    },
    camera: {
      position: [-6, 5, 8],
      lookAt: [-1, 0, -0.5]
    },
    landmarks: [
      {
        name: "Tanjung Puting",
        desc: "National park famous for orangutan rehabilitation and riverboats.",
        rating: "4.9",
        camera: {
          position: [-3.2, 1.2, 2.2],
          lookAt: [-2.4, 0.6, 0.8]
        }
      },
      {
        name: "Derawan Islands",
        desc: "A coastal paradise famed for giant sea turtles and jellyfish lakes.",
        rating: "4.8",
        camera: {
          position: [0.0, 1.5, 3.5],
          lookAt: [0.0, 0.0, 1.5]
        }
      },
      {
        name: "Rumah Betang",
        desc: "Traditional Dayak longhouses symbolizing communal harmony.",
        rating: "4.7",
        camera: {
          position: [1.8, 1.2, 2.6],
          lookAt: [0.6, 0.5, 1.2]
        }
      }
    ]
  }
];
