import React, { createContext } from "react";
import LeftBar from "../components/AdminDashboard/LeftBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DashBoard from "../components/AdminDashboard/DashBoard";
import ParoissesBoard from "../components/AdminDashboard/ParoissesBoard";
import EventsBoard from "../components/AdminDashboard/EventsBoard";
import { isEmpty } from "../components/utils/index";

export const AdminContext = createContext();

const AdminDashboard = () => {
  const [menuId, setMenuId] = useState(1);
  const userDatas = useSelector((state) => state.user.user);

  const toogleMenu = (e) => {
    setMenuId(e);
  };

  return (
    <AdminContext.Provider value={{ menuId, toogleMenu }}>
      {!isEmpty(userDatas) ? (
        <div className="admin-dashboard-container">
          <div className="admin-dashboard-left">
            <LeftBar userName={`${userDatas?.name} ${userDatas?.lastName}`} />
          </div>
          <div className="admin-dashboard-center">
            {menuId == 1 && <DashBoard />}
            {menuId == 2 && <ParoissesBoard />}
            {menuId == 3 && <EventsBoard />}
          </div>
        </div>
      ) : null}
    </AdminContext.Provider>
  );
};

export default AdminDashboard;
