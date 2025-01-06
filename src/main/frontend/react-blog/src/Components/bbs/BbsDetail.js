import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link} from "react-router-dom";
import axios from "axios";

//member auth
import {AuthContext, AuthProvider} from "../context/AuthProvider";
import {HttpHeadersProvider} from "../context/HttpHeadersProvider";

//css
import "../../css/bbsdetail.css";

//comment
import CommemtWrite from "../comment/CommentWrite";
import CommemtList from "../comment/CommentList";

//파일추가
import FileDisplay from "../file/FileDisplay";

function BbsDetail() {
    const [auth, setAuth] = useContext(AuthContext);
    const [headers, setHeaders] = useContext(HttpHeadersProvider);
    const navigate = useNavigate();

    const [bbs, setBbs] = useState();
    const {boardId} = useParams();

    const getBbsDetail =async ()=>{
        try{
            const response = await axios.get(`http://localhost:8080/board/${boardId}`);
            console.log("[BbsDetail.js] getBbsDetail() success");
            console.log(response.data);
            setBbs(response.data);
        }catch(error){
            console.log("[BbsDetail.js] getBbsDetail() error");
            console.log(error)
        }
    }

    const deleteBbs = async(boardId) =>{
        try{
            const response = await axios.delete(`http://localhost:8080/board/${boardId}`, {headers:headers});
            console.log("[BbsDetail] bbsDelete() success");
            console.log(response.data)
            if(response.status == 200){
                alert('Delete Complete.');
                navigate("/bbslist");
            }
        }catch(error){
            console.log("[BbsDetail] bbsDelete() error");
            console.error(error);
        }
    }
    const parentBbs = {
        boardId: bbs.boardId,
        title: bbs.title
    }

    return(
        <div className="bbs-detail-container">
            <div>
                <div className="my-3 d-flex justify-content-end">
                    <Link className="btn btn-outline-secondary" to="/bbslist">
                        <i className="fas fa-list">글 목록</i>
                    </Link> &nbsp;

                    <Link className="btn btn-outline-secondary" to={{pathname : `/bbsanswer/${bbs.boardId}`}} state={{parentBbs: parentBbs}} >
                        <i className="fas fa-list">답글 쓰기</i>
                    </Link> &nbsp;

                    {
                        (localStorage.getItem("id") == bbs.writerName) ?
                            <>
                                <Link className="btn btn-outline-secondary" to="/bbsupdate" state={{bbs:updateBbs}}>
                                    <i className="fas fa-list">수정</i>
                                </Link> &nbsp;
                                <button className="btn btn-outline-danger" onClick={deleteBbs}>
                                    <i className="fas fa-trash-alt">삭제</i>
                                </button>
                            </>
                            : null
                    }
                </div>
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <th className="col-3">작성자</th>
                        <td>
                            <span>{bbs.writerName}</span>
                        </td>
                    </tr>
                    <tr>
                        <th className="col-3">제목</th>
                        <td>
                            <span>{bbs.title}</span>
                        </td>
                    </tr>
                    <tr>
                        <th className="col-3">작성일</th>
                        <td>
                            <span>{bbs.createDate}</span>
                        </td>
                    </tr>
                    <tr>
                        <th className="col-3">조회수</th>
                        <td>
                            <span>{bbs.viewCount}</span>
                        </td>
                    </tr>
                    <tr>
                        <th className="col-3">내용</th>
                        <td>

                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="content-box">
                    {bbs.content}
                </div>
                <div>
                    <FileDisplay files={bbs.files} boardId={boardId }/>
                </div>

                <CommemtList boardId={boardId}/>
                {
                    (auth) ?
                        <CommemtWrite boardId={boardId}/>
                        :
                        null
                }
            </div>
        </div>
    );
}
export default BbsDetail;