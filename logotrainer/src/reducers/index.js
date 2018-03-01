import { combineReducers } from "redux";
import kidInModal from "./kidInModal";
import kids from "./kids";
import kidInPage from "./kidInPage";
import exerciseInModal from "./exerciseInModal";
import skills from "./skills";
import skillInModal from "./skillInModal";
import skillGroupInModal from "./skillGroupInModal";
import exerciseList from "./exerciseList";

const appReducers = combineReducers({
  kids,
  kidInModal,
  kidInPage,
  exerciseInModal,
  skills,
  skillInModal,
  skillGroupInModal,
  exerciseList
});

export default appReducers;
