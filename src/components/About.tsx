import "@/styles/about.css";
import { robotoSlab } from "@/vendor/fonts";
import Image from "next/image";
import Slider from "./Slider";

export default function About() {
  return (
    <section className="about flex">
      <Image
        src="/about.jpg"
        width={464}
        height={464}
        alt="Profile picture"
        className="about__photo rounded-full"
      />
      <div className="about__info flex flex-col w-[600px]">
        <h3 className={`about__title ${robotoSlab.className}`}>
          Acerca del autor
        </h3>
        <p className="about__description">
          ¡Hola! Soy Victor, Ingeniero de Software Asociado en Guild. Soy 
          apasionado por la programación y un aprendiz de por vida, impulsado 
          por el deseo de construir y crear soluciones innovadoras.
          <br />
          <br />
          Con experiencia en las industrias de hospitalidad y aerolíneas, 
          aporto una perspectiva única orientada al servicio para la resolución 
          de problemas y la colaboración. Mi objetivo a largo plazo es ser mentor 
          de minorías en tecnología y ayudar a crear más oportunidades y 
          representación en la industria.
          <br />
          <br />
          Estas son algunas tecnologías con las que trabajo:
          <br />
          <Slider />
        </p>
      </div>
    </section>
  );
}