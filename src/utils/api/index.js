// const findMatchingObjects = require("../algorithm.js");
// import { useMaterialUIController,setNews } from "context/index.js";

// const runAlgorithm = async (values) => {

//     const [controller,dispatch] = useMaterialUIController();

//     const tagsArr = [
//       { title: 'City hit by earthquake', description: 'A powerful earthquake struck the city today.', tags: ['Investors', 'city', 'recession'] },
//       { title: 'Sports team wins championship', description: 'The local sports team won the championship in a thrilling game.', tags: ['won'] },
//       { title: 'Actor wins award', description: 'John Doe won the award for Best Actor at the annual awards ceremony.', tags: [] }
//     ];
//     const resultArr = await Promise.all(
//       values.map(async (item) => {
//         const matchingObjects = await findMatchingObjects(item.data.value, tagsArr);
//         return {
//             [`${item.category.toLowerCase()}`]: matchingObjects,
//         };
//       })
//     );
//     console.log(resultArr);
//     setNews(dispatch,resultArr);
//   };
  
//   module.exports = runAlgorithm;
  





//   // const newsArr = [
//   //   { title: 'Breaking News: Earthquake strikes city', description: 'A powerful earthquake shook the city, causing widespread damage.' },
//   //   { title: 'Sports News: Local team wins championship', description: 'The local team won the championship in a thrilling game.' },
//   //   { title: 'Entertainment News: Actor wins award', description: 'Actor John Doe won the award for Best Actor at the annual awards ceremony.' }
//   // ];



//   // const matchedNews = findMatchingObjects(newsArr, tagsArr);
//   // console.log(matchedNews);