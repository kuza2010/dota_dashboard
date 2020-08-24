import React from "react";

import juggernaut from "../../assets/footer/juggernaut.png"

import "./footer.css"


const Footer = () => {

    return (
        <footer className="container">
            <div className="row">
                <div className="col-lg-6">
                    <h4>Dota2 dashboard</h4>
                    <p>Hand-made with <text className="text-danger">❤</text> for Dota2.</p>
                </div>
                <div className="col-lg-3 offset-lg-3">
                    <blockquote className="blockquote text-right">
                        <p className="mb-0">I bow to no king.</p>
                        <span className="blockquote-footer">
                            Juggernaut <img className="small-icon footer-icon" src={juggernaut} alt="juggernaut"/>
                        </span>
                    </blockquote>
                </div>
            </div>
        </footer>
    );
}


export default Footer;