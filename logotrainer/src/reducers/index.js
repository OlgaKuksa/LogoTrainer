import { combineReducers } from "redux";
import kidInModal from "./kidInModal";
import kids from "./kids";
import kidInPage from "./kidInPage";
import exerciseInModal from "./exerciseInModal";
import skills from "./skills";
import skillInModal from "./skillInModal";
import skillGroupInModal from "./skillGroupInModal";
import exerciseList from "./exerciseList";
import testInModal from "./testInModal";
import testResults from "./testResults";
import groups from "./groups";
import setSettingsInModal from "./setSettingsInModal";

const appReducers = combineReducers({
  groups,
  kids,
  kidInModal,
  kidInPage,
  exerciseInModal,
  skills,
  skillInModal,
  skillGroupInModal,
  exerciseList,
  testInModal,
  testResults,
  setSettingsInModal
});

export default appReducers;
