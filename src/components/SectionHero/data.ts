import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  // {
  //   image: imageRightPng2,
  //   heading: "Exclusive collection for everyone",
  //   subHeading: "In this season, find the best 🔥",
  //   btnText: "Explore now",
  //   btnLink: "/",
  // },
  // {
  //   image: imageRightPng3,
  //   heading: "Exclusive collection for everyone",
  //   subHeading: "In this season, find the best 🔥",
  //   btnText: "Explore now",
  //   btnLink: "/",
  // },
  // {
  //   image: imageRightPng,
  //   heading: "Exclusive collection for everyone",
  //   subHeading: "In this season, find the best 🔥",
  //   btnText: "Explore now",
  //   btnLink: "/",
  // },
  {
    image: imageRightPng,  // Replace with an appropriate concert image variable or URL
    heading: "Upcoming Concerts in Dhaka",
    subHeading: "Experience the best live music in town 🎶",
    btnText: "View Concerts",
    btnLink: "/",
},
{
    image: imageRightPng2,  // Replace with an appropriate seminar image variable or URL
    heading: "Top Seminars for Knowledge Seekers",
    subHeading: "Join seminars to enhance your skills and network 📚",
    btnText: "Explore Seminars",
    btnLink: "/",
},
{
    image: imageRightPng3,  // Replace with an appropriate sports image variable or URL
    heading: "Exciting Sports Events Near You",
    subHeading: "Catch thrilling sports events happening around Dhaka 🏅",
    btnText: "Discover Sports Events",
    btnLink: "/",
},

];
