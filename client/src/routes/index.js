import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Accueil
import Home from "../pages/Home";

// Connexion
import Login from "../pages/Login";

// Évènement
import Event from "../pages/Event";

// Évènements
import Events from "../pages/Events";

// Paroisse
import Paroisse from "../pages/Paroisse";

// Provinces
import Provinces from "../pages/Provinces";

// Diocèse
import Diocese from "../pages/Diocese";

// Paroisses
import Paroisses from "../pages/Paroisses";

// Tableaux de bord
// Admin
import AdminDashboard from "../pages/AdminDashboard";

// Moderator
import ModDashboard from "../pages/ModDashboard";

// Actualité
import Actu from "../pages/Actu";

// Demande de messe
import Demandes from "../pages/Demandes";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event" element={<Events />} />
        <Route path="/provinces" element={<Provinces />} />
        <Route path="/diocese/:name" element={<Diocese />} />
        <Route path="/paroisse/:id" element={<Paroisse />} />
        <Route path="/paroisses" element={<Paroisses />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/mod-dashboard" element={<ModDashboard />} />
        <Route path="/actu/:id" element={<Actu />} />
        <Route path="/demande" element={<Demandes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
