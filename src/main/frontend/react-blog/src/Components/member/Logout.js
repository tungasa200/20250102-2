import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {AuthContext} from "../context/AuthProvider";
import {HttpHeadersContext} from "../context/HttpHeadersProvider";

function Logout(){
    const [auth,setAuth] = useContext(AuthContext);
    const [headers,setHeaders] = useContext(HttpHeadersContext);
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem("bbs_access_token");
        localStorage.removeItem("id");

        alert(auth+"님 로그아웃 되었습니다.");
        setAuth(null);
        navigate("/");

        useEffect(() => {
            logout();
        }, []);
    }
}
export default Logout;