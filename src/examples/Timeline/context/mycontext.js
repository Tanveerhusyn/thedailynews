import React, { createContext, useState } from "react";

export const NewsContext = createContext();

export default function NewspaperConext({ children }) {
  const [newsData, setNewsData] = useState([]);

  return <NewsContext.Provider value={{ newsData, setNewsData }}>{children}</NewsContext.Provider>;
}

// import { FormContext } from './context/FormContext';
// const [formDetails, setFormDetails] = React.useContext(FormContext)
