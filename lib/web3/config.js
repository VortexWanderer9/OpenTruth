"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpfsUrl = exports.IPFS_GATEWAYS = exports.rainbowConfig = exports.WEB3_STORAGE_TOKEN = exports.RPC_URLS = exports.CONTRACTS = void 0;
var rainbowkit_1 = require("@rainbow-me/rainbowkit");
var chains_1 = require("viem/chains");
// Smart contract addresses (these should be updated after contract deployment)
exports.CONTRACTS = {
    REPUTATION_TOKEN: process.env.NEXT_PUBLIC_REPUTATION_TOKEN || '0x0000000000000000000000000000000000000000',
    GOVERNANCE_DAO: process.env.NEXT_PUBLIC_GOVERNANCE_DAO || '0x0000000000000000000000000000000000000000',
    CONTENT_REGISTRY: process.env.NEXT_PUBLIC_CONTENT_REGISTRY || '0x0000000000000000000000000000000000000000',
};
// RPC URLs
exports.RPC_URLS = {
    POLYGON: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-rpc.com',
};
// Web3.Storage token for IPFS uploads
exports.WEB3_STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || '';
// Rainbow Kit configuration
var projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
exports.rainbowConfig = (0, rainbowkit_1.getDefaultConfig)({
    appName: 'OpenTruth',
    projectId: projectId || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // Placeholder for demo/development
    chains: [chains_1.polygon],
    ssr: true,
});
// Gateway URLs for IPFS content
exports.IPFS_GATEWAYS = [
    'https://w3s.link/ipfs',
    'https://ipfs.io/ipfs',
    'https://cloudflare-ipfs.com/ipfs',
];
var getIpfsUrl = function (hash) {
    return "".concat(exports.IPFS_GATEWAYS[0], "/").concat(hash);
};
exports.getIpfsUrl = getIpfsUrl;
