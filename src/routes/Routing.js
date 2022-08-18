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
    const roleCheck = (role) => {
        return _.includes(authToken.permissions, role);
    }

    return (<HashRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={!roleCheck('superAdmin') ? <Dashboard/> : <AdminUsers/>}/>
            <Route path="/budget/:year" element={!roleCheck('superAdmin') ? <BudgetDetail/> : <AccessDenied/>}/>
            <Route path="/allBudgets" element={!roleCheck('superAdmin') ? <AllBudgets/> : <AccessDenied/>}/>
            <Route path="/admin/users" element={roleCheck('admin') ? <Users/> : <AccessDenied/>}/>
            <Route path="/admin/user/create" element={roleCheck('admin') ? <CreateUserBox/> : <AccessDenied/>}/>
            <Route path="/admin/user/update/:userId" element={roleCheck('admin') ? <UpdateUser/> : <AccessDenied/>}/>
            <Route path="/admin/municipality" element={roleCheck('admin') ? <Municipality/> : <AccessDenied/>}/>
            <Route path="/admin/municipality/update/:municipalityId"
                   element={roleCheck('admin') ? <UpdateMunicipality/> : <AccessDenied/>}/>
            <Route path="/admin/translations" element={roleCheck('admin') ? <Translations/> : <AccessDenied/>}/>
            <Route path="/admin/translation/create"
                   element={roleCheck('admin') ? <CreateTranslation/> : <AccessDenied/>}/>
            <Route path="/admin/translation/update/:translationId"
                   element={roleCheck('admin') ? <UpdateTranslation/> : <AccessDenied/>}/>
            <Route path="/superAdmin" element={roleCheck('superAdmin') ? <AdminUsers/> : <AccessDenied/>}/>
            <Route path="/superAdmin/users" element={roleCheck('superAdmin') ? <AdminUsers/> : <AccessDenied/>}/>
            <Route path="/superAdmin/user/create" element={roleCheck('superAdmin') ? <CreateAdmin/> : <AccessDenied/>}/>
            <Route path="/superAdmin/user/update/:userId"
                   element={roleCheck('superAdmin') ? <UpdateAdminUser/> : <AccessDenied/>}/>
            <Route path="/superAdmin/municipalities" element={roleCheck('superAdmin') ? <SuperAdminMunicipalities/> :
                <AccessDenied/>}/>
            <Route path="/superAdmin/municipality/create"
                   element={roleCheck('superAdmin') ? <CreateMunicipality/> : <AccessDenied/>}/>
        </Routes>
    </HashRouter>)
};

export default Routing;