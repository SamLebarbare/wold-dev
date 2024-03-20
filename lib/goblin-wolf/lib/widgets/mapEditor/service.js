// @ts-check
const {Elf, SmartId} = require('xcraft-core-goblin');
const process = require('process');
const {string, array} = require('xcraft-core-stones');
const {Map, MapShape} = require('../../map.js');

class MapEditorShape {
  id = string;
  currentMap = string;
  maps = array;
}

class MapEditorState extends Elf.Sculpt(MapEditorShape) {}

class MapEditorLogic extends Elf.Spirit {
  state = new MapEditorState({
    id: 'mapEditor',
    currentMap: undefined,
    maps: [],
  });

  init() {}

  loadMaps(maps) {
    this.state.maps = maps;
  }
}

class MapEditor extends Elf.Alone {
  state = new MapEditorState();
  logic = new MapEditorLogic();

  async init(desktopId) {
    this._desktopId = desktopId;
    this.logic.init();
    this.log.dbg('Map editor initialized for ', desktopId);
    this.log.dbg(process.env.FAL_KEY);
    await this.loadMaps();
  }

  async loadMaps() {
    const db = await this.cryo.reader('maps');
    const maps = db.queryArchetype('map', MapShape).field('id').all();
    this.logic.loadMaps(maps);
    for (const mapId of this.state.maps) {
      await new Map(this).create(mapId, this._desktopId);
    }
  }

  async createMap() {
    const feedId = Elf.createFeed();
    this.quest.defer(async () => await this.killFeed(feedId));
    await new Map(this).create(Elf.newId('map'), feedId);
    await this.loadMaps();
  }
}

module.exports = {MapEditor, MapEditorLogic};
