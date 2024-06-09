import {noa} from './engine.js';
import {blockIDs} from './registration.js';
import {encode, decode} from 'voxel-crunch';

/*
 *
 *
 *
 *
 */

// this module implements two "worlds" of voxel data
var WORLD1 = 'WOLF';

// storage for data from voxels that were unloaded

var storage = {};
var chunkIsStored = (id) => {
  return !!storage[id];
};
var storeChunk = (id, arr) => {
  storage[id] = encode(arr.data);
};
var retrieveChunk = (id, arr) => {
  decode(storage[id], arr.data);
};

// init world name and add binding to swap it
noa.worldName = WORLD1;

// catch engine's chunk removal event, and store the data
noa.world.on('chunkBeingRemoved', function (id, array, userData) {
  storeChunk(id, array);
});

/**
 *
 *    Here is the core worldgen handler - it catches `worldDataNeeded`
 *    events and pushes them to a queue, and then in a setInterval
 *    handles each request and calls `world.setChunkData`.
 *
 */

var requestQueue = [];
noa.world.on('worldDataNeeded', function (id, array, x, y, z, worldName) {
  requestQueue.push({id, array, x, y, z, worldName});
});

setInterval(function () {
  for (var i = 0; i < 10; i++) {
    if (requestQueue.length === 0) return;
    var req = requestQueue.shift();
    if (chunkIsStored(req.id)) {
      retrieveChunk(req.id, req.array);
    } else {
      // skip out of generating very high or low chunks
      if (req.y < -50 || req.y > 150) {
        var fillVoxel = req.y >= 0 ? 0 : blockIDs.stone;
        return noa.world.setChunkData(req.id, req.array, null, fillVoxel);
      }

      generateChunk(req.array, req.x, req.y, req.z);
    }
    // pass the finished data back to the game engine
    noa.world.setChunkData(req.id, req.array);
  }
}, 10);

function generateChunk(array, x, y, z) {
  for (var i = 0; i < array.shape[0]; ++i) {
    for (var k = 0; k < array.shape[2]; ++k) {
      var height = getHeightMap(x + i, z + k, 20, 40);
      for (var j = 0; j < array.shape[1]; ++j) {
        var b = decideBlock(x + i, y + j, z + k, height);
        if (b) {
          array.set(i, j, k, b);
        }
      }
    }
  }
}


// worldgen - return a heightmap for a given [x,z]
function getHeightMap(x, z, xsize, zsize) {
  var xs = 1.6 * Math.sin(x / xsize);
  var zs = -2 * Math.cos(z / zsize);
  return (xs + zs) * Math.min(-2, xs + zs);
}

function getCloudHt(x, z, xsize, zsize) {
  var xs = 5 + 5 * Math.sin(5 + x / xsize);
  var zs = 6 + 4 * Math.sin(8 + z / zsize - x / 35);
  var ss = 3 + 7 * Math.sin((x + z) / 17);
  return xs + zs + ss > 20 ? 35 : -1;
}

function decideBlock(x, y, z, height) {
  // general case
  if (y < height) {
    switch (true) {
      case y > 1 && y <= 4:
        return blockIDs.dirt2;
      case y < -2 && y >= 1:
        return blockIDs.stone;
      case y > 4:
        return blockIDs.grass;
      default:
        return blockIDs.dirt;
    }
  }
  if (y >= 0) return 0;
  return blockIDs.water;
}

function makeColumn(ht, x, y, z, block) {
  for (var i = 0; i < ht; i++) {
    noa.setBlock(block, x, y + i, z);
  }
}
