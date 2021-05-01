import React from 'react'
import "./SearchHeroe.css";
import swal from 'sweetalert';

const SearchHeroe = ({heroe, setTeam, team, setPowerstats, powerstats, setValidate, validate}) => {
    
    const add = () => {
        setTeam([...team, heroe]);
        setPowerstats(powerstats => ({
            ...powerstats,
            power: powerstats.power + parseInt(heroe.powerstats.power),
            durability: powerstats.durability + parseInt(heroe.powerstats.durability),
            combat: powerstats.combat + parseInt(heroe.powerstats.combat),
            speed: powerstats.speed + parseInt(heroe.powerstats.speed),
            intelligence: powerstats.intelligence + parseInt(heroe.powerstats.intelligence),
            strength: powerstats.strength + parseInt(heroe.powerstats.strength)
        }));
    }
    
    const selectHeroe = () => {
        let newHero = false;
        team?.map(t => {
            if(t.id === heroe.id){
                newHero = true;
            }
        });

        if (newHero) {
            swal({
                title: "No Permitido",
                text: "No puedes agregar el mismo heroe",
                icon: "error",
                button: "Aceptar",
                timer: "4000"
            });
        } else {
            if (heroe.biography.alignment === 'good') {
                if (validate?.buenos < 3) {
                    add();
    
                    setValidate(validate => ({
                        ...validate,
                        peso: validate.peso + parseInt(heroe.appearance.weight[1].split(' ')[0]),
                        altura: validate.altura + parseInt(heroe.appearance.height[1].split(' ')[0]),
                        buenos: validate.buenos + 1
                    }));
                } else {
                    swal({
                        title: "No Permitido",
                        text: "No puedes agregar otro heroe Bueno",
                        icon: "error",
                        button: "Aceptar",
                        timer: "4000"
                    });
                }
            } else {
                if (validate?.malos < 3) {
                    add();
    
                    setValidate(validate => ({
                        ...validate,
                        peso: validate.peso + parseInt(heroe.appearance.weight[1].split(' ')[0]),
                        altura: validate.altura + parseInt(heroe.appearance.height[1].split(' ')[0]),
                        malos: validate.malos + 1
                    }));
                } else {
                    swal({
                        title: "No Permitido",
                        text: "No puedes agregar otro heroe Malo",
                        icon: "error",
                        button: "Aceptar",
                        timer: "4000"
                    });
                }
            }
        }
        
    }

    return (
        <div className="searchHeroe" onClick={selectHeroe} >
            <img src={heroe.image.url} />
            <p>{heroe.name}</p>
        </div>
    )
}

export default SearchHeroe
