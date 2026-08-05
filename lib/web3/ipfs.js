"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToIPFS = uploadToIPFS;
exports.getIPFSUrl = getIPFSUrl;
exports.fetchFromIPFS = fetchFromIPFS;
exports.uploadPostContent = uploadPostContent;
exports.uploadCommentContent = uploadCommentContent;
exports.uploadCommunityNote = uploadCommunityNote;
var lib_js_1 = require("web3.storage/dist/src/lib.js");
var config_1 = require("./config");
// Initialize Web3.Storage client
var web3StorageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
if (!web3StorageToken) {
    console.warn('WEB3_STORAGE_TOKEN not set - IPFS uploads will fail');
}
var getWeb3StorageClient = function () {
    if (!web3StorageToken) {
        throw new Error('WEB3_STORAGE_TOKEN environment variable is required');
    }
    return new lib_js_1.Web3Storage({ token: web3StorageToken });
};
/**
 * Upload content to IPFS via Web3.Storage
 * @param fileName - Name of the file
 * @param content - Content to upload (string or Buffer)
 * @returns IPFS hash
 */
function uploadToIPFS(fileName, content) {
    return __awaiter(this, void 0, void 0, function () {
        var client, blob, file, cid, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    client = getWeb3StorageClient();
                    blob = new Blob([content], { type: 'application/json' });
                    file = new File([blob], fileName, { type: 'application/json' });
                    return [4 /*yield*/, client.put([file], {
                            name: fileName,
                            maxRetries: 3,
                        })];
                case 1:
                    cid = _a.sent();
                    return [2 /*return*/, cid];
                case 2:
                    error_1 = _a.sent();
                    console.error('IPFS upload error:', error_1);
                    throw new Error("Failed to upload to IPFS: ".concat(error_1));
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Get IPFS content URL
 * @param hash - IPFS hash (CID)
 * @returns Full IPFS URL
 */
function getIPFSUrl(hash) {
    if (!hash)
        return '';
    // Use the first gateway
    return "".concat(config_1.IPFS_GATEWAYS[0], "/").concat(hash);
}
/**
 * Fetch content from IPFS
 * @param hash - IPFS hash (CID)
 * @returns Parsed JSON content
 */
function fetchFromIPFS(hash) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, IPFS_GATEWAYS_1, gateway, url, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hash) {
                        throw new Error('IPFS hash is required');
                    }
                    _i = 0, IPFS_GATEWAYS_1 = config_1.IPFS_GATEWAYS;
                    _a.label = 1;
                case 1:
                    if (!(_i < IPFS_GATEWAYS_1.length)) return [3 /*break*/, 7];
                    gateway = IPFS_GATEWAYS_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    url = "".concat(gateway, "/").concat(hash);
                    return [4 /*yield*/, fetch(url, { cache: 'force-cache' })];
                case 3:
                    response = _a.sent();
                    if (!response.ok) {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, response.json()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    error_2 = _a.sent();
                    // Try next gateway
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: throw new Error("Failed to fetch from IPFS: ".concat(hash));
            }
        });
    });
}
/**
 * Upload post content to IPFS
 */
function uploadPostContent(content, mentionedUsers, hashtags) {
    return __awaiter(this, void 0, void 0, function () {
        var postData;
        return __generator(this, function (_a) {
            postData = {
                content: content,
                mentionedUsers: mentionedUsers || [],
                hashtags: hashtags || [],
                timestamp: new Date().toISOString(),
            };
            return [2 /*return*/, uploadToIPFS("post-".concat(Date.now(), ".json"), JSON.stringify(postData))];
        });
    });
}
/**
 * Upload comment content to IPFS
 */
function uploadCommentContent(content, postId, parentCommentId) {
    return __awaiter(this, void 0, void 0, function () {
        var commentData;
        return __generator(this, function (_a) {
            commentData = {
                content: content,
                postId: postId,
                parentCommentId: parentCommentId,
                timestamp: new Date().toISOString(),
            };
            return [2 /*return*/, uploadToIPFS("comment-".concat(Date.now(), ".json"), JSON.stringify(commentData))];
        });
    });
}
/**
 * Upload community note to IPFS
 */
function uploadCommunityNote(content, noteType, references) {
    return __awaiter(this, void 0, void 0, function () {
        var noteData;
        return __generator(this, function (_a) {
            noteData = {
                content: content,
                noteType: noteType,
                references: references || [],
                timestamp: new Date().toISOString(),
            };
            return [2 /*return*/, uploadToIPFS("note-".concat(Date.now(), ".json"), JSON.stringify(noteData))];
        });
    });
}
