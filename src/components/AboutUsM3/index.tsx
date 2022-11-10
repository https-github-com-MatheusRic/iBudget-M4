import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import Developer from "../Developer";
import { AboutUsDiv, EquipList } from "./styles";
import alexandre from "../../assets/img/alexandre-borges-photo.png";
import alvaro from "../../assets/img/alvaro-alencar-photo.jpeg";
import gabriel from "../../assets/img/gabriel-alencar-photo.jpg";
import gabriella from "../../assets/img/gabriella-terra-photo.png";
import victor from "../../assets/img/victor-avila-photo.png";
import rafael from "../../assets/img/rafael-grillo-photo.jpg";

import { ButtonChangeTeam } from "../AboutUs/styles";
import { useContext } from "react";
import { BntChangeTeamContext } from "../../contexts/BntChangeTeam/bntChanceTeam";



const AboutUsM3 = () => {
  const {clickToChange,setClickToChange} = useContext(BntChangeTeamContext)
  const Developers = [
    {
      image: victor,
      name: "Victor Avila",
      position: "Scrum Master",
      linkedin: "https://www.linkedin.com/in/victor-avila-br/",
      github: "https://github.com/victoraviladev",
    },
    {
      image: alexandre,
      name: "Alexandre Borges",
      position: "Product Owner",
      linkedin: "https://www.linkedin.com/in/alexandre-borges-albuquerque/",
      github: "https://github.com/axdborges",
    },
    {
      image: alvaro,
      name: "Alvaro Alencar",
      position: "Tech Leader",
      linkedin:
        "https://www.linkedin.com/in/alvaro-romario-cavalcante-alencar/",
      github: "https://github.com/alvaroallencar",
    },
    {
      image: gabriel,
      name: "Gabriel Alencar",
      position: "Quality Assurance",
      linkedin: "https://www.linkedin.com/in/gabriel-alencar-de-souza-santos/",
      github: "https://github.com/gabrielAlencar33564",
    },
    {
      image: gabriella,
      name: "Gabriella Terra",
      position: "Quality Assurance",
      linkedin: "https://www.linkedin.com/in/gabriella-terra/",
      github: "https://github.com/GabriellaTerra",
    },
    {
      image: rafael,
      name: "Rafael Grillo",
      position: "Quality Assurance",
      linkedin: "https://www.linkedin.com/in/rafael-grillo/",
      github: "https://github.com/rGrillo1",
    },
  ];

  
 
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
            Este é o nosso <strong>Projeto final Front-End do M3</strong> da
            Kenzie Academy Brasil (turma 12).
          </p>
          <p>
            Nós do grupo 3 gostaríamos de agradecer a toda nossa turma e a
            equipe da Kenzie, em especial ao facilitador Daniel Pereira e ao
            nosso instrutor Gabriel Tsunoda.
          </p>
          <p>
            Segue abaixo o time responsável pela idealização e desenvolvimento
            deste aplicativo. Aos que nos prestigiaram fica o nosso muito
            obrigado!
          </p>
        </div>
        <EquipList>
          {Developers.map((developer) => (
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

export default AboutUsM3;
