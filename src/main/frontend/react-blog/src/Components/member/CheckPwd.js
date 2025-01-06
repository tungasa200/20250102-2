import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {AuthContext} from "../context/AuthProvider";
import {HttpHeadersContext} from "../context/HttpHeadersProvider";

import MemberUpdate from "./MemberUpdate";

function CheckPwd(){
    const {headers, setHeaders} = useContext(HttpHeadersContext);
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [pwd,setPwd] = useState("");
    const [showMemberUpdate,setShowMemberUpdate] = useState(false);

    const ChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const ChangeName = (e)=>{
        setName(e.target.value);
    }
    const ChangePwd = (e)=>{
        setPwd(e.target.value);
    }

    useEffect(() => {
        setHeaders({
            Auhorization:`Bearer ${localStorage.getItem("bbs_access_token")}`,
        })
    }, []);


    return (
        <div>
            {showMemberUpdate ? (
                <MemberUpdate email={email} name={name} />
            ) : (
                <>
                    <table className="table">
                        <tbody>
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

                    <div className="my-3 d-flex justify-content-center">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={passwordCheck}
                        >
                            <i className="fas fa-user-plus"></i>비밀번호 확인
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export default CheckPwd;