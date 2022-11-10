import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import Developer from "../Developer";
import { AboutUsDiv, EquipList } from "./styles";
import alvaro from "../../assets/img/alvaro-alencar-photo.jpeg";
import gabriel from "../../assets/img/gabriel-alencar-photo.jpg";
import gabriella from "../../assets/img/gabriella-terra-photo.png";
import { ButtonChangeTeam } from "../AboutUs/styles";
import { useContext, useState } from "react";
import { BntChangeTeamContext } from "../../contexts/BntChangeTeam/bntChanceTeam";



const AboutUsM4 = () => {

  const {clickToChange,setClickToChange} = useContext(BntChangeTeamContext)

  const developersM4 = [
    {
      image: "https://farm66.staticflickr.com/65535/52486243517_89333883ab_m.jpg",
      name: "Jean Lucas",
      position: "Scrum Master",
      linkedin: "https://www.linkedin.com/in/jeluskinha/",
      github: "https://github.com/Jeluskinha",

    },
    {
      image: gabriel,
      name: "Gabriel Alencar",
      position: "Tech leader",
      linkedin: "https://www.linkedin.com/in/gabriel-alencar-de-souza-santos/",
      github: "https://github.com/gabrielAlencar33564",
    },
    {
    image: "https://farm66.staticflickr.com/65535/52487208065_b356393041_m.jpg",
    name: "Bruna Dalla",
    position: "Product Owner",
    linkedin: "https://www.linkedin.com/in/brunadalla/",
    github: "https://github.com/brunadalla",
    },
    {
      image: alvaro,
      name: "Alvaro Alencar",
      position: "Quality Assurance",
      linkedin:"https://www.linkedin.com/in/alvaro-romario-cavalcante-alencar/",
      github: "https://github.com/alvaroallencar",
    },
    {
      image: gabriella,
      name: "Gabriella Terra",
      position: "Quality Assurance",
      linkedin: "https://www.linkedin.com/in/gabriella-terra/",
      github: "https://github.com/GabriellaTerra",
    },
    {
      image:"https://farm66.staticflickr.com/65535/52486243537_62fab28c25_m.jpg",
      name: "Matheus Ricardo",
      position: "Quality Assurance",
      linkedin: "https://www.linkedin.com/in/matheusricardopb/",
      github: "https://github.com/MatheusRic",
    }
 

  ]
  
  return (
    <>
      <AboutUsDiv
        as={motion.div}
        initial={{ y: -50, scale: 1, opacity: 0.5 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-container">
          <p>
            Este é o nosso <strong>Projeto final Back-End do M4</strong> da
            Kenzie Academy Brasil 
          </p>
          <p>
            Nós do grupo 36 gostaríamos de agradecer a equipe da Kenzie.
          </p>
          <p>
            Neste módulo optamos por realizar uma projeto full-stack , unindo as funcionalidades da
            aplicação fron-end com os conhecimentos de back-end adquiridos até aqui!
          </p>
          <p>
            Segue abaixo o time responsável pela idealização e desenvolvimento
            deste aplicativo. Aos que nos prestigiaram fica o nosso muito
            obrigado!
          </p>
        </div>
        <EquipList>
          {developersM4.map((developer) => (
            <Developer
              key={uuid()}
              image={developer.image}
              name={developer.name}
              position={developer.position}
              linkedin={developer.linkedin}
              github={developer.github}
            />
          ))}
        </EquipList>
        <ButtonChangeTeam onClick={()=> setClickToChange(!clickToChange)}>{clickToChange?"Conhecer equipe M3!" : "Conhecer equipe M4!"}</ButtonChangeTeam> 
      </AboutUsDiv>
    </>
  );
};

export default AboutUsM4;
