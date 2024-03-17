import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import WithDesktopId from 'goblin-laboratory/widgets/with-desktop-id/widget';
import MapEditor from '../mapEditor/widget.js';

/******************************************************************************/

class WolfRoot extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <WithDesktopId desktopId={this.props.id}>
        <MapEditor id="mapEditor" />
      </WithDesktopId>
    );
  }
}

export default WolfRoot;
