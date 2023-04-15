/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import { db } from "utils/firebaseConfig";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import PieChart from "examples/Charts/PieChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import BubbleChart from "examples/Charts/BubbleChart";
import PieChartNews from "./components/PieChart";
import { useMaterialUIController } from "context";
import firebase from "../../utils/firebaseConfig";

function Dashboard() {
  const addDocuments = (collectionName, documentsArray) => {
    const collectionRef = firebase.firestore().collection(collectionName);
    const batch = firebase.firestore().batch();
    console.log("in add doc funcitons");
    documentsArray.forEach((doc) => {
      const newDocRef = collectionRef.doc();
      console.log("in add doc funcitons array");
      batch.set(newDocRef, doc);
    });
    return batch.commit();
  };

  const sports = [
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["football", "match", "stadium"],
      id: "1",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Exciting Football Match at the Local Stadium",
      description: `The football match was a thrilling one, with both teams giving their all to win. The crowd was electric with excitement and cheering loudly for their favorite team. The match went on for hours, with many close calls and missed opportunities.
      
      In the end, the home team scored a winning goal, and the stadium erupted in joy and celebration. The players were overjoyed with the victory, and the fans went home happy and satisfied with the exciting match they had witnessed. Overall, it was a great day for sports and the local community.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/551852/pexels-photo-551852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["tennis", "match", "court"],
      id: "2",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Tennis Match Ends in Dramatic Fashion",
      description: `The tennis match was a back-and-forth affair, with both players trading points and momentum throughout. The court was packed with fans, eagerly watching the action unfold. In the end, it all came down to a tiebreak, with the winner taking home the trophy.
      
      The final points were tense and nerve-wracking, with each player giving it their all. But in the end, the underdog came out on top, stunning the crowd and securing a memorable victory. The fans cheered and applauded, and the winner was overcome with emotion as they lifted the trophy in triumph.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["running", "marathon", "competition"],
      id: "3",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Marathon Competition Draws Thousands of Runners",
      description: `The marathon was a grueling test of endurance, with thousands of runners pushing themselves to their limits. The course was filled with challenging hills and obstacles, but the runners persisted and gave it their all.
      
      As the finish line drew near, the crowd erupted in cheers and applause. The winners were congratulated for their impressive performances, and the rest of the runners were praised for their perseverance and determination. It was a great day for running and fitness, and everyone involved was proud to be a part of it.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/7479647/pexels-photo-7479647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      tags: ["swimming", "competition", "pool"],
      id: "4",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Swimming Championship Takes Place in Local Pool",
      description: `The swimming championship was a thrilling event, with swimmers from all over the region competing for top honors. The pool was packed with spectators, cheering on their favorite swimmers and enjoying the excitement of the competition.
    
    The races were intense and closely contested, with many swimmers pushing themselves to their limits. In the end, the winners were crowned, and the crowds erupted in applause and celebration. It was a great day for swimming and a testament to the hard work and dedication of the competitors.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/4507053/pexels-photo-4507053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      tags: ["baseball", "game", "field"],
      id: "5",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Local Baseball Team Wins in Extra Innings",
      description: `The baseball game was a nail-biting affair, with both teams playing their hearts out for the win. The field was filled with fans, eagerly watching the action unfold and cheering on their favorite team.
    
    The game was back-and-forth, with each team taking turns with the lead. But in the end, it all came down to extra innings, with the home team finally coming out on top. The players were overjoyed, and the fans went wild with excitement and celebration. It was a great day for baseball and a memorable victory for the local team.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/3585031/pexels-photo-3585031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["basketball", "game", "court"],
      id: "6",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Intense Basketball Game Ends in Overtime",
      description: `The basketball game was a nail-biter from start to finish, with both teams battling fiercely for the win. The court was packed with fans, cheering on their favorite players and shouting encouragement.
    
    The game was tied at the end of regulation, sending it into overtime. The tension was palpable as the players took the court once again. In the end, it was a clutch three-pointer that sealed the deal for the home team, sending the fans into a frenzy.
    
    It was a thrilling game, and everyone involved left the court feeling like they had witnessed something special.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/849835/pexels-photo-849835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["swimming", "competition", "pool"],
      id: "7",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Swimming Competition Breaks Records",
      description: `The swimming competition was a showcase of athleticism and skill, with swimmers from all over the world competing for the top spots. The pool was Olympic-sized, and the water was crystal-clear.
    
    Many of the races were close, with the swimmers pushing themselves to the limit in pursuit of victory. But in the end, it was the world record-breakers who stole the show. The crowd erupted in cheers and applause as they watched history being made in front of their eyes.
    
    It was a memorable event, and one that will be talked about for years to come.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["swimming", "competition", "pool"],
      id: "8",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Swimming Competition Brings Out the Best in Athletes",
      description: `The swimming competition was a showcase of skill and athleticism, with swimmers from all over the world competing against each other in a variety of events. The pool was a flurry of activity, with swimmers diving in and out of the water, competing for every inch.
  
  The races were fast and furious, with the swimmers pushing themselves to their limits. The winners were congratulated with cheers and applause, and the other competitors were praised for their efforts and sportsmanship. Overall, it was a great day for swimming and a testament to the power of human determination.`,
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/1058149/pexels-photo-1058149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["basketball", "game", "court"],
      id: "9",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Basketball Game Goes into Overtime",
      description: `The basketball game was a thrilling back-and-forth affair, with both teams trading baskets and momentum throughout the game. The crowd was on their feet, cheering and screaming with every play.
  
  As the game went on, the tension mounted, and the score remained tied. Finally, with just seconds left on the clock, one team hit a miraculous shot to tie the game and send it into overtime. The extra period was just as exciting, with both teams battling it out to the bitter end.
  
  In the end, the home team came out on top, and the fans erupted in joy and celebration. It was a great day for basketball and a testament to the power of teamwork and perseverance.`,
    },

    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/576744/pexels-photo-576744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      tags: ["surfing", "beach", "competition"],
      id: "10",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Surfing Competition Heats Up at the Beach",
      description:
        "The waves were huge and the competition was fierce at this year's surfing championship. Surfers from all over the world came to show off their skills and compete for the top prize. With so much talent on display, it was anyone's guess who would come out on top. But in the end, one surfer rose above the rest, showcasing incredible speed, power, and agility on the waves. The beach was buzzing with excitement, and the winner was celebrated with cheers and applause from the crowd.",
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/1474652/pexels-photo-1474652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      tags: ["basketball", "game", "court"],
      id: "11",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Intense Basketball Game Ends in Thrilling Overtime Victory",
      description:
        "The basketball game was an instant classic, with both teams playing at a high level and refusing to give an inch. The crowd was on the edge of their seats as the score remained tight throughout regulation. When the buzzer sounded, the game was tied, and the fans knew they were in for a treat. The overtime period was just as intense, with players diving for loose balls and making clutch shots. In the end, it was the home team who emerged victorious, sending the crowd into a frenzy of cheers and celebrations. It was a game that will be talked about for years to come.",
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/7994437/pexels-photo-7994437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["basketball", "game", "court"],
      id: "12",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "High-Scoring Basketball Game Ends in Overtime Thriller",
      description:
        "The basketball game was an intense back-and-forth battle, with both teams trading leads and big plays throughout. The crowd was on the edge of their seats as the game went into overtime, with the outcome still very much in doubt. In the end, the home team came out on top, thanks to some clutch free-throw shooting and a big defensive stop. The fans went wild, and the players celebrated on the court with high-fives and hugs. It was a great game, and a testament to the competitive spirit of both teams.",
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/2079432/pexels-photo-2079432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["swimming", "competition", "pool"],
      id: "13",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Swimming Competition Breaks Records and Inspires Fans",
      description:
        "The swimming competition was a showcase of talent and determination, with top athletes from around the world competing for glory. The pool was alive with energy and excitement as the swimmers dove in and raced towards the finish line. Many records were broken over the course of the event, and the crowd roared with approval at each new achievement. In the end, the winners were crowned and celebrated, but all of the athletes were praised for their hard work and dedication. It was a great day for swimming, and for the spirit of competition.",
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/1307609/pexels-photo-1307609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      tags: ["swimming", "competition", "pool"],
      id: "14",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      title: "Record-Breaking Performance in Swimming Competition",
      description:
        "The swimming competition was a fierce battle, with some of the world’s top swimmers vying for the top spot. In the end, one athlete stood above the rest, putting in a record-breaking performance that left the crowd stunned. The swimmer was congratulated by their competitors and cheered by the audience, cementing their place in swimming history.",
    },
    {
      category: "sports",
      image:
        "https://images.pexels.com/photos/4502825/pexels-photo-4502825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      tags: ["boxing", "match", "ring"],
      id: "15",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      title: "Heavyweight Boxing Match Ends in Stunning Knockout",
      description:
        "The heavyweight boxing match was an intense affair, with both fighters giving it their all. The match was evenly matched, with each fighter landing blows and taking punishment in equal measure. But in the end, one fighter landed a devastating knockout blow, sending their opponent crashing to the mat. The crowd erupted in excitement, and the winner was congratulated by their opponent in a show of sportsmanship.",
    },
  ];

  const business = [
    {
      id: "16",
      title: "New Business Launches a Revolutionary Product",
      description:
        "A cutting-edge tech startup has just unveiled a groundbreaking product that could change the industry. The innovative design is sleek and user-friendly, with a focus on simplicity and ease of use. The company hopes that this new product will be a game-changer and disrupt the market. It is set to be released next month.",
      category: "business",
      tags: ["tech", "startup", "innovative"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "17",
      title: "Experts Warn of Impending Economic Downturn",
      description:
        "Financial analysts are predicting that the economy is heading for a downturn in the coming months. There are several factors contributing to this, including rising inflation, slow job growth, and increased uncertainty in global markets. Experts are urging caution and advising investors to diversify their portfolios in preparation for the economic changes ahead.",
      category: "business",
      tags: ["economy", "financial", "investors"],
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      image:
        "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "18",
      title: "Local Business Owner Wins Prestigious Award",
      description:
        "A small business owner in the community has been recognized for their hard work and dedication to their craft. The owner of a local bakery has won a prestigious award for their delicious and innovative creations. This is a huge accomplishment for the business and the community as a whole, and is a testament to the owner's passion and talent.",
      category: "business",
      tags: ["small business", "award", "innovation"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      image:
        "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },

    {
      id: "19",
      title: "Tech Giant Unveils Latest Innovation in Augmented Reality",
      description:
        "Tech giant XYZ has unveiled their latest innovation in augmented reality, a breakthrough technology that promises to revolutionize the way we interact with digital content. By seamlessly integrating virtual and physical environments, users can now experience a whole new level of immersive entertainment and education. With this development, XYZ has solidified its position as a leader in the tech industry.",
      category: "business",
      tags: ["augmented reality", "tech innovation", "immersive entertainment"],
      images:
        "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
    },
    {
      id: "20",
      title: "New Study Shows Surprising Benefits of Meditation for Business Leaders",
      description:
        "A new study has found that business leaders who regularly practice meditation experience a wide range of benefits, including increased focus, reduced stress, and improved decision-making abilities. The study, conducted by a team of researchers at XYZ University, surveyed over 500 executives and found that those who meditated for at least 10 minutes a day reported significant improvements in their work and personal lives. As more and more companies look to improve employee well-being, meditation is emerging as a powerful tool for success.",
      category: "business",
      tags: ["meditation", "business leadership", "employee well-being"],
      images:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
    },
    {
      id: "21",
      title: "Experts Predict Surge in Online Sales During Upcoming Holiday Season",
      description:
        "Experts are predicting a surge in online sales during the upcoming holiday season, as consumers continue to embrace e-commerce amid the ongoing pandemic. With more and more people turning to online shopping for convenience and safety, retailers are gearing up for a busy season. XYZ, one of the world's largest online retailers, has already announced plans to hire thousands of additional workers to help fulfill orders. As the holiday season approaches, many businesses are hoping that the increase in online sales will help to make up for lost revenue due to the pandemic.",
      category: "business",
      tags: ["online sales", "holiday season", "e-commerce"],
      images:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
    },

    {
      id: "22",
      title: "Tech Giant Announces New Mobile Phone Release",
      description:
        "The popular tech giant has just announced the release of their latest mobile phone. The new phone boasts advanced features and sleek design.",
      category: "business",
      tags: ["tech", "mobile phone", "new release"],
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      image:
        "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "23",
      title: "Company Seeks to Expand Operations",
      description:
        "A growing company has announced plans to expand its operations into new markets. The move is expected to increase revenue and create new job opportunities.",
      category: "business",
      tags: ["company", "expansion", "new markets"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "24",
      title: "Business Leaders Attend Annual Conference",
      description:
        "Top business leaders from around the world gathered at the annual conference to discuss the latest trends and innovations in the industry. The conference was a huge success, with attendees praising the insightful discussions and networking opportunities.",
      category: "business",
      tags: ["business leaders", "conference", "industry trends"],
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "25",
      title: "Technology company announces launch of new AI-powered product",
      description:
        "The leading technology company announced today the launch of their newest product, an AI-powered platform that will revolutionize the industry. The platform utilizes machine learning algorithms to provide real-time insights and analysis, allowing businesses to make better decisions and improve their bottom line.",
      category: "business",
      tags: ["AI", "machine learning", "technology"],
      images:
        "https://images.pexels.com/photos/3184362/pexels-photo-3184362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
    },
    {
      id: "26",
      title: "Global economy sees record growth despite pandemic",
      description:
        "Despite the challenges posed by the COVID-19 pandemic, the global economy has seen record growth in the past year, with many countries experiencing their highest levels of economic activity in decades. This growth has been fueled by a combination of factors, including government stimulus packages, increased consumer spending, and a resurgence in international trade.",
      category: "business",
      tags: ["economy", "pandemic", "global"],
      images:
        "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
    },
    {
      id: "27",
      title: "New startup aims to disrupt traditional healthcare industry",
      description:
        "A new startup has emerged with the goal of disrupting the traditional healthcare industry. The company's platform provides patients with access to on-demand medical consultations, telemedicine services, and other digital health tools. The startup's founders believe that their platform will help to reduce costs and increase efficiency in the healthcare sector.",
      category: "business",
      tags: ["startup", "healthcare", "digital health"],
      images:
        "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
    },

    {
      id: "28",
      title: "Tech giant unveils new smartwatch with innovative features",
      description:
        "Tech giant XYZ has unveiled its latest smartwatch that boasts a range of innovative features. The device comes with a new AI assistant that can help users manage their day-to-day tasks more efficiently, and also has an improved heart rate monitor for better health tracking.",
      category: "business",
      tags: ["smartwatch", "tech", "AI", "health"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      image:
        "https://images.pexels.com/photos/3965477/pexels-photo-3965477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: "29",
      title: "Global economy faces slowdown amid rising inflation concerns",
      description:
        "The global economy is facing a potential slowdown as concerns grow over rising inflation rates. Many experts are warning that continued inflation could lead to decreased consumer spending and ultimately hurt economic growth.",
      category: "business",
      tags: ["global economy", "inflation", "consumer spending", "economic growth"],
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      image:
        "https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: "30",
      title: "New startup aims to disrupt the real estate industry with AI technology",
      description:
        "A new startup is aiming to disrupt the real estate industry by using AI technology to make buying and selling homes faster and more efficient. The company's algorithms can analyze property data and provide accurate valuations in minutes, a process that traditionally took days or weeks.",
      category: "business",
      tags: ["real estate", "startup", "AI", "property data"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      image:
        "https://images.pexels.com/photos/4060140/pexels-photo-4060140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];

  const entertainment = [
    {
      title: "The Great Escape",
      description:
        "A group of prisoners try to escape from a maximum-security prison using a tunnel they've been digging for months. Will they succeed?",
      category: "entertainment",
      tags: ["prison", "escape", "tunnel", "drama"],
      id: "31",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "The Piano Competition",
      description:
        "A young pianist competes in an international piano competition, but things don't go as planned when she realizes the other competitors are not to be underestimated.",
      category: "entertainment",
      tags: ["piano", "competition", "drama", "music"],
      id: "32",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },

    {
      title: "The Comedy Night",
      description:
        "A stand-up comedy show featuring some of the funniest comedians in the country. Get ready to laugh your heart out!",
      category: "entertainment",
      tags: ["comedy", "stand-up", "funny", "humor"],
      id: "33",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New Hollywood Movie 'The Quest' to Premiere in May",
      description:
        "The highly-anticipated Hollywood movie 'The Quest' is set to premiere in May. Starring a star-studded cast, the movie follows a group of adventurers on a dangerous mission to find a lost artifact. The action-packed movie promises to be a thrilling ride for audiences of all ages.",
      category: "entertainment",
      tags: ["Hollywood", "movie premiere", "The Quest", "adventure", "action-packed"],
      id: "34",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Local Businessman Launches New Venture to Tackle Plastic Waste",
      description:
        "A local businessman has launched a new venture aimed at tackling plastic waste in the city. The company plans to recycle plastic waste and turn it into useful products such as building materials and furniture. The initiative has received widespread support from environmentalists and the local community.",
      category: "entertainment",
      tags: ["plastic waste", "recycling", "sustainability", "building materials", "furniture"],
      id: "35",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New Pop-up Art Exhibition to Showcase Local Talent",
      description:
        "A new pop-up art exhibition is set to showcase the works of local artists. The exhibition, titled 'The City Seen', will feature paintings, sculptures, and other artworks that explore the city's history and culture. The event promises to be a unique and exciting experience for art lovers.",
      category: "entertainment",
      tags: ["art exhibition", "local artists", "paintings", "sculptures", "history", "culture"],
      id: "36",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New Movie in Theaters",
      description: "Check out the latest summer blockbuster, now showing in theaters nationwide!",
      category: "entertainment",
      tags: ["movie", "theaters", "summer", "blockbuster", "entertainment"],
      id: "37",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New Tech Startup Launches",
      description:
        "A new tech startup has launched, promising to revolutionize the way we live and work.",
      category: "entertainment",
      tags: ["tech", "startup", "revolutionize", "live", "work"],
      id: "38",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Economy Sees Record Growth",
      description:
        "The economy has seen record growth in the past quarter, with experts predicting a strong future ahead.",
      category: "entertainment",
      tags: ["economy", "growth", "record", "quarter", "experts"],
      id: "39",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Upcoming concert of popular band",
      description:
        "The upcoming concert of a popular band is the talk of the town. Fans are eagerly waiting to attend the concert and experience their favorite band's music live. The band has promised to put up a great show with their hit songs and special performances. Get ready for an unforgettable night!",
      category: "entertainment",
      tags: ["concert", "music", "band", "performance", "live"],
      id: "40",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New startup helps people save money",
      description:
        "A new startup is making waves by helping people save money on their everyday expenses. The app allows users to track their spending and offers suggestions on how to save money. Users have reported significant savings by using the app, and the startup has already gained a large following. It looks like this app could be a game-changer in the world of personal finance.",
      category: "entertainment",
      tags: ["startup", "saving money", "personal finance", "app", "expenses"],
      id: "41",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New restaurant opens in downtown",
      description:
        "A new restaurant has opened in downtown, and foodies are already buzzing about it. The restaurant offers a unique menu with a focus on locally sourced ingredients and farm-to-table dishes. The decor is also noteworthy, with a cozy and intimate ambiance that sets it apart from other restaurants in the area. If you're looking for a new dining experience, this restaurant is definitely worth a visit.",
      category: "entertainment",
      tags: ["restaurant", "foodie", "local ingredients", "farm-to-table", "dining experience"],
      id: "42",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },

    {
      title: "The New Hollywood: A Film Critic's Retrospective",
      description:
        "In this article, we take a look back at some of the most influential films of the past decade and how they have changed the face of Hollywood. From the rise of independent cinema to the dominance of the superhero genre, we explore what it means to be a film lover in the 21st century.",
      category: "entertainment",
      tags: ["Hollywood", "film", "cinema", "superhero", "independent"],
      id: "43",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "The Art of Music Production: Behind the Scenes with a Record Producer",
      description:
        "In this exclusive interview, we sit down with renowned record producer Max Martin to discuss the secrets of his success. From the importance of collaboration to the role of technology in modern music production, Max gives us a glimpse into the world of making hit records.",
      category: "entertainment",
      tags: ["music", "production", "record", "producer", "collaboration"],
      id: "44",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "The Rise of Esports: Inside the World of Competitive Video Gaming",
      description:
        "In this feature, we take a deep dive into the world of esports, exploring the history of competitive video gaming and the rise of professional leagues. With millions of fans and millions of dollars in prize money, esports is now a major player in the world of entertainment, and we examine what the future holds for this growing industry.",
      category: "entertainment",
      tags: ["esports", "video games", "gaming", "competition", "league"],
      id: "45",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const politics = [
    {
      title: "New Bill Introduced to Lower Taxes",
      description:
        "A new bill was introduced today in Congress to lower taxes for middle-class families. The bill would provide a tax break for families earning less than $100,000 per year and would be funded by an increase in taxes on the wealthy.",
      category: "politics",
      tags: ["taxes", "middle-class", "Congress", "wealthy"],
      id: "46",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Senator Calls for Investigation into Corporate Tax Loopholes",
      description:
        "Senator Johnson today called for an investigation into the use of corporate tax loopholes. The senator believes that some corporations are using these loopholes to avoid paying their fair share of taxes.",
      category: "politics",
      tags: ["Senator Johnson", "corporate tax", "investigation", "tax loopholes"],
      id: "47",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/1464210/pexels-photo-1464210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "President Signs New Trade Agreement with China",
      description:
        "President Smith signed a new trade agreement with China today, ending months of negotiations. The agreement includes provisions to increase American exports to China and to protect American intellectual property.",
      category: "politics",
      tags: ["President Smith", "trade agreement", "China", "exports", "intellectual property"],
      id: "48",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1464213/pexels-photo-1464213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New Immigration Law Sparks Debate in Congress",
      description:
        "A new immigration law has been proposed in Congress that would make it easier for immigrants to become citizens. Supporters of the bill say that it would be a humane solution to the country's immigration crisis, while opponents argue that it would encourage more illegal immigration.",
      category: "politics",
      tags: ["immigration law", "Congress", "citizenship", "immigrants"],
      id: "49",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/2698473/pexels-photo-2698473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Election Day in Capital City",
      description:
        "The Capital City went to the polls today to vote in the highly anticipated mayoral election. The two leading candidates, incumbent John Smith and challenger Sarah Lee, have been neck and neck in the polls for weeks.",
      category: "politics",
      tags: ["mayoral election", "voting", "Capital City"],
      id: "50",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1464205/pexels-photo-1464205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Controversial Immigration Bill Passes in Parliament",
      description:
        "After a heated debate, Parliament has passed a controversial bill that will restrict immigration into the country. Supporters of the bill say that it is necessary to protect the country's borders, while opponents argue that it is discriminatory and will harm the economy.",
      category: "politics",
      tags: ["immigration", "Parliament", "discrimination"],
      id: "51",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/2990639/pexels-photo-2990639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Controversial New Law Sparks Debate Among Politicians",
      description:
        "A new law that would drastically limit the rights of citizens has sparked a heated debate among politicians. Supporters say the law is necessary to protect national security, while opponents argue that it violates fundamental human rights. The issue has become a hot-button topic in the upcoming election, with candidates on both sides using it as a rallying cry to energize their base.",
      category: "politics",
      tags: ["debate", "law", "politicians", "human rights"],
      id: "52",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/2681318/pexels-photo-2681318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Celebrity Endorses Presidential Candidate in Hotly Contested Race",
      description:
        "In a move that is sure to excite fans and draw ire from critics, a popular celebrity has announced their endorsement of a presidential candidate in the upcoming election. The endorsement comes at a critical time in the race, with polls showing the two candidates neck-and-neck. The celebrity's announcement has already caused a stir on social media, with supporters and detractors alike voicing their opinions.",
      category: "politics",
      tags: ["celebrity", "endorsement", "presidential election"],
      id: "53",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/4498490/pexels-photo-4498490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Scandal Rocks Capitol as Lawmaker Accused of Bribery",
      description:
        "In a stunning turn of events, a prominent lawmaker has been accused of accepting bribes in exchange for favorable legislation. The accusations have sent shockwaves through Capitol Hill, with members of both parties calling for an immediate investigation. If the allegations are true, it could have serious implications for the future of the lawmaker's political career and the political landscape as a whole.",
      category: "politics",
      tags: ["scandal", "lawmaker", "bribery", "investigation"],
      id: "54",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/4504084/pexels-photo-4504084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New study shows correlation between sleep and productivity",
      description:
        "A new study has found that individuals who get a good night's sleep are more productive at work than those who don't. The study, which was conducted over the course of six months, looked at a group of 500 participants and found a significant correlation between sleep quality and work productivity.",
      category: "politics",
      tags: ["sleep", "productivity", "study", "health", "research"],
      id: "55",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1027509/pexels-photo-1027509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New bill proposed to reduce plastic waste in oceans",
      description:
        "A new bill has been proposed in Congress that would increase regulations on companies producing plastic products and mandate stricter recycling policies. The bill is aimed at reducing plastic waste in the oceans and protecting marine life.",
      category: "politics",
      tags: ["plastic waste", "oceans", "bill", "recycling", "marine life"],
      id: "56",
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "New book by Pulitzer Prize-winning author explores life in the 21st century",
      description:
        "Acclaimed author Jane Smith has released a new book titled 'The Future is Now', which explores the ways in which technology and society are rapidly changing in the 21st century. The book has already garnered critical praise and is being hailed as a must-read for anyone interested in the future of humanity.",
      category: "politics",
      tags: ["book", "Pulitzer Prize", "author", "technology", "society"],
      id: "57",
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/1676963/pexels-photo-1676963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "58",
      title: "Election results shake up political landscape",
      description:
        "The recent election results have sent shockwaves through the political world, with unexpected victories and upsets across the board. The new political landscape is sure to bring major changes to the country in the coming months.",
      category: "politics",
      tags: ["elections", "politics", "victory", "upset", "change"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/2137801/pexels-photo-2137801.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "59",
      title: "New study shows benefits of daily exercise",
      description:
        "A recent study published in the Journal of Health and Fitness has shown that daily exercise can have numerous benefits, including weight loss, increased energy, and improved mental health. Experts recommend at least 30 minutes of exercise per day to achieve these benefits.",
      category: "politics",
      tags: ["exercise", "health", "fitness", "weight loss", "mental health"],
      reporterID: "yQCtOyV2vRBk2eTQ6s5T",
      images:
        "https://images.pexels.com/photos/45243/fitness-jump-health-woman-45243.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "60",
      title: "New breakthrough in cancer research",
      description:
        "Researchers at a leading cancer institute have announced a major breakthrough in the fight against cancer. They have developed a new treatment that has shown promising results in early trials, and they are optimistic that it could be a game-changer in the field of cancer research.",
      category: "politics",
      tags: ["cancer", "research", "breakthrough", "treatment", "medicine"],
      reporterID: "pJQeO9EZEBhYqT2uR0VH",
      images:
        "https://images.pexels.com/photos/3554499/pexels-photo-3554499.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
  ];

  const handleAddDocuments = async () => {
    try {
      await addDocuments("news", politics);
      console.log("Documents added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const { sales, tasks } = reportsLineChartData;

  const [controller, dispatch] = useMaterialUIController();
  const [news, setNews] = useState([]);

  const [trigger, setTrigger] = useState(false);
  let count = [];
  useEffect(() => {
    const fireBaseData = () => {
      // let result = [];
      db.collection("charts")
        .get()
        .then(async (querySnapshot) => {
          const promises = querySnapshot.docs.map(async (doc) => {
            count.push(doc.data().count);
            return doc.data().date;
          });
          const result = await Promise.all(promises);

          setNews({ labels: [...result], datasets: { label: "reports", data: count } });
          setTrigger(true);
        });
    };
    fireBaseData();
    if (!news) {
      setTrigger(!trigger);
    }
  }, [trigger]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Sports"
                img="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                count={controller.newsdata.sports.length}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Entertainment"
                img="https://images.pexels.com/photos/15787730/pexels-photo-15787730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                count={controller.newsdata.entertainment.length}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Politics"
                img="https://images.pexels.com/photos/1464203/pexels-photo-1464203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                count={controller.newsdata.politics.length}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Business"
                img="https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                count={`${controller.newsdata.business.length}`}
                percentage={{
                  color: "success",
                  amount: "2%",
                  label: "Increase",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="DAILY REPORTS"
                  description={
                    <>
                      (
                      <strong>
                        {controller.newsdata.sports.length +
                          controller.newsdata.entertainment.length +
                          controller.newsdata.business.length +
                          controller.newsdata.politics.length}
                        +
                      </strong>
                      ) articles.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={news}
                />
              </MDBox>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3} mt={3}>
                <ReportsBarChart
                  color="dark"
                  title="Total Number of Articles"
                  description={
                    <>
                      (<strong>15+</strong>) articles.
                    </>
                  }
                  date="updated 1 min ago"
                  chart={news}
                />
              </MDBox>
            </Grid>
          </Grid>

          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3} mt={3}>
                <PieChartNews />
                </MDBox>
            </Grid>
          </Grid> */}
        </MDBox>
      </MDBox>
      <div>
        <button onClick={handleAddDocuments}>Add Documents</button>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
