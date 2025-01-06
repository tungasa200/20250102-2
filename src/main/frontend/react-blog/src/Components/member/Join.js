import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router";

function Join(){
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [pwd,setPwd] = useState("");
    const [checkPwd,setCheckPwd] = useState("");

    const ChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const ChangeName = (e)=>{
        setName(e.target.value);
    }
    const ChangePwd = (e)=>{
        setPwd(e.target.value);
    }
    const ChangeCheckPwd = (e)=>{
        setCheckPwd(e.target.value);
    }
    const navigate = useNavigate();

    //REST API 아이디 중복체크
    const checkEmailDuplicate = async (email)=>{
        await axios.get(`http://localhost:8080/user/checkId`,{params: {email:email}})
            .then((resp)=> {
                console.log("[Join.js] checkEmailDuplicate success");
                console.log(resp.data);
                if(resp.status === 200){
                    alert("사용가능한 이메일입니다.")
                }

            })
            .catch((error)=> {
                console.log("[Join.js] checkEmailDuplicate fail");
                console.log(error);
                const resp = error.response;
                if(resp === 400){
                    alert(resp.data);
                }
            })
    }

    //REST API 회원가입
    const join = async ()=>{
        const req = {
            email : email,
            password : password,
            passwordCheck : checkPassword,
            username : username,
        }

        await axios
            .post(`http://localhost:8080/user/register`,req)
            .then((resp)=>{
                console.log("[Join.js] join success");
                console.log(resp.data);
                alert(resp.data.username +"님 회원가입 축하드립니다.");
                navigate("/login")
            })
            .catch((error)=> {
                console.log("[Join.js] join fail");
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
                    <th className="col-2">이메일</th>
                    <td>
                        <input type="text" value={email} onChange={changeEmail} size="50px" /> &nbsp; &nbsp;
                        <button className="btn btn-outline-danger" onClick={checkEmailDuplicate}>
                            <i className="fas fa-check"></i> 이메일 중복 확인</button>
                    </td>
                </tr>

                <tr>
                    <th>이름</th>
                    <td>
                        <input type="text" value={name} onChange={changeName} size="50px" />
                    </td>
                </tr>

                <tr>
                    <th>비밀번호</th>
                    <td>
                        <input type="password" value={pwd} onChange={changePwd} size="50px" />
                    </td>
                </tr>

                <tr>
                    <th>비밀번호 확인</th>
                    <td>
                        <input type="password" value={checkPwd} onChange={changeCheckPwd} size="50px" />
                    </td>
                </tr>
                </tbody>
            </table><br />

            <div className="my-3 d-flex justify-content-center">
                <button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입</button>
            </div>

        </div>
    );
}
export default Join;