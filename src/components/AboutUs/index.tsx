import  {useContext, useState} from "react"
import { BntChangeTeamContext } from "../../contexts/BntChangeTeam/bntChanceTeam";
import AboutUsM3 from "../AboutUsM3"
import AboutUsM4 from "../AboutUsM4"




const AboutUs = () => {
  const {clickToChange} = useContext(BntChangeTeamContext)
  return clickToChange === false ? (
  <>
  <AboutUsM3 />
  </>
  ) : (
  <>
  <AboutUsM4/> 
 
  </>
  )

};

export default AboutUs;
