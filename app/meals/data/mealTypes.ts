import { MealTypes } from "../types/types";

export const mealTypes: MealTypes = {
  breakfast: {
    foods: [
      {
        name: "Egg",
        score: 5,
        emoji: "🥚",
        calories: 78,
        fiber: 0,
        protein: 6,
        cholesterol: 186,
        carbohydrates: 0.6,
        fat: 5,
        vitamins: {
          A: 6,
          B12: 10,
          D: 11,
          E: 5,
        },
        minerals: {
          Iron: 5,
          Zinc: 4,
          Selenium: 22,
        },
        description:
          "A nutrient-dense food rich in high-quality protein and various vitamins and minerals.",
        healthBenefits: [
          "Supports muscle growth and repair",
          "Promotes brain health",
          "Provides essential nutrients for eye health",
        ],
      },
      {
        name: "Bacon",
        score: -2,
        emoji: "🥓",
        calories: 54,
        fiber: 0,
        protein: 3,
        cholesterol: 9,
        carbohydrates: 0.1,
        fat: 4.5,
        vitamins: {
          B1: 3,
          B3: 6,
          B12: 4,
        },
        minerals: {
          Selenium: 4,
          Phosphorus: 4,
        },
        description:
          "A processed meat product high in sodium and saturated fat.",
        healthBenefits: ["Contains some B vitamins", "Provides protein"],
      },
      {
        name: "Pancakes",
        score: -3,
        emoji: "🥞",
        calories: 227,
        fiber: 1,
        protein: 6,
        cholesterol: 47,
        carbohydrates: 28,
        fat: 9.5,
        vitamins: {
          B1: 10,
          B2: 15,
          B3: 5,
        },
        minerals: {
          Selenium: 17,
          Manganese: 10,
        },
        description:
          "A breakfast staple made from flour, eggs, and milk, often served with syrup.",
        healthBenefits: ["Provides quick energy", "Contains some B vitamins"],
      },
      {
        name: "Yogurt",
        score: 4,
        emoji: "🍶",
        calories: 150,
        fiber: 0,
        protein: 12,
        cholesterol: 15,
        carbohydrates: 17,
        fat: 3.5,
        vitamins: {
          B2: 30,
          B12: 20,
        },
        minerals: {
          Calcium: 25,
          Phosphorus: 20,
          Zinc: 10,
        },
        description:
          "A fermented dairy product rich in probiotics and protein.",
        healthBenefits: [
          "Supports gut health",
          "Strengthens bones",
          "Boosts immune system",
        ],
      },
      {
        name: "Fruit Bowl",
        score: 7,
        emoji: "🍓",
        calories: 100,
        fiber: 4,
        protein: 2,
        cholesterol: 0,
        carbohydrates: 25,
        fat: 0.5,
        vitamins: {
          C: 80,
          A: 15,
          K: 10,
        },
        minerals: {
          Potassium: 8,
          Manganese: 10,
        },
        description:
          "A mix of fresh fruits providing various vitamins, minerals, and antioxidants.",
        healthBenefits: [
          "Boosts immune system",
          "Improves digestion",
          "Provides antioxidants for overall health",
        ],
      },
      {
        name: "Donut",
        score: -5,
        emoji: "🍩",
        calories: 253,
        fiber: 1,
        protein: 4,
        cholesterol: 10,
        carbohydrates: 30,
        fat: 14,
        vitamins: {
          B1: 6,
          B2: 4,
        },
        minerals: {
          Iron: 6,
        },
        description:
          "A sweet, fried dough confection often topped with sugar or frosting.",
        healthBenefits: ["Provides quick energy"],
      },
    ],
    calorieLimit: 600,
  },
  lunch: {
    foods: [
      {
        name: "Salad",
        score: 8,
        emoji: "🥗",
        calories: 200,
        fiber: 5,
        protein: 8,
        cholesterol: 0,
        carbohydrates: 20,
        fat: 10,
        vitamins: {
          A: 80,
          C: 60,
          K: 100,
          E: 20,
        },
        minerals: {
          Iron: 10,
          Magnesium: 6,
          Potassium: 10,
        },
        description:
          "A mix of fresh vegetables, often including leafy greens, tomatoes, and cucumbers.",
        healthBenefits: [
          "Rich in vitamins and minerals",
          "High in fiber for digestive health",
          "Low in calories, supporting weight management",
        ],
      },
      {
        name: "Sandwich",
        score: 3,
        emoji: "🥪",
        calories: 300,
        fiber: 3,
        protein: 15,
        cholesterol: 30,
        carbohydrates: 35,
        fat: 12,
        vitamins: {
          B1: 15,
          B3: 20,
          B6: 10,
        },
        minerals: {
          Iron: 10,
          Zinc: 8,
          Selenium: 15,
        },
        description:
          "A versatile meal typically consisting of meat, cheese, and vegetables between slices of bread.",
        healthBenefits: [
          "Provides a balance of carbohydrates and protein",
          "Can include a variety of nutrients depending on ingredients",
        ],
      },
      {
        name: "Pizza",
        score: -3,
        emoji: "🍕",
        calories: 285,
        fiber: 2,
        protein: 12,
        cholesterol: 17,
        carbohydrates: 36,
        fat: 10,
        vitamins: {
          A: 10,
          B1: 15,
          C: 5,
        },
        minerals: {
          Calcium: 15,
          Iron: 10,
        },
        description:
          "A popular dish consisting of a round, flattened base with toppings baked in an oven.",
        healthBenefits: [
          "Can provide vegetables and protein",
          "Contains some calcium from cheese",
        ],
      },
      {
        name: "Sushi",
        score: 6,
        emoji: "🍣",
        calories: 350,
        fiber: 1,
        protein: 20,
        cholesterol: 40,
        carbohydrates: 40,
        fat: 10,
        vitamins: {
          B12: 30,
          D: 15,
        },
        minerals: {
          Iodine: 50,
          Selenium: 40,
          Magnesium: 10,
        },
        description:
          "A Japanese dish featuring vinegared rice combined with various ingredients, often raw fish.",
        healthBenefits: [
          "High in omega-3 fatty acids (if containing fish)",
          "Good source of iodine from seaweed",
          "Provides lean protein",
        ],
      },
      {
        name: "Burger",
        score: -4,
        emoji: "🍔",
        calories: 354,
        fiber: 1,
        protein: 17,
        cholesterol: 53,
        carbohydrates: 30,
        fat: 18,
        vitamins: {
          B12: 25,
          B6: 15,
        },
        minerals: {
          Iron: 15,
          Zinc: 20,
        },
        description:
          "A sandwich consisting of a cooked patty of ground meat placed inside a sliced bread roll.",
        healthBenefits: [
          "Provides protein",
          "Contains some B vitamins and minerals",
        ],
      },
      {
        name: "Fruit",
        score: 5,
        emoji: "🍎",
        calories: 95,
        fiber: 4,
        protein: 1,
        cholesterol: 0,
        carbohydrates: 25,
        fat: 0.3,
        vitamins: {
          C: 15,
          A: 2,
        },
        minerals: {
          Potassium: 5,
        },
        description:
          "A sweet and nutritious plant food, often eaten raw as a snack or dessert.",
        healthBenefits: [
          "High in fiber for digestive health",
          "Rich in antioxidants",
          "Provides natural sugars for energy",
        ],
      },
    ],
    calorieLimit: 800,
  },
  dinner: {
    foods: [
      {
        name: "Steak",
        score: -1,
        emoji: "🥩",
        calories: 405,
        fiber: 0,
        protein: 62,
        cholesterol: 146,
        carbohydrates: 0,
        fat: 18,
        vitamins: {
          B12: 100,
          B6: 30,
          B3: 35,
        },
        minerals: {
          Iron: 15,
          Zinc: 40,
          Selenium: 45,
        },
        description:
          "A cut of meat, typically beef, sliced perpendicular to the muscle fibers.",
        healthBenefits: [
          "Excellent source of high-quality protein",
          "Rich in B vitamins and minerals",
          "Contains creatine for muscle health",
        ],
      },
      {
        name: "Fish",
        score: 7,
        emoji: "🐟",
        calories: 200,
        fiber: 0,
        protein: 40,
        cholesterol: 80,
        carbohydrates: 0,
        fat: 8,
        vitamins: {
          D: 100,
          B12: 100,
          B3: 30,
        },
        minerals: {
          Selenium: 60,
          Iodine: 50,
          Potassium: 15,
        },
        description:
          "A lean protein source, often rich in omega-3 fatty acids.",
        healthBenefits: [
          "High in heart-healthy omega-3 fatty acids",
          "Excellent source of protein",
          "Rich in vitamin D and B12",
        ],
      },
      {
        name: "Pasta",
        score: -2,
        emoji: "🍝",
        calories: 400,
        fiber: 3,
        protein: 14,
        cholesterol: 0,
        carbohydrates: 80,
        fat: 2,
        vitamins: {
          B1: 20,
          B9: 15,
        },
        minerals: {
          Iron: 10,
          Selenium: 30,
        },
        description:
          "A staple food made from unleavened dough of wheat flour mixed with water or eggs.",
        healthBenefits: [
          "Provides energy from complex carbohydrates",
          "Contains some B vitamins and minerals",
        ],
      },
      {
        name: "Chicken",
        score: 5,
        emoji: "🍗",
        calories: 300,
        fiber: 0,
        protein: 50,
        cholesterol: 100,
        carbohydrates: 0,
        fat: 10,
        vitamins: {
          B3: 60,
          B6: 30,
          B12: 10,
        },
        minerals: {
          Selenium: 40,
          Phosphorus: 20,
          Zinc: 10,
        },
        description:
          "A popular poultry dish, often grilled, roasted, or fried.",
        healthBenefits: [
          "Excellent source of lean protein",
          "Rich in B vitamins",
          "Lower in saturated fat compared to red meat",
        ],
      },
      {
        name: "Vegetables",
        score: 8,
        emoji: "🥦",
        calories: 50,
        fiber: 4,
        protein: 3,
        cholesterol: 0,
        carbohydrates: 10,
        fat: 0,
        vitamins: {
          C: 80,
          K: 100,
          A: 60,
          B9: 30,
        },
        minerals: {
          Potassium: 10,
          Manganese: 15,
          Magnesium: 8,
        },
        description:
          "A mix of various plant-based foods, often steamed, roasted, or eaten raw.",
        healthBenefits: [
          "High in fiber for digestive health",
          "Rich in various vitamins and minerals",
          "Low in calories, supporting weight management",
        ],
      },
      {
        name: "Ice Cream",
        score: -5,
        emoji: "🍨",
        calories: 250,
        fiber: 1,
        protein: 4,
        cholesterol: 30,
        carbohydrates: 30,
        fat: 14,
        vitamins: {
          A: 10,
          B2: 15,
        },
        minerals: {
          Calcium: 15,
          Phosphorus: 10,
        },
        description:
          "A frozen dessert usually made from dairy products and often flavored.",
        healthBenefits: ["Contains some calcium", "Provides quick energy"],
      },
    ],
    calorieLimit: 1000,
  },
};
