import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

//css
import "../../css/bbsList.css";
import "../../css/page.css";

//pagination
import Pagination from "react-js-pagination";
import axios from "axios";


//API(axios)




function BbsList(){
    //변수 선언================================================================
    //Paging
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [totalPage,setTotalPage] = useState(0);
    const [totalCnt,setTotalCnt] = useState(0);

    //검색용
    const [choiceVal,setChoiceVal] = useState();
    const [searchVal,setSearchVal] = useState();
    //BbsList
    const [BbsList,setBbsList] = useState([]);

    //비동기 통신 관련============================================================
    //게시글 전체조회하는 비동기 통신
    const getBbsList = async(page) =>{
        try{
            const response = await axios.get("http://localhost:8080/board/list",{
                params :{"page" : page - 1},
            });
            console.log("[BbsList.js] useEffect() success");
            console.log(response);

            setPage(response.data.content);
            setPageSize(response.data.pageSize);
            setTotalPage(response.data.totalPage);
            setTotalCnt(response.data.totalElements);
        }catch(error){
            console.log("[BbsList.js] useEffect() error");
            console.log(error);
        };
    };

    //게시글 검색
    const search = async() =>{
        try{
            const response = await axios.get("http://localhost:8080/board/search",{
                params :{"page" : page - 1},
                title : choiceVal === "title" ? searchVal :"",
                content : choiceVal === "content" ? searchVal :"",
                writerName : choiceVal === "writerName" ? searchVal :"",
            });
            console.log("[BbsList.js] searchBtn() success");
            console.log(response.data);

            setPage(response.data.content);
            setPageSize(response.data.pageSize);
            setTotalPage(response.data.totalPage);
            setTotalCnt(response.data.totalElements);
        }catch(error){
            console.log("[BbsList.js] searchBtn() error");
            console.log(error);
        };
    };

    //첫 로딩시, 한페이지만 가져오기
    useEffect(()=>{
        getBbsList(1);
    },[]);
    //검색 > 검색조건 저장
    const changeChoice = (event) =>{ setChoiceVal(event.target.value);};
    const changeSearch = (event) =>{ setSearchVal(event.target.value);};
    //페이징 보여주기
    const changePage = ()=>{
        setPage(page);
        getBbsList(page);
    };


    //HTML=================================================================
    return(
        <div>
            <table className="search">
                <tbody>
                <tr>
                    <td>
                        <select className="custom-select" value={choiceVal} onChange={changeChoice}>
                            <option>검색 옵션 선택</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="writer">작성자</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" value={searchVal} className="form-control" placeholder="검색어" onChange={changeSearch} />
                    </td>
                    <td>
                        <button type="button" className="btn btn-outline-secondary" onClick={search}>
                            <i className="fas fa-search"></i>  검색
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <br></br>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="col-1">번호</th>
                    <th className="col-7">제목</th>
                    <th className="col-3">작성자</th>
                    <th className="col-1">조회수</th>
                </tr>
                </thead>
                <tbody>
                {/* 데이터 */}
                </tbody>
            </table>
            <Pagination className="pagination" activePage={page} itemsCountPerPage={pageSize} totalItemsCount={totalPage} prevPageText={"<"} nextPageText={">"} onChange={changePage}/>

            {/* 글쓰기 버튼 / 링크 / 아이콘 */}
            <div className="my-5 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/bbswrite">
                    <i className="fas fa-pen"></i> &nbsp; 글쓰기
                </Link>
            </div>

        </div>
    );
}
export default BbsList;