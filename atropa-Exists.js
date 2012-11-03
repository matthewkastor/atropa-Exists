/*jslint indent: 4, maxerr: 50, white: true, node: true, stupid: true */

/**
 * @file Utilities for existence testing.
 * @author <a href="matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20121030
 * @requires fs
 * @requires events
 * @requires util
 * @exports Exists
 */

'use strict';

var fs, events, util;

fs = require('fs');
events = require('events');
util = require('util');

/**
 * Provides utilities for existence testing.
 * @class
 * @emits {Error} Emits error on failures.
 *  See individual methods for specifics.
 * @requires events
 * @requires util
 */
function Exists() {
    events.EventEmitter.call(this);
}
util.inherits(Exists, events.EventEmitter);

/**
 * If the supplied path is not a file emit an error.
 * @function
 * @param {path} aFile The path to verify.
 * @returns {Boolean} Returns true on success.
 * @emits {Error} Emits an error if path is not a file.
 * @requires fs
 */
Exists.prototype.fileMustExist = function fileMustExist(aFile) {
    if(fs.existsSync(aFile)) {
        if(fs.statSync(aFile).isFile()) {
            return true;
        }
    }
    this.emit('error', aFile + ' is not a file');
};

/**
 * If the supplied path is not a directory emit an error.
 * @function
 * @param {path} somewhere The path to verify.
 * @returns {Boolean} Returns true on success.
 * @emits {Error} Emits an error if path is not a directory.
 * @requires fs
 */
Exists.prototype.dirMustExist = function dirMustExist(aDirectory) {
    if(fs.existsSync(aDirectory)) {
        if(fs.statSync(aDirectory).isDirectory()) {
            return true;
        }
    }
    this.emit('error', aDirectory + ' is not a directory');
};

exports.Exists = Exists;
