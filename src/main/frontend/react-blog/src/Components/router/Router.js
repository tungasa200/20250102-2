import {Routes, Route} from "react-router-dom";
import Home from "../app/Home";
import BbsList from "../bbs/BbsList";
import BbsWrite from "../bbs/BbsWrite";
import BbsDetail from "../bbs/BbsDetail";
import BbsUpdate from "../bbs/BbsUpdate";
import BbsAnswer from "../bbs/BbsAnswer";
import Login from "../member/Login";
import Join from "../member/Join";
import CheckPwd from "../member/CheckPwd";
import MemberUpdate from "../member/MemberUpdate"
import Logout from "../member/Logout";

function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home />}/>

            {/*Bbs*/}
            <Route path="/bbslist" element={<BbsList />}/>
            <Route path="/bbswrite" element={<BbsWrite />}/>
            <Route path="/bbsdetail/:boardId" element={<BbsDetail />}/>
            <Route path="/bbsupdate" element={<BbsUpdate />}/>
            <Route path="/bbsanswer/:parentSeq" element={<BbsAnswer />}/>

            {/*Member*/}
            <Route path="/login" element={<Login />}/>
            <Route path="/join" element={<Join />}/>
            <Route path="/checkpwd" element={<CheckPwd />}/>
            <Route path="/memberupdate" element={<MemberUpdate />}/>
            <Route path="/logout" element={<Logout />}/>

        </Routes>
    )   ;
}
