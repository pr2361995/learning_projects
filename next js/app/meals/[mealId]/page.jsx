import { getSlugMeal } from "@/initdb";
import classes from "./page.module.css";
import Image from 'next/image';
import { notFound } from "next/navigation";

export async function generateMetadata({params}) {
  const slugMeal = await getSlugMeal(params.mealId);
  if(!slugMeal)
    notFound();
  return {
    title : slugMeal.title,
    description : slugMeal.summary
  }
}

async function MealPage({params}) {
  const slugMeal = await getSlugMeal(params.mealId);
  if(!slugMeal)
    notFound();

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={slugMeal.image}/>
        </div>
        <div className={classes.headerText}>
          <h1>{slugMeal.title}</h1>
          <p className={classes.creator}>
            By <a href={`mailto:${slugMeal.creator_email}`}>{slugMeal.creator}</a>
          </p>
          <p className={classes.summary}>
            {slugMeal.summary}
          </p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html : slugMeal.instructions.replace(/\n/g,'<br/>')
        }}></p>
      </main>
    </>
  )
}

export default MealPage