export interface Food {
  name: string;
  score: number;
  emoji: string;
  calories: number;
  fiber: number;
  protein: number;
  cholesterol: number;
  carbohydrates: number;
  fat: number;
  vitamins: { [key: string]: number };
  minerals: { [key: string]: number };
  description: string;
  healthBenefits: string[];
}

export interface MealType {
  foods: Food[];
  calorieLimit: number;
}

export type MealTypes = {
  [key in "breakfast" | "lunch" | "dinner"]: MealType;
};
