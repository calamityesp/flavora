"use client";
import React, {useEffect} from "react";
import Image from "next/image";
import sushi from "../../../sushi.jpg";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
export default function Dashboard() {
    const recipe = {
        recipeId: 0,
        recipeTitle: "Sushi",
        imageSrc: sushi,
        recipeDescription: "sushi is the best food ever💚 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cum deserunt, ex explicabo labore laboriosam nam necessitatibus! Eligendi exercitationem fuga officiis vel? Autem illum laborum laudantium maxime officiis repellendus totam!",
        // tags: ["sushi", "fish", "sashimi", "maki", "rice", "soy sauce", "wasabi"],
        // tags: ["chicken", "sushi", "healthy", "fried", "unhealthy", "food"],
        tags: ["sushi", "chicken", "sushi", "healthy", "fried", "unhealthy", "food", "chicken", "sushi", "healthy", "fried", "unhealthy", "food"],
        imageAlt: "An image of sushi rolls :]"
    }

    const recipes = [
       recipe,
       recipe,
    ]


    return (
        <main className="">
            {recipes.map((recipe, index) => {
                return <RecipeCard recipe={recipe} key={index}/>
            })}
        </main>
    );
}
