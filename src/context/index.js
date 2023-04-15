import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "ADD_IN_CATEGORY": {
      return {
        ...state,
        newsdata: {
          ...state.newsdata,
          [action.value.category]: [
            ...state.newsdata[`${action.value.category}`],
            action.value.data,
          ],
        },
      };
    }

    

    case "UPDATE_DATA": {
      return {
        ...state,
        newsdata: {
          ...state.newsdata,
          [action.value.category]: [...action.value.data],
        },
      };
    }

    case "POPULATE_NEWS": {
      return {
        ...state,
        newsdata: action.value,
      };
    }
    case "PRINT": {
      return {
        ...state,
        print: action.value,
      };
    }
    case "SETREFRESH": {
      return {
        ...state,
        refresh: action.value,
      };
    }

    case "POPULATE_FRONTPAGE": {
      return {
        ...state,
        newsdata: {
          ...state.newsdata,
          frontPage: [
            state.newsdata.business[0] || "",
            state.newsdata.sports[0] || "",
            state.newsdata.politics[0] || "",
            state.newsdata.entertainment[0]|| "",
            state.newsdata.business[1]|| "",
            state.newsdata.sports[1]|| "",
            state.newsdata.politics[1]|| "",
            state.newsdata.entertainment[1]|| "",
          ],
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    refresh:false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    newsdata: {
      frontPage: [
        // data for front page
      ],

      politics: [],

      business: [],

      sports: [],

      entertainment: [],
    },
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const addCategoryData = (dispatch, value) => dispatch({ type: "ADD_IN_CATEGORY", value });
const setRefresh = (dispatch, value) => dispatch({ type: "SETREFRESH", value });
const setFrontPageData = (dispatch, value) => dispatch({ type: "POPULATE_FRONTPAGE", value });
// const setNewsData = (dispatch, value) => dispatch({ type: "POPULATE_NEWS", value });

const setNewsData = (dispatch, value) => dispatch({ type: "POPULATE_NEWS", value });
const updateData = (dispatch, value) => dispatch({ type: "UPDATE_DATA", value });
const setPrint = (dispatch, value) => dispatch({ type: "PRINT", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  addCategoryData,
  setFrontPageData,
  setNewsData,
  updateData,
  setPrint,
  setRefresh
};
