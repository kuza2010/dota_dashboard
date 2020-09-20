import React from "react";

import juggernaut from "../../assets/footer/juggernaut.png"

import "./footer.css"


const Footer = () => {

    return (
        <footer className="container">
            <div className="row">
                <div className="col">
                    <h4>Dota2 dashboard</h4>
                    <p>Hand-made with <span className="text-danger">❤</span> for Dota2.</p>
                </div>
                <div className="col">
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