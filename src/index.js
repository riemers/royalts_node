import defaults from './defaults';
import moment from 'moment';
import { v4 as generateId } from 'node-uuid';

export default class RoyalDocument {
  constructor(raw) {
    this.raw = raw;
    this.entities = [];
    this.previousId = null;
  }

  /**
   *
   * @param entity
   */
  addEntity(entity) {
    // validate props
    if (!entity.Type) throw new Error('A type is required for entity');
    if (!entity.Name) throw new Error('A name is required for entity');
    const entityImmutable = Object.assign({}, entity);
    const { Type } = entityImmutable;
    const id = generateId();
    delete entityImmutable.Children;
    this.entities.push(
      Object.assign(
        this.defaultProperties(),
        defaults[Type] || {},
        { ID: id }, entityImmutable
      )
    );
    this.previousId = id;
  }

	/**
   *
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
   * Returns the XML string of the royal doc
   */
  toString() {
    if (this.raw.Type !== 'RoyalDocument') {
      throw new Error('The first item in a royal document must be of type \'RoyalDocument\'');
    }

    const xmlHeader = '<?xml version="1.0" encoding="utf-8"?>\r\n';
    const prefix = '<RTSZDocument>';
    const postfix = '</RTSZDocument>';

    this.addEntity(this.raw);
    this.iterateChildren(this.raw.Children, true);

    const entitiesStr = this.entities.map(RoyalDocument.stringEntity).join('');
    return `${xmlHeader}${prefix}\r\n${entitiesStr}${postfix}`;
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
}

