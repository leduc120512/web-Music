import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./compodens/Layout/DefaultLayout";
import PageTUYETAP from "./pages/layout-page/tuyentap";
import PagePlayList from "./pages/layout-page/playlist";
import Pagevideo from "./pages/layout-page/Menu";
import Login from "./pages/Login_logOut/Login";
import UpLoad from "./pages/UpLoad";
import Play_music from "./pages/Play_music";
import Search_results from "./pages/results_search";
import Profile from "./pages/profile";
import Profile2 from "./pages/profile2";
import Update_create from "./pages/profile/Content_profile/update_create/Update_list_music";
import Create_list from "./pages/profile/Content_profile/update_create/create_list";
import Importt from "./compodens/Layout/DefaultLayout/header/header-nav-music/top100/Import_to";

import Contentt from "./pages/profile/Content_profile/Content_content-";
import Contentt_main from "./pages/profile/Content_profile/Content_main";
import Contentt_Video from "./pages/profile/Video_profile";
import UpLoadd from "./pages/profile/Content_profile/quanli_upload";
import Friend_live from "./pages/profile/Content_profile/Friend_live";
import Top100_ from "./pages/layout-page/Top_100";
import Admin from "../src/compodens/admin"
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/BAIHAT" element={<PageTUYETAP />} />
          <Route path="/Playlist" element={<PagePlayList />} />
          <Route path="/Video" element={<Pagevideo />} />
          <Route path="/top_100" element={<Top100_ />} />

          <Route path="/UpLoad" element={<UpLoad />} />
          <Route path="/Nhac/:id" element={<Play_music />} />

          <Route path="/profile/:section" element={<Create_list />} />

          <Route path="/Search_results/:id" element={<Search_results />} />
          <Route path="/Create_list_music" element={<Update_create />} />

          <Route path="/Update_list_music" element={<Create_list />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="Vietnam" element={<Importt />}>
            {" "}
          </Route>
        </Routes>
        <Routes>
          <Route path="Losgin" element={<Login />} />
          <Route path="/Profile" element={<Profile />}>
            <Route index element={<Contentt />} />
            <Route path="Maiprofile" element={<Contentt_main />} />{" "}
            <Route path="Contentt_Video" element={<Contentt_Video />} />
            <Route path="upload_proifle" element={<UpLoadd />} />
            <Route path="Friend_live" element={<Friend_live />} />
          </Route>
        </Routes>
        <Routes>

          <Route path="/ProfileAuthor/:id" element={<Profile2 />}>
            <Route index element={<Contentt />} />
            <Route path="Maiprofile" element={<Contentt_main />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
