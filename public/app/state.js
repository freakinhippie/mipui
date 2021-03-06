class State {
  constructor() {
    this.pstate_ = {
      ver: '1.0',
      props: {},
      // cell key -> (layer id -> (content key -> content value))
      content: {},
      lastOpNum: 0,
    };

    this.metadata = {};

    this.theMap = new CellMap();

    this.mid_ = null;

    this.secret_ = null;

    this.gesture_ = null;

    this.opCenter = new OperationCenter();

    this.navigation = {
      scale: 1.0,
    };

    this.defaultFloorContent_ = {
      [ck.kind]: ct.floors.floor.id,
      [ck.variation]: ct.floors.floor.generic.id,
    };

    this.defaultProperties_ = {
      [pk.title]: 'Unnamed',
      [pk.longDescription]: '',
      [pk.firstRow]: 0,
      [pk.lastRow]: 20,
      [pk.firstColumn]: 0,
      [pk.lastColumn]: 20,
      [pk.theme]: 0,
    };

    this.autoSaveTimerId_ = null;

    this.pendingOperations_ = [];

    this.currentlySendingOperations_ = false;

    this.lastAppliedOperation_ = null;

    this.user = null;

    this.menu = null;

    this.clipboard = null;

    this.currentTheme = themes[0];

    this.appliedThemeElements_ = [];

    this.lastUsedSvg = null;

    this.hasUnsavedChanges = false;
  }

  isReadOnly() {
    return this.mid_ && !this.secret_;
  }

  set gesture(newGesture) {
    if (this.gesture_) this.gesture_.onUnselect();
    this.gesture_ = newGesture;
  }

  get gesture() {
    return this.gesture_;
  }

  setLastOpNum(num) {
    this.pstate_.lastOpNum = num;
  }

  getLastOpNum() {
    return this.pstate_.lastOpNum;
  }

  getLayerContent(cellKey, layer) {
    const content = this.pstate_.content || null;
    const cellContent = content ? content[cellKey] : null;
    const layerContent = cellContent ? cellContent[layer.id] : null;
    if (!layerContent && layer == ct.floors) {
      // Missing floor translates to the default floor content.
      return this.defaultFloorContent_;
    }
    return layerContent || null;
  }

  setLayerContent(cellKey, layer, content) {
    if (!this.pstate_.content) {
      this.pstate_.content = {};
    }
    let cellContent = this.pstate_.content[cellKey];
    if (!cellContent) {
      if (!content) return;
      cellContent = {};
      this.pstate_.content[cellKey] = cellContent;
    } else if (!content) {
      delete cellContent[layer.id];
      return;
    }
    if (layer == ct.floors &&
        Object.keys(content).length == 2 &&
        content[ck.kind] == this.defaultFloorContent_[ck.kind] &&
        content[ck.variation] == this.defaultFloorContent_[ck.variation]) {
      // If it's the floor layer with a content equivalent to the default
      // floor, it can be deleted.
      delete cellContent[layer.id];
      return;
    }
    cellContent[layer.id] = content;
  }

  getProperty(property) {
    if (this.pstate_.props && this.pstate_.props[property]) {
      return this.pstate_.props[property];
    }
    return this.defaultProperties_[property];
  }

  setProperty(property, value, recordChange) {
    if (value == this.defaultProperties_[property]) {
      value = null;
    }
    const oldValue = this.getProperty(property);
    const newValue = value != this.defaultProperties_[property] ? value : null;
    if (oldValue != newValue) {
      if (!this.pstate_.props) this.pstate_.props = {};
      this.pstate_.props[property] = value != null ? value : undefined;
      if (recordChange) {
        state.opCenter.recordPropertyChange(property, oldValue, newValue);
      }
    }
  }

  reloadTheme() {
    const newPropertyIndex = this.getProperty(pk.theme);
    if (this.currentTheme.propertyIndex == newPropertyIndex) return;
    this.currentTheme =
        themes.find(theme => theme.propertyIndex == newPropertyIndex);

    this.appliedThemeElements_.forEach(element => {
      element.parentNode.removeChild(element);
    });
    this.appliedThemeElements_ = [];
    const head = document.getElementsByTagName('head')[0];
    this.currentTheme.files.forEach(file => {
      const css = document.createElement('link');
      css.type = 'text/css';
      css.rel = 'stylesheet';
      css.href = file;
      head.appendChild(css);
      this.appliedThemeElements_.push(css);
    });
    const menuIconsFromMap =
        Array.from(document.getElementsByClassName('menu-icon-from-map'));
    menuIconsFromMap.forEach(menuIconFromMap => {
      menuIconFromMap.style.backgroundImage =
          `url("${this.currentTheme.menuIconFile}")`;
    });
    this.theMap.invalidateTiles();
  }

  setMid(mid) {
    this.mid_ = mid;
    const newUrl = 'index.html?mid=' + encodeURIComponent(this.mid_);
    window.history.replaceState(null, '', newUrl);
  }

  setSecret(secret, callback) {
    this.secret_ = secret;
    if (!this.user) {
      setStatus(Status.AUTH_ERROR);
      return;
    }
    firebase.database().ref(`/users/${this.user.uid}/secrets/${this.mid_}`)
        .set(secret).then(() => { callback(); })
        .catch(error => { setStatus(Status.AUTH_ERROR); });
    const newUrl = `index.html?mid=${encodeURIComponent(this.mid_)}` +
        `&secret=${encodeURIComponent(secret)}`;
    window.history.replaceState(null, '', newUrl);
    document
        .getElementById('theMap').classList.add('editor-view');
  }

  getMid() {
    return this.mid_;
  }

  getSecret() {
    return this.secret_;
  }

  load(pstate) {
    this.pstate_ = pstate;
    createTheMapAndUpdateElements();
    refreshMapResizeButtonLocations();
    this.menu.descChanged();
    this.reloadTheme();
  }

  setupNewMid(callback) {
    this.setMid('m' + this.generateRandomString_());
    this.setSecret('s' + this.generateRandomString_(), callback);
  }

  // Create a random 10-character string with characters belonging to [a-z0-9].
  generateRandomString_() {
    // From http://stackoverflow.com/a/19964557
    return (Math.random().toString(36) + '00000000000000000').slice(2, 12);
  }
}
