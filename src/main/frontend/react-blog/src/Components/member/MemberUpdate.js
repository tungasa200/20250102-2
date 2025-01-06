import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {AuthContext} from "../context/AuthProvider";
import {HttpHeadersContext} from "../context/HttpHeadersProvider";

function MemberUpdate(props){
    const {headers, setHeaders} = useContext(HttpHeadersContext);
    const [name,setName] = useState("");
    const [pwd,setPwd] = useState("");
    const [checkPwd,setCheckPwd] = useState("");

    const email = props.email;

    const navigate = useNavigate();

    const ChangeName = (e)=>{
        setName(e.target.value);
    }
    const ChangePwd = (e)=>{
        setPwd(e.target.value);
    }
    const ChangeCheckPwd = (e)=>{
        setCheckPwd(e.target.value);
    }

    useEffect(() => {
        setHeaders({
            Auhorization:`Bearer ${localStorage.getItem("bbs_access_token")}`,
        })
        setName(props.name);
    }, [props.name]);

    /* 회원 정보 수정 */
    const update = async () => {

        const req = {
            password: pwd,
            passwordCheck: checkPwd,
            username: name,
        }


        await axios.post("http://localhost:8989/user/update", req, {headers: headers})
            .then((resp) => {
                console.log("[MemberUpdate.js] update() success :D");
                console.log(resp.data);

                alert(resp.data.username + "님의 회원 정보를 수정했습니다");
                navigate("/");

            }).catch((err) => {
                console.log("[MemberUpdate.js] update() error :<");
                console.log(err);

                const resp = err.response;
                if (resp.status === 400) {
                    alert(resp.data);
                }
            });
    }

    return (
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <th>이메일</th>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            size="50px"
                            readOnly
                        />
                    </td>
                </tr>

                <tr>
                    <th>이름</th>
                    <td>
                        <input
                            type="text"
                            value={name}
                            onChange={changeName}
                            size="50px"
                        />
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

                <tr>
                    <th>비밀번호 확인</th>
                    <td>
                        <input
                            type="password"
                            value={checkPwd}
                            onChange={changeCheckPwd}
                            size="50px"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <br />

            <div className="my-3 d-flex justify-content-center">
                <button className="btn btn-outline-secondary" onClick={update}>
                    <i className="fas fa-user-plus"></i>정보 수정
                </button>
            </div>
        </div>
    );
}
export default MemberUpdate;