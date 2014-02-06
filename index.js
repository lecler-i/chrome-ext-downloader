module.exports = CrxReader;

/**
 * Initialize a new CrxReader. See http://developer.chrome.com/extensions/crx.html
 * for the CRX file format specification.
 *
 * @param {Buffer} data
 * @api public
 */
function CrxReader(data) {
  checkData(data);
  this.data = data;
}

/**
 * Return a Buffer slice representing contents of the Zip file.
 *
 * @api public
 */

CrxReader.prototype.getZipContents = function() {
  var publicKeyLength = this.data.readUInt32LE(8);
  var signatureLength = this.data.readUInt32LE(12);

  return this.data.slice(16 + publicKeyLength + signatureLength);
};

/**
 * Checks whether the given Buffer contains a valid
 * CRX file.
 *
 * @param {Buffer} data
 */
function checkData(data) {
  var magicNumber = data.readUInt32LE();

  if(magicNumber != 0x34327243) {
    throw new Error('Not a CRX format');
  }
}
