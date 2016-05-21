import defaults from './defaults';
import moment from 'moment';
import { v4 as generateId } from 'node-uuid';

export default class RoyalDocument {
  constructor() {
    this.raw = {};
    this.entities = [];
    this.previousId = null;
    this.currentParent = null;
  }

  /**
   *
   * @param raw
   */
  setRaw(raw) {
    this.raw = raw;
    this.entities = [];
    this.previousId = null;
    this.currentParent = null;
  }

  /**
   * Converts an entity into a clean object with defaults
   * @param entity
   */
  addEntity(entity) {
    // validate props
    if (!entity.Type) throw new Error('A type is required for entity');
    if (!entity.Name) throw new Error('A name is required for entity');
    const id = generateId();
    const imuEntity = Object.assign({}, entity);
    delete imuEntity.Children;
    this.entities.push(
      Object.assign(
        this.defaultProperties(),
        defaults[imuEntity.Type] || {},
        { ID: id }, imuEntity
      )
    );
    this.previousId = id;
  }

  /**
   * Add default props that all entities require.
   * @returns {{Modified, Created}}
   */
  defaultProperties() {
    const defaultProps = {
      Modified: moment().format('MM/DD/YYYY HH:mm:ss'),
      Created: moment().format('MM/DD/YYYY HH:mm:ss'),
    };

    if (this.currentParent) {
      defaultProps.ParentID = this.currentParent;
    }
    return defaultProps;
  }

  /**
   *
   * @param children
   * @param root
   */
  iterateChildren(children, root) {
    this.currentParent = this.previousId;
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      this.addEntity(child);
      if (child.Children) {
        const prev = this.currentParent;
        this.iterateChildren(child.Children);
        if (root) this.currentParent = prev;
      }
    }
  }

  /**
   *
   * @param entity
   * @returns {string}
   */
  static stringEntity(entity) {
    let entityKeyString = '';
    const keys = Object.keys(entity);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      if (key === 'Type') continue;
      entityKeyString += `        <${key}>${entity[key]}</${key}>\r\n`;
    }
    return `    <${entity.Type}>\r\n${entityKeyString}    </${entity.Type}>\r\n`;
  }

  /**
   * Returns the XML string of the royal doc
   */
  toString() {
    if (this.raw.Type !== 'RoyalDocument') {
      throw new Error('The first item in a royal document must be of type \'RoyalDocument\'');
    }

    if (!this.entities.length) {
      this.addEntity(this.raw);
      if (this.raw.children) this.iterateChildren(this.raw.Children, true);
    }

    const xmlHeader = '<?xml version="1.0" encoding="utf-8"?>\r\n';
    const entitiesStr = this.entities.map(RoyalDocument.stringEntity).join('');
    return `${xmlHeader}<RTSZDocument>\r\n${entitiesStr}</RTSZDocument>`;
  }
}

