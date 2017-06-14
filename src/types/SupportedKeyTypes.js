'use strict'

/**
 * SupportedKeyTypes
 * @ignore
 */
class SupportedKeyTypes {

  /**
   * constructor
   *
   * @internal
   * For internal use.
   *
   * @class SupportedKeyTypes
   *
   * @description
   * A registry for supported asn key types
   */
  constructor () {
    Object.defineProperty(this, '_ktyRegistry', { value: {}, enumerable: true })
    Object.defineProperty(this, '_paramsRegistry', { value: {}, enumerable: true })
    Object.defineProperty(this, '_oidRegistry', { value: {}, enumerable: true })
  }

  /**
   * define
   *
   * @param  {[type]} params [description]
   * @param  {[type]} kty    [description]
   * @param  {[type]} cls    [description]
   * @return {[type]}        [description]
   */
  define (params, kty, cls) {
    this._ktyRegistry[kty] = cls
    this._paramsRegistry[kty] = params

    params.forEach(param => {
      let { oid } = param
      this._oidRegistry[oid] = kty
    })
  }

  /**
   * normalize
   *
   * @param  {[type]} kty   [description]
   * @param  {[type]} field [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  normalize (kty, field, value) {
    let type = this._ktyRegistry[kty]
    let params = this._paramsRegistry[kty].find()

    if (!type || !params) {
      throw new Error('Invalid type')
    }

    return new type(params)
  }

  /**
   * type
   *
   * @param  {String} oid
   * @return {String}
   */
  type (oid) {
    return this._oidRegistry[oid]
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SupportedKeyTypes
