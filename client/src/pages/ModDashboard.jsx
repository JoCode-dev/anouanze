import React, { createContext, useEffect } from "react";
import LeftBar from "../components/ModDashboard/LeftBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ParoisseBoard from "../components/ModDashboard/ParoisseBoard";
import Actus from "../components/ModDashboard/Actus";
import DemandesBoard from "../components/ModDashboard/DemandesBoard";
import { isEmpty } from "../components/utils/index";

export const ModContext = createContext();

const ModDashboard = () => {
  const [menuId, setMenuId] = useState(1);
  const userDatas = useSelector((state) => state.user.user);

  const toogleMenu = (e) => {
    setMenuId(e);
  };

  return (
    <ModContext.Provider value={{ menuId, toogleMenu }}>
      {!isEmpty(userDatas) ? (
        <div className="mod-dashboard-container">
          <div className="mod-dashboard-left">
            <LeftBar userName={`${userDatas?.name} ${userDatas?.lastName}`} />
          </div>
          <div className="mod-dashboard-center">
            {menuId == 1 && <Actus />}
            {menuId == 2 && <ParoisseBoard />}
            {menuId == 3 && <DemandesBoard />}
          </div>
        </div>
      ) : null}
    </ModContext.Provider>
  );
};

export default ModDashboard;
