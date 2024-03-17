// @ts-check
const {Elf} = require('xcraft-core-goblin');
const {MapEditor} = require('./widgets/mapEditor/service.js');

class WolfCli extends Elf.Alone {
  _labId;
  _desktopId;
  _clientSessionId;
  _currentUser;

  async openUrl(url) {}

  async newInstance(commandLine) {}

  async boot() {
    this.quest.go('client.boot');
  }

  async init(userDesktopId, clientSessionId, labId) {
    const mapEditor = await new MapEditor(this);
    await mapEditor.init(userDesktopId);
  }

  async setLoggedUser(desktopId, userId, login) {
    const resp = this.quest.newResponse();
    const topic = `login-session@${this._clientSessionId}.<login-state-changed>`;
    resp.events.send(topic, {
      userId,
      login,
      isLogged: true,
    });
    const wmAPI = this.quest.getAPI(`wm@${this._labId}`);
    await wmAPI.setUserId({userId});
  }

  async logout() {
    const resp = this.quest.newResponse();
    const topic = `login-session@${this._clientSessionId}.<login-state-changed>`;
    resp.events.send(topic, {
      isLogged: false,
    });
    const wmAPI = this.quest.getAPI(`wm@${this._labId}`);
    await wmAPI.setUserId({userId: null});
  }

  async configureDesktop(desktopId, clientSessionId, labId) {
    await this.init(desktopId, clientSessionId, labId);
    return {
      rootWidget: 'wolf-root',
      rootWidgetId: desktopId,
      defaultTheme: 'default',
      themeContext: 'wolf',
    };
  }
}

module.exports = WolfCli;
