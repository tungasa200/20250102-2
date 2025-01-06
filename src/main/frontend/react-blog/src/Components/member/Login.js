import axios from "axios";
import {useContext, useState} from "react";
import {useNavigate} from "react-router";

import {AuthContext} from "../context/AuthProvider";
import {HttpHeadersContext} from "../context/HttpHeadersProvider";

function Login(){
    const [auth,setAuth] = useContext(AuthContext);
    const [headers,setHeaders] = useContext(HttpHeadersContext);
    const navigate = useNavigate();

    const {id,setId} = useState("");
    const [pwd, setPwd] =useState("");
    const ChangeId = (e)=>{
        setId(e.target.value);
    }
    const ChangePwd = (e)=>{
        setPwd(e.target.value);
    }

//REST API 로그인
    const login = async ()=>{
        const req = {
            email : id,
            password : pwd,
        }

        await axios
            .post(`http://localhost:8080/user/register`,req)
            .then((resp)=>{
                console.log("[login.js] login success");
                console.log(resp.data);
                alert(resp.data.email +"로그인 되었습니다.");
                navigate("/bbslist");
                localStorage.setItem("bbs_access_token", resp.data.token);
                localStorage.setItem("id", resp.data.email);

                setAuth(resp.data.email);
                setHeaders({Authorization:`Bearer ${resp.data.token}`});
            })
            .catch((error)=> {
                console.log("[login.js] login fail");
                console.log(error);
                const resp = error.response;
                if(resp === 400){
                    alert(resp.data);
                }
            })
    }

    return (
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <th className="col-3">아이디</th>
                    <td>
                        <input type="text" value={id} onChange={changeId} size="50px" />
                    </td>
                </tr>

                <tr>
                    <th>비밀번호</th>
                    <td>
                        <input
                            type="password"
                            value={pwd}
                            onChange={changePwd}
                            size="50px"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <br />

            <div className="my-1 d-flex justify-content-center">
                <button className="btn btn-outline-secondary" onClick={login}>
                    <i className="fas fa-sign-in-alt"></i> 로그인
                </button>
            </div>
        </div>
    );
}
export default Login;