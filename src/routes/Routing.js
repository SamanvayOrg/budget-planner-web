import {HashRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../views/Dashboard";
import React from "react";
import Home from "../views/Home";
import BudgetDetail from "../views/BudgetDetail";
import AllBudgets from "../views/AllBudgets";
import Users from "../views/Users";
import Municipality from "../views/Municipality";
import CreateUserBox from "../components/CreateUserBox";
import UpdateUser from "../components/UpdateUser";
import UpdateMunicipality from "../views/UpdateMunicipality";
import AdminUsers from "../views/superAdmin/AdminUsers";
import SuperAdminOrgAdmin from "../views/superAdmin/SuperAdminOrgAdmin";
import CreateAdmin from "../views/superAdmin/CreateAdmin";

const Routing = () => {
    return (<HashRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/budget/:year" element={<BudgetDetail/>}/>
            <Route path="/allBudgets" element={<AllBudgets/>}/>
            <Route path="/admin/users" element={<Users/>}/>
            <Route path="/admin/user/create" element={<CreateUserBox/>}/>
            <Route path="/admin/user/update/:userId" element={<UpdateUser/>}/>
            <Route path="/admin/municipality" element={<Municipality/>}/>
            <Route path="/admin/municipality/update/:municipalityId" element={<UpdateMunicipality/>}/>
            <Route path="/superAdmin" element={<AdminUsers/>}/>
            <Route path="/superAdmin/users" element={<SuperAdminOrgAdmin/>}/>
            <Route path="/superAdmin/user/create" element={<CreateAdmin/>}/>

        </Routes>
    </HashRouter>)
};

export default Routing;