import { ChefHat, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className=" py-10 px-10">
      <section className="md:flex justify-center items-center gap-5   mb-10 mt-10">
        <div className="flex flex-col gap-5 mb-5">
          <p className="text-red-500 uppercase">Services</p>

          <h1 className="text-3xl font-bold">
            Your Destination for Exquisite <br />
            <span className=" text-primary">Recipes</span>
          </h1>
          <p>
            Gourmet Delights brings you a handpicked selection of premium
            recipes crafted by culinary experts from around the globe. Elevate
            your home cooking experience with our exclusive collection, ranging
            from classic favorites to innovative gastronomic creations.
          </p>
          <div>
          <Link to="coins">
            <button className="inline-flex ease-in-out hover:scale-105 hover:bg-black items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-primary">
           <span>Buy Coins</span>
            </button>
            </Link>
          </div>
        </div>

        <article className="rounded-xl bg-white p-4  sm:p-6 lg:p-8  ring-primary ring-1">
          <div className="flex items-start sm:gap-8">
            <div
              className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-primary"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1">
                <Star />
              </div>
            </div>

            <div>
              <Link to="recipe">
              <strong className="rounded border  cursor-pointer border-primary bg-primary px-3 py-1.5 text-[10px] font-medium text-white hover:scale-105 transition-all">
                Recipes
              </strong>
              </Link>

              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <Link to="recipe" className="hover:underline">
                 
                  Your Hub for Delicious Recipes
                </Link>
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                Savor & Share is your ultimate destination for discovering,
                enjoying, and sharing delightful recipes. Dive into our treasure
                trove of culinary creations, meticulously curated to tantalize
                your taste buds and inspire your inner chef.
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
