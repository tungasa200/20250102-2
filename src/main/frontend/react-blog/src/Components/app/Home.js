import React from "react";
import {Link} from "react-router-dom";


function Home(){
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">welcome to my blog</h1>
                <p className="lead">
                    community
                </p>
                <hr className="my-4"></hr>
                <p>
                    ready to get started?
                </p>
                <Link to="/bbslist">
                    <button className="btn btn-primary btn-lg">go to board list</button>
                </Link>
                <br /><br />

                <div className="mt-4">
                    <h3>Source code on GitHub</h3>
                    <ul>
                        <li>
                            - &nbsp; <a href="#">Reposiroty</a>
                        </li>
                    </ul>
                </div>
                <div className="mt-4">
                    <h5>Contact me email</h5>
                    - &nbsp; <a href="mailto:ksoung1402@naver.com">ksoung1402@naver.com</a>
                </div>
            </div>
        </div>
    );
}
export default Home;