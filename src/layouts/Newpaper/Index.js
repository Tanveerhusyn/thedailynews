import React from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import News from "./News";
import axios from "axios";
import ContinueDetail from './ContinueDetail'
import PLimit from "p-limit";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton } from "@mui/material";
import "./news.css";
import { setNewsData, useMaterialUIController, setFrontPageData, setPrint } from "../../context";
import findMatchingObjects from "utils/algorithm";
import MDTypography from "components/MDTypography";
const Newspaper = () => {
  const [controller, dispatch] = useMaterialUIController();

  const printFunction = () => {
    setPrint(dispatch, true);

    setTimeout(() => {
      window.print();
    }, 1000);
  };
  const limit = PLimit(2); // create a limit of 2 requests per second

  // const fetchData = (category) => {
  //   const options = {
  //     method: "GET",
  //     url: "https://bing-news-search1.p.rapidapi.com/news",
  //     params: { category, mkt: "en-US", safeSearch: "Off", textFormat: "Raw" },
  //     headers: {
  //       "X-BingApis-SDK": "true",
  //       "X-RapidAPI-Key": "44f7514c99mshb269493945e557ep1d09bbjsn66d667c48358",
  //       "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  //     },
  //   };
  //   return limit(() => axios.request(options).then((response) => response.data));
  // };

  const fetchNews = (category) => {
    const API_KEY = "2fc52b2c506f42a38727e09b0ac6dbf7";
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&category=${category}`;

    return axios.get(API_URL).then((response) => response.data);
    // axios.get(API_URL)
    //   .then(response => {
    //     console.log("Report",response.data);
    //     // Handle the response data here
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // Handle the error here
    //   });
  };

  const runAlgo = async (newsData) => {
   
    const resultArr = await Promise.all(
      newsData.map(async (item) => {
        const tagsA = controller.newsdata[`${
          item.category.toLowerCase() == "general" ? "politics" : item.category.toLowerCase()
        }`]
        const matchingObjects = await findMatchingObjects(item.data.articles, tagsA);
        return {
          [`${
            item.category.toLowerCase() == "general" ? "politics" : item.category.toLowerCase()
          }`]: matchingObjects,
        };
      })
    );

    const myObject = Object.assign({}, ...resultArr);
    const frontPageData = [
      myObject.business[0],
      myObject.politics[0],
      myObject.sports[0],
      myObject.entertainment[0],
      myObject.business[1],
      myObject.politics[1],
      myObject.sports[1],
      myObject.entertainment[1],
    ].filter(Boolean);

    const myUpdatedObject = {
      ...myObject,
      frontPage: frontPageData,
    };
    // console.log("result", myUpdatedObject);
    // setNewsData(dispatch,myUpdatedObject);

  };

  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    setFrontPageData(dispatch, "dsfs");
    setNews(controller.newsdata);

    const handleAfterPrint = () => {
      setPrint(dispatch, false);
    };

    const categories = ["Business", "General", "Entertainment", "Sports"];
    const fetchAllData = async () => {
      const allData = await Promise.all(categories.map((category) => fetchNews(category)));
      const newsData = categories.map((category, index) => ({ category, data: allData[index] }));
      // setNews(newsData);
      console.log("All categories fetched!", newsData);
      runAlgo(newsData);
    };
    fetchAllData();

    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  // console.log("value", controller);

  const title = "The Daily News";
  const date = new Date(Date.now()).toDateString()
  const headofficeAddress = "Islamabad, Pakistan";
  const websiteURL = "www.newspaper.com";


  const imageUrl = "https://images.pexels.com/photos/4416260/pexels-photo-4416260.jpeg";

  const handleScroll = (e) => {
    e.preventDefault();

    const category = e.target.dataset.category;
    const categorySection = document.getElementById(category);

    if (categorySection) {
      window.scrollTo({
        top: categorySection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const newsItems = [
    {
      id:"frontPage",
      category: "frontPage",
      order: [1, 2, 3, 4],
      data: controller.newsdata.frontPage,
    },
    {
      id: "sports",
      category: "Sports",
      order: [4, 3, 1, 2],
      data: controller.newsdata.sports,
    },
    {
      id: "entertainment",
      category: "Entertainment",
      order: [1, 2, 4, 3],
      data: controller.newsdata.entertainment,
    },
    {
      id: "business",
      category: "Business",
      order: [2, 3, 1, 4],
      data: controller.newsdata.business,
    },
    {
      id: "politics",
      category: "Politics",
      order: [3, 4, 2, 1],
      data: controller.newsdata.politics,
    },
  ];
  
  const newsPages = [];
  
  newsItems.forEach((item) => {
    const { id, category, data } = item;
   
    if(data.length > 0){
      const totalPages = Math.ceil(data.length / 8);
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * 8;
      const endIndex = (i + 1) * 8;
      const pageData = data.slice(startIndex, endIndex);
      const pageId = i === 0 ? `${id}-page-1` : `${id}-page-${i + 1}`;
      newsPages.push({
        id: pageId,
        category,
        data: pageData,
        order: [1, 2, 3, 4],
      });
    }
    }
  });
  
  const remainingNews = newsItems.reduce((acc, item) => {
    const { data } = item;
    const remaining = data.slice(8);
    return acc.concat(remaining.map((newsItem) => ({ ...newsItem, category: item.category })));
  }, []);
  
  const remainingPagesCount = Math.ceil(remainingNews.length / 8);
  
  for (let i = 0; i < remainingPagesCount; i++) {
    const pageData = remainingNews.slice(i * 8, (i + 1) * 8);
    const newData = pageData.filter((item) => {
      return item.category != 'frontPage';
    });

    
    newsPages.push({
      id: `remaining-page-${i + 1}`,
      category: "Remaining",
      data: newData,
      order: [1, 2, 3, 4],
    })
  }
  
  console.log("newsPages",newsPages)


  const detailPages = [];
  
  newsItems.forEach((item) => {
    const { id, category, data } = item;
    const totalPages = Math.ceil(data.length / 4);
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * 4;
      const endIndex = (i + 1) * 4;
      const pageData = data.slice(startIndex, endIndex);
      const pageId = i === 0 ? `${id} ${i+1}` : `${id} ${i+1}`;
      
  
    if(category!=='frontPage'){
      detailPages.push({
        id: pageId,
        category,
        data: pageData,
        ctnNum: i+1,
        order: [1, 2, 3, 4],
      });
    }
    }
  });
  
  // const remainingDetails = newsPages.reduce((acc, item) => {
  //   const { data } = item;
  //   console.log("REM",item)
  //   const remaining = data.slice(4);
  //   return acc.concat(remaining.map((newsItem) => ({ ...newsItem, category: item.category })));
  // }, []);
  
  // const remainingPgs = Math.ceil(remainingDetails.length / 4);
  
  // for (let i = 0; i < remainingPgs; i++) {
  //   const pageData = remainingDetails.slice(i * 4, (i + 1) * 4);
  //   const newData = pageData.filter((item) => {
  //     return item.category != 'frontPage';
  //   });

     
    
  //   detailPages.push({
  //     id: `remaining-page-${i + 1}`,
  //     category: "BackPage",
  //     data: newData,
  //     order: [1, 2, 3, 4],
  //   })
  // }
  function handleSelect(event) {
    const targetId = event.target.value;
    const targetElement = document.getElementById(targetId);
  
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // console.log(detailPages,detailPages.length)
  
  return (
    <DashboardLayout>
      {!controller.print && (
        <div className="mycontainer">
          <div style={{display:'flex',justifyContent:'space-between'}} >
          <div className="categories">
            {newsPages.map((item) => {
              //  console.log("pages",item)
               
              return (
            <>
            {
              item.data.length>=8 &&     <a
              key={item.id}
              href="#"
              className="button"
              data-category={item.id}
              onClick={handleScroll}
            >
              {item.category}
            </a>
            }
            </>
              )
            })}
          
          </div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
         <select onChange={handleSelect}>
  <option value="">Select detail pages</option>
  {detailPages.map((item) => {
    // console.log("Detail",item)
    return item.data.length >= 4 && (
      <option key={item.id} value={item.id}>
        {item.id}
      </option>
    );
  })}
</select>
         </div>
          <IconButton onClick={printFunction}>
            <PrintIcon style={{ color: "white" }} />
          </IconButton>
          </div>
        
        </div>
      )}
      {/* {!controller.print && (
        <div className="mycontainer app-bar">
          <MDTypography color="white">Details</MDTypography>
         <select onChange={handleSelect}>
  <option value="">Select a page</option>
  {detailPages.map((item) => {
    // console.log("Detail",item)
    return item.data.length >= 4 && (
      <option key={item.id} value={item.id}>
        {item.id}
      </option>
    );
  })}
</select>
        </div>
      )} */}


  
      {newsPages?.map((page,idx) => (
        <section id={page.id} key={idx}>
       
           {
            page.data.length>=8 &&  <News
            title={title}
            date={date}
            id = {page.id}
            continuePageNum={{
              frontPage:[1,2],
              business:[1,2],
              sports:[1,2],
              politics:[1,2],
              entertainment:[1,2],
              Remaining:[1,2]
            }}
            category={page.category}
            headofficeAddress={headofficeAddress}
            websiteURL={websiteURL}
            content={page.data}
            imageUrl={imageUrl}
            order1={page.order[0]}
            order2={page.order[1]}
            order3={page.order[2]}
            order4={page.order[3]}
            /> 
           }
          
        </section>
      ))}

      {
         detailPages?.map((page,idx) => (
          <section id={page.id} key={idx}>
         
             {
              page.data.length>=4 && page.category!='frontPage' &&  <ContinueDetail
              title={title}
              date={date}
              category={page.id}
              headofficeAddress={headofficeAddress}
              websiteURL={websiteURL}
              content={page.data}
              imageUrl={imageUrl}
              ctnNum= {page.ctnNum}
              order1={page.order[0]}
              order2={page.order[1]}
              order3={page.order[2]}
              order4={page.order[3]}
              /> 
             }
            
          </section>
        ))
      }
    </DashboardLayout>
  );
  
};

export default Newspaper;