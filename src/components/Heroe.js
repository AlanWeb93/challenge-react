import React, { useState } from 'react'
import "./Heroe.css";
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Heroe = ({heroe, setTeam, team, setPowerstats, setValidate}) => {
   
    const [openModal, setOpenModal] = useState(false);

    const deleteHeroe = () => {
        const newTeam = team.filter((hero) => hero.id !== heroe.id);
        setTeam(newTeam);
        setPowerstats(powerstats => ({
            ...powerstats,
            power: powerstats.power - parseInt(heroe.powerstats.power),
            durability: powerstats.durability - parseInt(heroe.powerstats.durability),
            combat: powerstats.combat - parseInt(heroe.powerstats.combat),
            speed: powerstats.speed - parseInt(heroe.powerstats.speed),
            intelligence: powerstats.intelligence - parseInt(heroe.powerstats.intelligence),
            strength: powerstats.strength - parseInt(heroe.powerstats.strength)
        }));

        if (heroe.biography.alignment === 'good') {
            setValidate(validate => ({
                ...validate,
                peso: validate.peso - parseInt(heroe.appearance.weight[1].split(' ')[0]),
                altura: validate.altura - parseInt(heroe.appearance.height[1].split(' ')[0]),
                buenos: validate.buenos - 1
            }));
        } else {
            setValidate(validate => ({
                ...validate,
                peso: validate.peso - parseInt(heroe.appearance.weight[1].split(' ')[0]),
                altura: validate.altura - parseInt(heroe.appearance.height[1].split(' ')[0]),
                malos: validate.malos - 1
            }));
        }
        
    }

    return (
        <>
            <div className="heroe__container">
                <img src={heroe.image.url} alt="" onClick={() => setOpenModal(true)} />
                <div className="heroe__info" onClick={() => setOpenModal(true)}>
                    <h3>{heroe.name}</h3>
                    <h4>Powerstats:</h4>
                    <div className="powerstats">
                        <p>Poder: {heroe.powerstats.power}</p>
                        <p>Durabilidad: {heroe.powerstats.durability}</p>
                        <p>Combate: {heroe.powerstats.combat}</p>
                        <p>Velocidad: {heroe.powerstats.speed}</p>
                        <p>Inteligencia: {heroe.powerstats.intelligence}</p>
                        <p>Fuerza: {heroe.powerstats.strength}</p>
                    </div>
                </div>
                <CloseIcon className="close" onClick={deleteHeroe} />
            </div>
                
            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                className="modal"
            >
                <div className="modal__container">
                    <div className="modal__header">
                        <img src={heroe.image.url} alt="" />
                        <h3>{heroe.name}</h3>
                    </div>
                    <div className="modal__info">
                        <h4>Descripcion: </h4>
                        <div className="modal__info__description">
                            <div>
                                <h4>Apariencia:</h4>
                                <p>Peso: <span>{heroe.appearance.weight[1]}</span></p>
                                <p>Altura: <span>{heroe.appearance.height[1]}</span></p>
                                <p>Color de ojos: <span>{heroe.appearance['eye-color']}</span></p>
                                <p>Color de cabello: <span>{heroe.appearance['hair-color']}</span></p>
                            </div>
                            <div>
                                <h4>Nombres:</h4>
                                <p>Nombre Completo: <span>{heroe.biography['full-name'].split('/')[0]}</span></p>
                                <p>Alias: <span>{heroe.biography.aliases[0].split(';')[0]}</span></p>
                            </div>
                            <div>
                                <h4>Trabajo:</h4>
                                <p>Ocupacion: <span>{heroe.work.occupation.split(',')[0]}</span></p>
                                <p>Base: <span>{heroe.work.base.split(',')[0]}</span></p>
                            </div>
                        </div>
                    </div>
                    <CloseIcon className="close" onClick={() => setOpenModal(false)} />
                </div>
            </Modal>
        </>
    )
}

export default Heroe
