import { Sparkles } from "lucide-react";
import image from "../../assets/Testimonials/Group 27 (1).png";
import icon from "../../assets/Testimonials/icon.png";
export default function Testimonials() {
  return (
    <div className=" px-10 py-10">
      <section>
        <div class="container  m-auto">
          <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div class="col-span-4 lg:col-span-6">
              <img
                src={image}
                alt="Testimonials"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
            <div class="col-span-4 lg:col-span-6 flex flex-col justify-center md:items-start items-center gap-5">
              <div>
                <p className=" text-red-500 uppercase">Testimonials</p>
                <h1 className=" text-3xl font-bold">
                  What Our users <br /><span className=" text-primary"> Say About Us</span>
                </h1>
                <p>
                  “Foodi is a game-changer! As someone who loves experimenting
                  in the kitchen, this website has become my ultimate go-to. The
                  variety of recipes is astounding, and each one is presented
                  with clear instructions and stunning visuals.”
                </p>
              </div>

              <div className=" flex justify-center items-center">
                <img src={icon} alt="icon" className=" max-w-32"></img>

                <div className=" flex flex-col gap-2 justify-center  items-center ">
                  <p className=" font-bold">Customer Feedback</p>
                  <div className=" flex gap-2 justify-center items-center">
                    <Sparkles className=" text-primary" />
                    <p className="  font-bold">4.9</p>
                    <p className=" text-[#807E7E]"> (18.6k Reviews)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
