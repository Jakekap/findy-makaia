import { useState } from "react";
import "./footer.scss";
import { Link, useNavigate } from "react-router-dom";
import { getSession } from "../../services/storageService";
import Swal from "sweetalert2";

const Footer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getSession());
  const searchUser = async () => {
    const { value: endpoint } = await Swal.fire({
      title: "Input endpoint user",
      input: "number",
      inputPlaceholder: "Search a user with his endpoint number",
    });
    if (endpoint) {
      navigate(`/${endpoint}`);
    }
  };

  return (
    <footer className="footer">
      <section className="footer__left-side-container">
        <Link to="/">
          <img
            src="/images/home.svg"
            alt="home icon"
            className="footer__icon"
          />
        </Link>
        <img
          src="/images/search.svg"
          alt=""
          className="footer__icon"
          onClick={searchUser}
        />
      </section>
      <section className="footer__center-container">
        <figure className="footer__icon-container">
          <Link to="newPub">
            <img src="/images/plus.svg" alt="" className="footer__plus-icon" />
          </Link>
        </figure>
      </section>
      <section className="footer__right-side-container">
        <img src="/images/bell.svg" alt="" className="footer__icon" />
        <Link to={`/${user.id}`}>
          <img src={user.avatar} alt="" className="footer__user-icon" />
        </Link>
      </section>
      <div className="footer__background">
        <figure className="footer__background__left"></figure>
        <figure className="footer__background__center">
          <img src="/images/footerCut.png" alt="footer" />
        </figure>
        <figure className="footer__background__right"></figure>
      </div>
    </footer>
  );
};

export default Footer;
