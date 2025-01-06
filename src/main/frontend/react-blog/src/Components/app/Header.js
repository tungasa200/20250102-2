import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";

function Header(){
    const [auth, setAuth] = useContext(AuthContext);

    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
                <div className="container">
                    <div id="navbar-content" className="navbar-collapse collapse justify-content-betrween">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="fas fa-home"></i> Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    게시판
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/">
                                        글목록
                                    </Link>
                                    <Link className="dropdown-item" to="/">
                                        글추가
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        {/*nav 컴포넌트로 뺄수도있음*/}
                        <ul className="navbar-nav ml-auto">
                            {auth ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/checkpwd">
                                            <i className="fas fa-sign-out-alt"></i>  {auth}님 반갑습니다. <i className="fab fa-ello"></i>
                                            {""} &nbsp; {""}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">
                                            <i className="fas fa-sign-out-alt"></i> 로그아웃
                                        </Link>
                                    </li>
                                </>
                            ):(
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            로그인
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/join">
                                            회원가입
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;