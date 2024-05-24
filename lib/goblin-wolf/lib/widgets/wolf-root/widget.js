import React from 'react';
import * as styles from './styles.js';
import Widget from 'goblin-laboratory/widgets/widget';
import WithDesktopId from 'goblin-laboratory/widgets/with-desktop-id/widget';
import MapEditor from '../mapEditor/widget.js';
import Prompter from '../prompter/widget.js';
import '../engine/worldgen.js';
// set up shadows
import '../engine/shadows.js';
// adds a mesh to player
import '../engine/entities.js';
// does stuff on button presses
import '../engine/actions.js';
/******************************************************************************/

class WolfRoot extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <WithDesktopId desktopId={this.props.id}>
        <div className={this.styles.classNames.front}>
          <div className="usage">
            <br></br> move: WASD
            <br></br>LMB: break
            <br></br> MMB/Q: pick
            <br></br> RMB/R: place
            <br></br> scroll: zoom
            <br></br> 1: launch entity
            <br></br> 3: toggle timescale
            <br></br>P: pause
            <br></br> I: invert mouse
            <br></br> O: toggle world data
          </div>
        </div>
      </WithDesktopId>
    );
  }
}

export default WolfRoot;
