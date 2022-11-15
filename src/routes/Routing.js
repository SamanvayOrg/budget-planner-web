import {HashRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../views/Dashboard";
import React, {useEffect} from "react";
import Home from "../views/Home";
import BudgetDetail from "../views/BudgetDetail";
import AllBudgets from "../views/AllBudgets";
import Users from "../views/Admin/Users";
import Municipality from "../views/Admin/Municipality";
import CreateUserBox from "../views/Admin/CreateUser";
import UpdateUser from "../views/Admin/UpdateUser";
import UpdateMunicipality from "../views/Admin/UpdateMunicipality";
import AdminUsers from "../views/superAdmin/AdminUsers";
import CreateAdmin from "../views/superAdmin/CreateAdmin";
import UpdateAdminUser from "../views/superAdmin/UpdateAdminUser";
import SuperAdminMunicipalities from "../views/superAdmin/SuperAdminMunicipalities";
import CreateMunicipality from "../views/superAdmin/CreateMunicipality";
import CreateTranslation from "../views/Admin/CreateTranslation";
import Translations from "../views/Admin/Translations"
import UpdateTranslation from "../views/Admin/UpdateTranslation"
import AccessDenied from "../components/AccessDenied";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {currentUserSelector, fetchCurrentUser} from "../slices/currentUserReducer";

const Routing = () => {
    const {authToken} = useSelector(currentUserSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch])
    const roleCheck = (role) => _.includes(authToken.permissions, role);
    const isSuperAdmin = () => roleCheck('superAdmin');
    const isAdmin = () => roleCheck('admin');

    return (<HashRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={isSuperAdmin() ? <AdminUsers/> : <Dashboard/>}/>
            <Route path="/budget/:year" element={isSuperAdmin() ? <AccessDenied/> : <BudgetDetail/>}/>
            <Route path="/allBudgets" element={isSuperAdmin() ? <AccessDenied/> : <AllBudgets/>}/>
            <Route path="/admin/users" element={isAdmin() ? <Users/> : <AccessDenied/>}/>
            <Route path="/admin/user/create" element={isAdmin() ? <CreateUserBox/> : <AccessDenied/>}/>
            <Route path="/admin/user/update/:userId" element={isAdmin() ? <UpdateUser/> : <AccessDenied/>}/>
            <Route path="/admin/municipality" element={isAdmin() ? <Municipality/> : <AccessDenied/>}/>
            <Route path="/admin/municipality/update/:municipalityId"
                   element={isAdmin() ? <UpdateMunicipality/> : <AccessDenied/>}/>
            <Route path="/admin/translations" element={isAdmin() ? <Translations/> : <AccessDenied/>}/>
            <Route path="/admin/translation/create"
                   element={isAdmin() ? <CreateTranslation/> : <AccessDenied/>}/>
            <Route path="/admin/translation/update/:translationId"
                   element={isAdmin() ? <UpdateTranslation/> : <AccessDenied/>}/>
            <Route path="/superAdmin" element={isSuperAdmin() ? <AdminUsers/> : <AccessDenied/>}/>
            <Route path="/superAdmin/users" element={isSuperAdmin() ? <AdminUsers/> : <AccessDenied/>}/>
            <Route path="/superAdmin/user/create" element={isSuperAdmin() ? <CreateAdmin/> : <AccessDenied/>}/>
            <Route path="/superAdmin/user/update/:userId"
                   element={isSuperAdmin() ? <UpdateAdminUser/> : <AccessDenied/>}/>
            <Route path="/superAdmin/municipalities" element={isSuperAdmin() ? <SuperAdminMunicipalities/> :
                <AccessDenied/>}/>
            <Route path="/superAdmin/municipality/create"
                   element={isSuperAdmin() ? <CreateMunicipality/> : <AccessDenied/>}/>
        </Routes>
    </HashRouter>)
};

export default Routing;
