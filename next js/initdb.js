import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";
import { redirect } from "next/navigation";

export async function getMeals(){
   await new Promise((resolve) => setTimeout(resolve,4000));
   const meals = await fs.readFileSync("./db.json"),
   parsedMeals = JSON.parse(meals);
   return Promise.resolve(parsedMeals);
}

export async function getSlugMeal(slug){
   await new Promise((resolve) => setTimeout(resolve,4000));
   const meals = await fs.readFileSync("./db.json"),
   parsedMeals = JSON.parse(meals);
   return Promise.resolve(parsedMeals.find(meal => meal.slug === slug));
}

export async function createMeal(meal){
   await new Promise((resolve) => setTimeout(resolve,4000));
   meal.slug = slugify(meal.title, {lower : true });
   meal.instructons  = xss(meal.instructons);
   const extension   = meal.image.name.split('.').pop(),
   fileName = `${meal.slug}.${extension}`,
   stream   = fs.createWriteStream(`./public/images/${fileName}`);
   const bufferImage = await meal.image.arrayBuffer();
   if(!bufferImage)
      throw new Error("Invalid image data provided");
   stream.write(Buffer.from(bufferImage),(error)=>{
      if(error)
         throw new Error("Save Image failed.Please try again later");
   });
   const meals = await fs.readFileSync("./db.json"),
   parsedMeals = JSON.parse(meals)

   meal.image = `/images/${fileName}`
   parsedMeals.push(meal);

   await fs.writeFileSync("./db.json",JSON.stringify(parsedMeals),(error)=>{
      if(error)
         throw new Error("Unable to create the meals.Please try again later");
   });
   return redirect("/meals"); 
}