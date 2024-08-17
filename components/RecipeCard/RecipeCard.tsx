import Image, {StaticImageData} from "next/image";

type RecipeProps = {
    recipe: {
        recipeId: number;
        recipeTitle: string;
        imageSrc: StaticImageData;
        recipeDescription: string;
        tags: string[];
        imageAlt: string;
    }
}
export default function RecipeCard({recipe}: RecipeProps) {
    const {imageSrc, imageAlt, recipeTitle, recipeDescription, tags} = recipe;
    /*
    recipe title: string
    image src?  : string
    recipe description: string
    tags: string[]
    recipeId(not shown to user but needed for navigating to appropriate pages): int/number
     */

    return (
        <article className="w-[250px] h-[350px] bg-[#eb4034] p-4 rounded-[4px] flex flex-col gap-2 justify-center items-center">
            <Image className="rounded-[4px]" src={imageSrc} alt={imageAlt} height={150}/>
            <h2 className="text-center">{recipeTitle}</h2>
            <p className="overflow-y-scroll no-scrollbar">{recipeDescription}</p>

            <div className="w-full flex justify-center items-center flex-wrap gap-1">
                {tags.slice(0, 6).map((tag, index) => {
                    return <span className="text-black text-sm border-l-2 border-r-2 pl-1 pr-1 border-black" key={index}>{tag}</span>;
                })}
            </div>
        </article>
    );
}