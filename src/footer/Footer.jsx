import React from 'react';
import ReactDOM from 'react-dom';
import HorizontalLine from "../input/horizontal-line/HorizontalLine.jsx";
import "./footer.sass";

class Footer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <footer>
        <div className="footer">
          <div className="footer__block content">
            <HorizontalLine />
            Бесплатный проект с открытым исходным кодом.
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
