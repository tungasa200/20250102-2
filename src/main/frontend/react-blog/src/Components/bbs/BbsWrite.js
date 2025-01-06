import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

//member auth
import {AuthContext} from "../context/AuthProvider";
import {HttpHeadersContext} from "../context/HttpHeadersProvider";

//css
import "../../css/bbswrite.css"

function BbsWrite() {
    const [auth, setAuth] = useContext(AuthContext);
    const [headers, setHeaders] = useContext(HttpHeadersContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setConetent] = useState("");
    const [files, setFiles] = useState([]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }
    const changeContent = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeFile = (event) => {
        // 총 5개까지만 허용
        const selectedFiles = Array.from(event.target.files).slice(0, 5);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };
    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const fileUpload = async (boardId)=>{
        console.log("업로드할 파일 목록:", files);
        const fd = new FormData();
        files.forEach((file)=>fd.append("file",file));
        await axios
            .post(`http://localhost:8080/board/${boardId}/file/upload`,fd,{headers:headers})
            .then((resp) => {
                console.log("[file.js fileUpload()] success");
                console.log(resp.data);
                alert("file upload complete")
            })
            .catch((err)=>{
                console.log("[file.js fileUpload()] error");
                console.log(err);
                alert("file upload failed")
            })
    };
    const createBbs = async ()=>{
        const req ={
            title :title,
            content:content
        }
        await axios
            .post(`http://localhost:8080/board/write`, req,{headers:headers})
            .then((resp)=>{
                console.log("[BbsWrite.js] createBbs() success");
                console.log(resp.data);
                const boardId = resp.data.boardId;
                console.log(boardId);

                fileUpload(boardId);
                alert("게시물 작성 성공");
                navigate(`/bbsdetail/${resp.data.boardId}`);

            })
            .catch((err)=>{
                console.log("[BbsWrite.js] createBbs() error");
                console.log(error);
            })
    }

    useEffect(() => {
        setHeaders({
            Authorization : `Bearer ${localStorage.getItem("bbs_access_token")}`,
        });
        if (!auth){
            alert("로그인 후 사용 가능합니다.");
            navigate(-1);
        }
    }, []);

    return(
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <th className="table-primary">작성자</th>
                    <td>
                        <input type="text" className="form-control" value={localStorage.getItem("id")} size="50px" readonly />
                    </td>
                </tr>
                <tr>
                    <th className="table-primary">제목</th>
                    <td>
                        <input type="text" className="form-control" value={title} size="50px" onChange={changeTitle}/>
                    </td>
                </tr>
                <tr>
                    <th className="table-primary">내용</th>
                    <td>
                        <testarea className="form-control" value={content} rows="10" conChange={changeContent} ></testarea>
                    </td>
                </tr>
                <tr>
                    <th className="table-primary">파일첨부</th>
                    <td>
                        {files.map((file,index)=>(
                            <div key={index} style={{display:"flex", alignItems:"center"}}>
                                <p>
                                    <strong>FileName:</strong>{file.name}
                                </p>
                                <button className="delete-button" type="button" onClick={()=> handleRemoveFile(index)}>x</button>
                            </div>
                        ))}
                        {files.length < 5 && (
                            <div>
                                <input type="file" name="file" onChange={handleChangeFile} multiple="multiple"/>
                            </div>
                        )}
                    </td>
                </tr>
                </tbody>
                <div className="my-5 d-flex justify-content-center">
                    <button className="btn btn-outline-secondary" onClick={createBbs}>
                        <i className="fas fa-pen"></i> 등록하기
                    </button>
                </div>
            </table>
        </div>
    );
}
export default BbsWrite;