import React from 'react';
import "./tooltip.sass";

class HoverToolTip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vis: false, text: "", coords: {}, rotate: 0 };
    document.addEventListener('mouseover', (e) => {
      const tooltip = e.target.dataset.tooltip;
      if(tooltip){
        const rect = e.target.getBoundingClientRect();
        this.setState({ vis: true, text: tooltip});
        let coords = { top: ( e.clientY ) };
        if(document.body.offsetWidth - rect.left < 250){
          coords.left = e.clientX - 280;
          coords.top -= e.target.offsetHeight / 2;
          coords.top += pageYOffset;
          this.setState({rotate: 180});
        }
        else coords.left = e.clientX + e.target.offsetWidth;
        this.setState({coords: coords});
      }
      else this.setState({vis: false});
    });
  }

  render() {
    if(this.state.vis) {
      const { coords, rotate } = this.state;
      return (
        <div className="arrowToolTip" style={{left: coords.left, top: coords.top, opacity: 1, transform: `rotate(${rotate}deg)`}}>
          <div className="triangle"/>
          <div className="ttBody" style={{transform: `rotate(${rotate}deg)`, borderRadius: rotate ? "5px 0 0 5px" : "0 5px 5px 0"}}>{this.state.text}</div>
        </div>
      );
    }
    return null;
  }
}

export default HoverToolTip;