import React, { useContext, useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

//member auth
import {AuthContext, AuthProvider} from "../context/AuthProvider";
import {HttpHeadersProvider} from "../context/HttpHeadersProvider";

//css
import "../../css/bbsupdate.css"



function BbsUpdate(){
    //auth
    const [auth,setAuth] = useContext(AuthContext);
    const [headers,setHeaders] = useContext(HttpHeadersProvider);
    const navigate = useNavigate();

    const location = useLocation;
    const {bbs} = location.state;
    const boardId = bbs.boardId;

    const [ title,setTitle] = useState(bbs.title);
    const [ content,setContent] = useState(bbs.content);
    const [ files,setFilse] = useState([]);
    const [ saverFiles,setSaverFiles] = useState(bbs.files || []);

    const changeTitle = (event) =>{ setTitle(event.target.value); };
    const changeContent = (event) =>{ setContent(event.target.value); };
    const handleChangeFile = (event) =>{
        const selectedFiles = Array.from(event.target.files).slice(0,5);
        setFilse((prevFiles)=>[...prevFiles, ...selectedFiles]);
    };
    const handleRemoveFile = ()=>{
        setFilse((prevFiles) => prevFiles.filter((_,i)=> i !== index));
    };
    const handleRemoveSaverFile = (index, boardId, fileId)=>{
        setSaverFiles((prevFiles) => prevFiles.filter((_,i)=> i !== index));
        fileDelete(boardId,fileId);
    };

    useEffect(()=>{
        setHeaders({
            Authorization : `Bearer ${localStorage.getItem("bbs_access_token")}`,
        });
    },[]);

    //REST API

    const fileDelete = async(boardId,fileId)=>{
        try{
            await axios.delete(`http://localhost:8080/board/${bbs.boardId}/file/delete?fileId=${fileId}`,{headers:headers});
            console.log("[BbsUpdate.js] fileDelete() success");
            alert("파일 삭제 성공")
        }catch(error){
            console.error("[BbsUpdate.js] fileDelete() is on error");
            console.error(error);
        }
    }

    const fileUpload = async (boardId)=>{
        console.log("업로드할 파일 목록:", files);
        const fd = new FormData();
        files.forEach((file)=>fd.append("file",file));
        await axios
            .post(`http://localhost:8080/board/${boardId}/file/upload`,fd,{headers:headers})
            .then((resp) => {
                console.log("[file.js fileUpload()] success");
                console.log(resp.data);
                alert("board update and file upload complete")
                navigate(`/bbsdetail/${boardId}`);

            })
            .catch((err)=>{
                console.log("[file.js fileUpload()] error");
                console.log(err);
                alert("request faild")
            })
    };


    const updateBbs = async () =>{
        const req ={
            id: auth,
            title: title,
            content: content
        };
        await axios
            .patch(`http://localhost:8080/board/${bbs.boardId}/file/update`,req, {headers:headers})
            .then((resp)=>{
                console.log("[BbsUpdate.js] updateBbs() success");
                console.log(resp.data);
                const boardId = resp.data.boardId;

                if(file.length > 0){
                    fileUpload(boardId);
                }else{
                    alert("Board Update Complete.")
                    navigate(`bbsdetail/${resp.data.boardId}`);
                }
            })
            .catch((err)=>{
                console.log("[BbsUpdate.js] updateBbs() is on error");
                console.log(err);
            });
    }
    return(
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <th className="table-primary">작성자</th>
                    <td>
                        <input type="text" className="form-control" value={bbs.writerName} size="50px" readonly />
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
                        {saverFiles.length > 0 || files.length > 0 ? (
                            <div className="file-box">
                                <ul>
                                    {/*기존 파일데이터 삭제 로직*/}
                                    {saverFiles.map((file, index)=>(
                                        <li key={file.fileId} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                            <span>
                                                <strong>FileName: </strong>{file.originFileName} &nbsp;
                                                <button className="delete-button" type="button" onClick={()=> handleRemoveSaverFile(index,boardId,fileId)}>x</button>
                                            </span>
                                        </li>
                                    ))}
                                    {/*새로운 파일데이터 추가 로직*/}
                                    {files.map((files,index)=>(
                                        <li key={file.fileId} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                            <span>
                                                <strong>FileName: </strong>{file.name} &nbsp;
                                                <button className="delete-button" type="button" onClick={()=> handleRemoveFile(index)}>x</button>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ):(
                            <div className="file-box">
                                <p>No files.</p>
                            </div>
                        )}
                        <div className="file-select-box">
                            <input type="file" name="file" multiple="multiple" onChange={handleChangeFile} />
                        </div>
                    </td>
                </tr>
                </tbody>
                {/* 수정하기 - 버튼  */}
                <div className="my-3 d-flex justify-content-center">
                    <button className="btn btn-dark" onClick={updateBbs}>
                        <i className="fas fa-pen"></i> 수정하기
                    </button>
                </div>
            </table>
        </div>
    );
}
export default BbsUpdate;