export interface Food {
  name: string;
  score: number;
  emoji: string;
  calories: number;
  fiber: number;
  protein: number;
  cholesterol: number;
}

export interface MealType {
  foods: Food[];
  calorieLimit: number;
}

export type MealTypes = {
  [key in "breakfast" | "lunch" | "dinner"]: MealType;
};
