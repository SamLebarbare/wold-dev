import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/
class MapEntryNC extends Widget {
  render() {
    return (
      <li>
        {this.props.name} <button>edit</button>
      </li>
    );
  }
}

const MapEntry = Widget.connectBackend((state) => {
  return state.pick('id', 'name');
})(MapEntryNC);

class MapEditor extends Widget {
  constructor() {
    super(...arguments);
    this.createMap = this.createMap.bind(this);
  }

  static get wiring() {
    return {currentMap: 'currentMap', maps: 'maps'};
  }

  createMap() {
    this.doFor('mapEditor', 'createMap');
  }

  renderMapEntry(id, key) {
    return <MapEntry id={id} key={key} />;
  }

  render() {
    return (
      <div>
        <h1>Wolf Map Editor</h1>
        <button onClick={this.createMap}>create map</button>
        <div>
          <ul>
            {this.props.maps.map((id, key) => this.renderMapEntry(id, key))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Widget.Wired(MapEditor);
