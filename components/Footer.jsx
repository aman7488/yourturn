import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="cursor-pointer inline-block align-middle" width={100} src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm font-medium">
            Asquare is an inclusive, family-oriented lifestyle e-commerce brand offering high-quality, everyday essentials for men, women, and kids. From wardrobe basics to thoughtful accessories, the brand celebrates the small things that bring comfort, confidence, and connection.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="/">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="/about-us">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" target="_blank" href="/return-policy">Return policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            {/* <div className="text-sm space-y-2">
              <p>+91-8884999644</p>
              <p>asquareteam9@gmail.com</p>
            </div> */}
            <div className="flex items-center gap-4">
              <a href="tel:+918884999644" target="_blank" rel="noopener noreferrer">
                <Image src={assets.phone} alt="Call" width={34} height={34} />
              </a>
              <a href="mailto:asquareteam9@gmail.com" target="_blank" rel="noopener noreferrer">
                <Image src={assets.email} alt="Email" width={34} height={34} />
              </a>
              <a href="https://www.instagram.com/a_squarelife" target="_blank" rel="noopener noreferrer">
                <Image src={assets.instagram} alt="Instagram" width={34} height={34} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;