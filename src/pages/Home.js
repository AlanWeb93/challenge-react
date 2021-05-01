import { Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Heroe from '../components/Heroe';
import SearchHeroe from '../components/SearchHeroe';
import "./Home.css";

const Home = ({history}) => {
    const [team, setTeam] = useState([]);
    const [resultsSearch, setResultsSearch] = useState([]);

    const [powerstats, setPowerstats] = useState({
        power: 0,
        durability: 0,
        combat: 0,
        speed: 0,
        intelligence: 0,
        strength: 0,
    });

    const [categoria, setCategoria] = useState('');

    const [validate, setValidate] = useState({
        peso: 0,
        altura: 0,
        buenos: 0,
        malos: 0
    });

    useEffect(() => {
        let valor = 0;
        let cate = '';
        let claves = Object.keys(powerstats);
        for(let i  = 0; i<claves.length; i++){
            let clave = claves[i];
            if (powerstats[clave] > valor) {
                valor = powerstats[clave];
                cate = clave;
            }
        } 
        
        setCategoria(cate);
        console.log("OBJETO VALIDATE", validate);
    }, [powerstats])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.replace('/');
        }
    }, []);

    const handleSearch = async (e) => {
        if (e.target.value.length > 2) {
            const respuesta = await fetch(`https://superheroapi.com/api.php/3859831884063913/search/${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {return data});
        
            setResultsSearch(respuesta.results);
        } else {
            setResultsSearch([]);
        }
    }

    return (
        <div className="home">
            
            <div className="home__list">
                <h4>Equipo Seleccionado {validate.buenos + validate.malos}</h4>
                <h4>{categoria ? `(Tipo: ${categoria})` : ''} {validate.peso !== 0 ? `(Peso Promedio: ${Math.round((validate.peso)/(validate.buenos + validate.malos))} kg)` : ''} {validate.altura !== 0 ? `(Altura Promedio: ${Math.round((validate.altura)/(validate.buenos + validate.malos))} cm)` : ''}</h4>
                {
                    powerstats.power ? (
                        <p> 
                            Po: {powerstats.power} - Du: {powerstats.durability} - Co: {powerstats.combat} - Ve: {powerstats.speed} - In: {powerstats.intelligence} - Fu: {powerstats.strength}
                        </p>
                    ) : ''
                }
                <div className="list__scroll">
                    {
                        team?.map((t) =>  (
                            <Heroe 
                                key={t.name} 
                                heroe={t}
                                setTeam={setTeam}
                                team={team}
                                setPowerstats={setPowerstats}
                                setValidate={setValidate}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="home__search">
                <h4>Buscar Heroe</h4>
                <div className="search_container">
                    <Search />
                    <input placeholder="Buscar" onChange={handleSearch} />
                </div>
                <div className="list__scroll">
                    {
                        resultsSearch?.map((heroe) => (
                            <SearchHeroe 
                                key={heroe.id} 
                                heroe={heroe} 
                                setTeam={setTeam} 
                                team={team} 
                                setPowerstats={setPowerstats} 
                                powerstats={powerstats} 
                                setValidate={setValidate}
                                validate={validate}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
