import {Contatos }from "./Contatos";


const Footer = () => {
    return (
        <footer>
          <Contatos />
        <p>&copy; {new Date().getFullYear()} Michael Silva Canto. Todos os direitos reservados.</p>
      </footer>

    );
}

export default Footer;