function findMatchingObjects(newsArr, tagsArr) {
  const matchedObjects = [];

  for (const tagObj of tagsArr) {
    let numberOfMatchedTags = 0;
    const matchedTags = [];

    for (const newsObj of newsArr) {
  // console.log("NEWSARRAY",newsObj)

      if(newsObj.description){
        const tagDescWords = tagObj.description.toLowerCase().split(/\W+/);
      const newsDescWords = newsObj.description.toLowerCase().split(/\W+/);
      const matchedTagsForTagObj = tagObj.tags.filter(tag => newsDescWords.includes(tag.toLowerCase()));

      if (matchedTagsForTagObj.length > 0) {
        numberOfMatchedTags += matchedTagsForTagObj.length;
        matchedTags.push(...matchedTagsForTagObj);
      }
      }
    }

    matchedObjects.push({ ...tagObj, numberOfMatchedTags, matchedTags });
  }

  return matchedObjects.sort((a, b) => b.numberOfMatchedTags - a.numberOfMatchedTags);
}

export default findMatchingObjects

// function findMatchingObjects(newsArr, tagsArr) {
//     const matchedObjects = [];

//     for (const tagObj of tagsArr) {
//       for (const newsObj of newsArr) {
//         const newsDescWords = newsObj.description.toLowerCase().split(/\W+/);
//         const matchedTags = tagObj.tags.filter(tag => {
//           const tagRegExp = new RegExp('\\b' + tag.toLowerCase() + '\\b');
//           return newsDescWords.some(word => tagRegExp.test(word));
//         });
//         if (matchedTags.length > 0) {
//           const existingObjectIndex = matchedObjects.findIndex(matchedObj => matchedObj.newsObj === newsObj);
//           if (existingObjectIndex !== -1) {
//             matchedObjects[existingObjectIndex].numberOfMatchedTags += matchedTags.length;
//           } else {
//             matchedObjects.push({ newsObj, numberOfMatchedTags: matchedTags.length });
//           }
//         }
//       }
//     }

//     return matchedObjects.sort((a, b) => b.numberOfMatchedTags - a.numberOfMatchedTags);
//   }




//   const newsArr = [
//     { title: 'Breaking News: Earthquake strikes city', description: 'A powerful earthquake shook the city, causing widespread damage.' },
//     { title: 'Sports News: Local team wins championship', description: 'The local team won the championship in a thrilling game.' },
//     { title: 'Entertainment News: Actor wins award', description: 'Actor John Doe won the award for Best Actor at the annual awards ceremony.' }
//   ];

//   const tagsArr = [
//     { title: 'City hit by earthquake', description: 'A powerful earthquake struck the city today.', tags: ['award', 'city', 'damage'] },
//     { title: 'Sports team wins championship', description: 'The local sports team won the championship in a thrilling game.', tags: ['won'] },
//     { title: 'Actor wins award', description: 'John Doe won the award for Best Actor at the annual awards ceremony.', tags: [] }
//   ];

//   const matchedNews = findMatchingObjects(newsArr, tagsArr);
//   console.log(matchedNews);