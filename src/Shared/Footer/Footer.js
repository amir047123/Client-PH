import React from "react";
import logo from "../../assets/Logo/Logo.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";

// Footer component
const Footer = () => {
  // Return JSX element for the footer
  return (
    <footer className="w-full text-slate-500">
      {/* Main footer */}
      <div className="border-t border-primary pt-16 pb-12 text-sm ">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-4 lg:grid-cols-10">
            {/* Logo and description */}
            <div
              className="col-span-4 md:col-span-8 lg:col-span-4"
              aria-labelledby="footer-header"
            >
              {/* Logo image */}
              <img
                src={logo}
                alt="logo"
                className="mb-6 flex items-center gap-2 whitespace-nowrap text-base font-medium leading-6  focus:outline-none"
              ></img>
              {/* Description paragraph */}
              <p>
                FoodieHive is your digital gathering spot for all things
                culinary, where food lovers convene to swap recipes, cooking
                tips, and the latest gastronomic adventures.
              </p>
            </div>
            {/* Useful links navigation */}
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-product-5-logo"
            >
              <FooterNav
                title="Useful links"
                links={[
                  { label: "Recipes", href: "recipe" },
                  { label: "Catagories", href: "recipe" },
                  { label: "Buy Coin", href: "coins" },
                ]}
              />
            </nav>
            {/* Help menu navigation */}
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-docs-5-logo"
            >
              <FooterNav
                title="Help Menu"
                links={[
                

                  { label: "FAQ's", href: "#" },
                  { label: "Help Center", href: "#" },
                ]}
              />
            </nav>
            {/* Get in touch navigation */}
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-get-in-touch-5-logo"
            >
              <FooterNav
                title="Get in touch"
                links={[
                  { label: "Contact", href: "#" },
                  { label: "Support", href: "#" },
                  { label: "Join", href: "#" },
                ]}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="py-4 text-sm border-t  bg-primary">
        <div className="container px-6 mx-auto flex justify-between text-white">
          <div className="col-span-2 md:col-span-4 lg:col-span-6">
            <p>&copy; 2024 foodi. All rights reserved.</p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <a
              href="https://www.facebook.com/amirfaysal047/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/amir__faysal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="cursor-pointer" />
            </a>
            <a
              href="https://www.linkedin.com/in/amir-faysal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer navigation component
const FooterNav = ({ title, links }) => {
  // Return JSX element for the footer navigation
  return (
    <>
      {/* Title heading */}
      <h3 className="mb-6 text-base font-medium text-slate-700">{title}</h3>
      {/* Links list */}
      <ul>
        {links.map((link, index) => (
          <li key={index} className="mb-2 leading-6">
            {/* Link item */}
            <a
              href={link.href}
              className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Footer;
