'use server';

import { createMeal } from "@/initdb";

function invalidText(text){
    return !text || text.trim() !== ''
}

export async function shareMeal(prevState,formData){
    const meal = {
      title         : formData.get('title'),
      summary       : formData.get('summary'),
      instructions  : formData.get('instructions'),
      image         : formData.get('image'),
      creator       : formData.get('name'),
      creator_email : formData.get('email')
    }

    if(
        invalidText(meal.title) ||
        invalidText(meal.summary) ||
        invalidText(meal.creator) ||
        invalidText(meal.instructions) ||
        invalidText(meal.creator_email) ||
        !meal.creator_email.includes('@')
    ){
        return {message:"Invalid data"};
    }

    return await createMeal(meal);
  }