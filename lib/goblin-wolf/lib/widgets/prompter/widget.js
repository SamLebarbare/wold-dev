import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles.js';
import {useRive} from '@rive-app/react-canvas';
import welcomeR from './welcome.riv';
/******************************************************************************/

function TestPrompt(props) {
  const {rive, RiveComponent} = useRive({
    src: welcomeR,
    autoplay: false,
  });

  const setTexts = () => {
    for (const run of props.runs) {
      rive.setTextRunValue(...run);
    }
  };

  const play = () => {
    if (rive) {
      setTexts();
      rive.play();
    }
  };

  const reset = () => {
    if (rive) {
      setTexts();
      rive.reset();
    }
  };

  return <RiveComponent onMouseEnter={play} onMouseLeave={reset} />;
}

class Prompter extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.fullscreen}>
        <TestPrompt runs={[['username', 'Audrey']]} />
      </div>
    );
  }
}

export default Prompter;
