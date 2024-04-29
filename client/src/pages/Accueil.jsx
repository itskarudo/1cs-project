import React, {useEffect} from "react";
import "./Accueil.css";

import image from "../../src/images/Banner.png";
import { FaPlus } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css"


export const Accueil = () => {

    useEffect(() => {
        Aos.init({duration: 2000 })
    }, [])

    return (
        <section className="Accueil">
            <div className="overlay"></div>
            <img src={image} alt=" Banner"></img>
            <div className="AccueilContent container">
                <div className="textDiv">
                    <h3 data-aos="fade up" className="smallText">Salut Mr</h3>
                    <h1 data-aos="fade up" className="AccueilTitle">CHAIB SLIMEN</h1>
                </div>
                <div data-aos="fade up" className="AccueilTitleD">Votre nombre total d'heures supplémentaires pour ce <span>mois-ci </span></div>

                <div data-aos="fade up" className="cardDiv grid">
                  <div className="dateInput">
                     <label htmlFor="date" >Sélectionnez votre mois</label>
                     <div className="input flex">
                        <input type="date"/>
                      </div>
                    
                   </div>
                   <div className="totalHeurSup">
                      <div className="labelTotal flex">
                        <label htmlFor="heur">Nombre total d'heures supplémentaires :</label>
                        <h3 className="total">5h</h3>
                      </div>
                      <div className="input flex">
                        
                      </div>


                
                   </div>

                   <div className="VotrheursSup">
                      <div className="labelTotal flex">
                        <label htmlFor="heur">Votre nombre total d'heures Sup : </label>
                        <h3 className="total">2h</h3>
                      </div>
                      <div className="input flex">
                        
                      </div>
                      </div>
                   <div className="AllMonths">
                      <FaPlus className="icons" />
                      <span>Tous les mois</span>
                   </div>

                </div>
            </div>

           

        </section>
    );
}