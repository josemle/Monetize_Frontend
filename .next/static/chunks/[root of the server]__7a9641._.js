(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__7a9641._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/contract/Contract.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"_format\":\"hh-sol-artifact-1\",\"contractName\":\"Partnership\",\"sourceName\":\"contracts/Partnership.sol\",\"abi\":[{\"inputs\":[{\"internalType\":\"address payable[]\",\"name\":\"_addresses\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"_splitRatios\",\"type\":\"uint256[]\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"addresses\",\"outputs\":[{\"internalType\":\"address payable\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"splitRatios\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"bytecode\":\"0x608060405234801561001057600080fd5b50604051611116380380611116833981810160405281019061003291906106ff565b6001825111610076576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161006d90610820565b60405180910390fd5b81518151146100ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100b1906108b2565b60405180910390fd5b81600090805190602001906100d092919061033d565b5080600190805190602001906100e79291906103c7565b50610147600180548060200260200160405190810160405280929190818152602001828054801561013757602002820191906000526020600020905b815481526020019060010190808311610123575b505050505061019860201b60201c565b6002819055506101916040518060400160405280601481526020017f436f6e7472616374206973204465706c6f79656400000000000000000000000081525061024760201b60201c565b5050610a8f565b6000806000905060005b835181101561023d5760008482815181106101c0576101bf6108d2565b5b602002602001015111610208576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ff9061094d565b60405180910390fd5b83818151811061021b5761021a6108d2565b5b60200260200101518261022e919061099c565b915080806001019150506101a2565b5080915050919050565b6102e38160405160240161025b9190610a3e565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506102e660201b60201c565b50565b6103078161030261030a60201b6102eb1761032b60201b60201c565b60201c565b50565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b61041460201b61030c17819050919050565b8280548282559060005260206000209081019282156103b6579160200282015b828111156103b55782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019061035d565b5b5090506103c3919061041e565b5090565b828054828255906000526020600020908101928215610403579160200282015b828111156104025782518255916020019190600101906103e7565b5b509050610410919061041e565b5090565b61041c610a60565b565b5b8082111561043757600081600090555060010161041f565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61049d82610454565b810181811067ffffffffffffffff821117156104bc576104bb610465565b5b80604052505050565b60006104cf61043b565b90506104db8282610494565b919050565b600067ffffffffffffffff8211156104fb576104fa610465565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061053c82610511565b9050919050565b61054c81610531565b811461055757600080fd5b50565b60008151905061056981610543565b92915050565b600061058261057d846104e0565b6104c5565b905080838252602082019050602084028301858111156105a5576105a461050c565b5b835b818110156105ce57806105ba888261055a565b8452602084019350506020810190506105a7565b5050509392505050565b600082601f8301126105ed576105ec61044f565b5b81516105fd84826020860161056f565b91505092915050565b600067ffffffffffffffff82111561062157610620610465565b5b602082029050602081019050919050565b6000819050919050565b61064581610632565b811461065057600080fd5b50565b6000815190506106628161063c565b92915050565b600061067b61067684610606565b6104c5565b9050808382526020820190506020840283018581111561069e5761069d61050c565b5b835b818110156106c757806106b38882610653565b8452602084019350506020810190506106a0565b5050509392505050565b600082601f8301126106e6576106e561044f565b5b81516106f6848260208601610668565b91505092915050565b6000806040838503121561071657610715610445565b5b600083015167ffffffffffffffff8111156107345761073361044a565b5b610740858286016105d8565b925050602083015167ffffffffffffffff8111156107615761076061044a565b5b61076d858286016106d1565b9150509250929050565b600082825260208201905092915050565b7f4d6f7265207468616e206f6e6520616464726573732073686f756c642062652060008201527f70726f766964656420746f2065737461626c697368206120706172746e65727360208201527f6869700000000000000000000000000000000000000000000000000000000000604082015250565b600061080a604383610777565b915061081582610788565b606082019050919050565b60006020820190508181036000830152610839816107fd565b9050919050565b7f546865206164647265737320616d6f756e7420616e64207468652073706c697460008201527f20726174696f20616d6f756e742073686f756c6420626520657175616c000000602082015250565b600061089c603d83610777565b91506108a782610840565b604082019050919050565b600060208201905081810360008301526108cb8161088f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f53706c697420726174696f2063616e206e6f742062652030206f72206c657373600082015250565b6000610937602083610777565b915061094282610901565b602082019050919050565b600060208201905081810360008301526109668161092a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006109a782610632565b91506109b283610632565b92508282019050808211156109ca576109c961096d565b5b92915050565b600081519050919050565b60005b838110156109f95780820151818401526020810190506109de565b60008484015250505050565b6000610a10826109d0565b610a1a8185610777565b9350610a2a8185602086016109db565b610a3381610454565b840191505092915050565b60006020820190508181036000830152610a588184610a05565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fd5b61067880610a9e6000396000f3fe6080604052600436106100435760003560e01c806312065fe01461004f5780633ccfd60b1461007a5780637ab0d1e814610091578063edf26d9b146100ce5761004a565b3661004a57005b600080fd5b34801561005b57600080fd5b5061006461010b565b604051610071919061032f565b60405180910390f35b34801561008657600080fd5b5061008f610113565b005b34801561009d57600080fd5b506100b860048036038101906100b3919061037b565b610288565b6040516100c5919061032f565b60405180910390f35b3480156100da57600080fd5b506100f560048036038101906100f0919061037b565b6102ac565b60405161010291906103e9565b60405180910390f35b600047905090565b600061011d61010b565b90506000808054905090506000821161016b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016290610461565b60405180910390fd5b6002548210156101b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101a7906104f3565b60405180910390fd5b60005b8181101561028357600081815481106101cf576101ce610513565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001838154811061022757610226610513565b5b90600052602060002001546002548661024091906105a0565b61024a91906105d1565b9081150290604051600060405180830381858888f19350505050158015610275573d6000803e3d6000fd5b5080806001019150506101b3565b505050565b6001818154811061029857600080fd5b906000526020600020016000915090505481565b600081815481106102bc57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b610314610613565b565b6000819050919050565b61032981610316565b82525050565b60006020820190506103446000830184610320565b92915050565b600080fd5b61035881610316565b811461036357600080fd5b50565b6000813590506103758161034f565b92915050565b6000602082840312156103915761039061034a565b5b600061039f84828501610366565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103d3826103a8565b9050919050565b6103e3816103c8565b82525050565b60006020820190506103fe60008301846103da565b92915050565b600082825260208201905092915050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b600061044b601483610404565b915061045682610415565b602082019050919050565b6000602082019050818103600083015261047a8161043e565b9050919050565b7f42616c616e63652073686f756c642062652067726561746572207468616e207460008201527f686520746f74616c2073706c697420726174696f730000000000000000000000602082015250565b60006104dd603583610404565b91506104e882610481565b604082019050919050565b6000602082019050818103600083015261050c816104d0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105ab82610316565b91506105b683610316565b9250826105c6576105c5610542565b5b828204905092915050565b60006105dc82610316565b91506105e783610316565b92508282026105f581610316565b9150828204841483151761060c5761060b610571565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea264697066735822122031c39416d515e77474fa0a436c561d710ba153eb5e84a1e685a80bdac3e2605864736f6c634300081c0033\",\"deployedBytecode\":\"0x6080604052600436106100435760003560e01c806312065fe01461004f5780633ccfd60b1461007a5780637ab0d1e814610091578063edf26d9b146100ce5761004a565b3661004a57005b600080fd5b34801561005b57600080fd5b5061006461010b565b604051610071919061032f565b60405180910390f35b34801561008657600080fd5b5061008f610113565b005b34801561009d57600080fd5b506100b860048036038101906100b3919061037b565b610288565b6040516100c5919061032f565b60405180910390f35b3480156100da57600080fd5b506100f560048036038101906100f0919061037b565b6102ac565b60405161010291906103e9565b60405180910390f35b600047905090565b600061011d61010b565b90506000808054905090506000821161016b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016290610461565b60405180910390fd5b6002548210156101b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101a7906104f3565b60405180910390fd5b60005b8181101561028357600081815481106101cf576101ce610513565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001838154811061022757610226610513565b5b90600052602060002001546002548661024091906105a0565b61024a91906105d1565b9081150290604051600060405180830381858888f19350505050158015610275573d6000803e3d6000fd5b5080806001019150506101b3565b505050565b6001818154811061029857600080fd5b906000526020600020016000915090505481565b600081815481106102bc57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b610314610613565b565b6000819050919050565b61032981610316565b82525050565b60006020820190506103446000830184610320565b92915050565b600080fd5b61035881610316565b811461036357600080fd5b50565b6000813590506103758161034f565b92915050565b6000602082840312156103915761039061034a565b5b600061039f84828501610366565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103d3826103a8565b9050919050565b6103e3816103c8565b82525050565b60006020820190506103fe60008301846103da565b92915050565b600082825260208201905092915050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b600061044b601483610404565b915061045682610415565b602082019050919050565b6000602082019050818103600083015261047a8161043e565b9050919050565b7f42616c616e63652073686f756c642062652067726561746572207468616e207460008201527f686520746f74616c2073706c697420726174696f730000000000000000000000602082015250565b60006104dd603583610404565b91506104e882610481565b604082019050919050565b6000602082019050818103600083015261050c816104d0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105ab82610316565b91506105b683610316565b9250826105c6576105c5610542565b5b828204905092915050565b60006105dc82610316565b91506105e783610316565b92508282026105f581610316565b9150828204841483151761060c5761060b610571565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea264697066735822122031c39416d515e77474fa0a436c561d710ba153eb5e84a1e685a80bdac3e2605864736f6c634300081c0033\",\"linkReferences\":{},\"deployedLinkReferences\":{}}"));}}),
"[project]/src/pages/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web3$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/web3/lib/esm/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contract$2f$Contract$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/contract/Contract.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web3$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/web3/lib/esm/index.js [client] (ecmascript) <locals>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
function MainButton({ onClick, disabled, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `inline-flex rounded-md shadow disabled:opacity-50`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `inline-flex items-center justify-center px-5 py-3 border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/pages/index.js",
            lineNumber: 13,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
_c = MainButton;
function AddressInput({ id, label, value, onChange, onBlur, error }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: `address-${id}`,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: `address-${id}`,
                value: value,
                type: "text",
                onChange: (event)=>onChange(event.target.value),
                onBlur: (event)=>onBlur(event.target.value),
                className: 'form-input rounded px-4 py-3',
                placeholder: "Wallet Address"
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-600 text-sm",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 36,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm",
                children: " "
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 38,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_c1 = AddressInput;
function SplitInput({ id, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: `split-${id}`,
                children: "Split"
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: `split-${id}`,
                value: value,
                type: "number",
                onChange: (event)=>onChange(Number(event.target.value)),
                className: 'form-input rounded px-4 py-3',
                placeholder: 1,
                min: 1,
                step: 1
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
_c2 = SplitInput;
function PartnerInput({ address, split }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: 'flex',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: 'mr-3 w-full',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddressInput, {
                    id: address.id,
                    label: address.label,
                    value: address.value,
                    onChange: address.onChange,
                    onBlur: address.onBlur,
                    error: address.error
                }, void 0, false, {
                    fileName: "[project]/src/pages/index.js",
                    lineNumber: 66,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 65,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: 'w-1/5',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SplitInput, {
                    id: split.id,
                    value: split.value,
                    onChange: split.onChange
                }, void 0, false, {
                    fileName: "[project]/src/pages/index.js",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 75,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 64,
        columnNumber: 9
    }, this);
}
_c3 = PartnerInput;
function Home() {
    _s();
    const web3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [deployedContractAddress, setDeployedContractAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isDeploying, setIsDeploying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentAccount, setCurrentAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasWalletWarning, setHasWalletWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [partners, setPartners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            label: 'Partner A',
            address: '',
            error: '',
            split: 1
        },
        {
            id: '2',
            label: 'Partner B',
            address: '',
            error: '',
            split: 1
        }
    ]);
    const checkIfWalletIsConnected = ()=>{
        return Boolean(window.ethereum);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const hasWallet = checkIfWalletIsConnected();
            setHasWalletWarning(!hasWallet);
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (web3.current) {
                return;
            }
            if (!checkIfWalletIsConnected()) {
                return;
            }
            web3.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web3$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](window.ethereum);
            web3.current.eth.getBlock('latest').then({
                "Home.useEffect": (block)=>console.log(block)
            }["Home.useEffect"]);
        }
    }["Home.useEffect"], []);
    const connectWallet = async ()=>{
        if (!checkIfWalletIsConnected()) {
            return;
        }
        try {
            const { ethereum } = window;
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });
            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const handleStartPartnership = async ()=>{
        const addresses = [
            partners[0].address,
            partners[1].address
        ];
        const splitRatio = [
            partners[0].split,
            partners[1].split
        ];
        const contractArguments = [
            addresses,
            splitRatio
        ];
        const { abi, bytecode } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contract$2f$Contract$2e$json__$28$json$29$__["default"];
        const contract = new web3.current.eth.Contract(abi);
        const contractDeploymentData = {
            data: bytecode,
            arguments: contractArguments
        };
        const gas = await contract.deploy(contractDeploymentData).estimateGas();
        setIsDeploying(true);
        contract.deploy(contractDeploymentData).send({
            from: currentAccount,
            gas: 5000000,
            gasPrice: web3.current.utils.toWei('10', 'gwei')
        }).on('error', (error)=>{
            console.log(error);
            setIsDeploying(false);
        }).on('receipt', (receipt)=>{
            // receipt will contain deployed contract address
            console.log(receipt);
            setIsDeploying(false);
            setDeployedContractAddress(receipt.contractAddress);
        }).on('confirmation', (_confirmationNumber, receipt)=>{
            console.log(receipt);
            setIsDeploying(false);
        });
    };
    const addressInputs = partners.map((partner, index)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PartnerInput, {
            address: {
                id: partner.id,
                label: partner.label,
                value: partner.address,
                onChange: (value)=>{
                    setPartners((oldPartnersState)=>{
                        const newPartnersState = [
                            ...oldPartnersState
                        ];
                        newPartnersState[index].address = value;
                        return newPartnersState;
                    });
                },
                onBlur: (value)=>{
                    setPartners((oldPartnersState)=>{
                        const isValueAddress = web3.current.utils.isAddress(value);
                        const newPartnersState = [
                            ...oldPartnersState
                        ];
                        newPartnersState[index].error = isValueAddress ? '' : 'Enter a valid wallet address';
                        return newPartnersState;
                    });
                },
                error: partner.error
            },
            split: {
                id: partner.id,
                value: partner.split,
                onChange: (value)=>{
                    setPartners((oldPartnersState)=>{
                        const newPartnersState = [
                            ...oldPartnersState
                        ];
                        newPartnersState[index].split = value;
                        return newPartnersState;
                    });
                }
            }
        }, partner.label, false, {
            fileName: "[project]/src/pages/index.js",
            lineNumber: 194,
            columnNumber: 13
        }, this);
    });
    const hasErrors = partners.some((partner)=>Boolean(partner.error));
    const hasEmptyValues = partners.some((partner)=>!Boolean(partner.address));
    const handleConfirm = ()=>{
        setDeployedContractAddress('');
    };
    if (deployedContractAddress) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex flex-1 flex-col items-center justify-start py-8 pt-12 px-6 md:pt-20 text-zinc-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-6xl font-extrabold mb-3 pb-2 text-indigo-600",
                        children: "Congratulations!"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 248,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "max-w-md text-center mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mb-6",
                                children: [
                                    "Your contract is now deployed at this address. ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/pages/index.js",
                                        lineNumber: 254,
                                        columnNumber: 76
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold",
                                        children: "You should write it down."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.js",
                                        lineNumber: 255,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 253,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold mb-6 text-sm border-dashed border-2 p-1 border-slate-600",
                                children: deployedContractAddress
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 257,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: "Any payment made to this address will be split in between you and your partner when withdrawn."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 260,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 flex flex-col justify-center items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainButton, {
                                    label: 'I wrote down the address',
                                    onClick: handleConfirm
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/index.js",
                                    lineNumber: 265,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 264,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 252,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 247,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/index.js",
            lineNumber: 246,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex flex-1 flex-col items-center justify-start py-8 pt-12 px-6 md:pt-20 text-zinc-700",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-7xl md:text-6xl font-extrabold text-indigo-600 mb-3 pb-2",
                    children: "Partnerly"
                }, void 0, false, {
                    fileName: "[project]/src/pages/index.js",
                    lineNumber: 279,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "max-w-md text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl",
                            children: "Partnerly creates a smart contract for you and your partner that distributes the payments to the partnership contract in a predetermined split ratio."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.js",
                            lineNumber: 283,
                            columnNumber: 21
                        }, this),
                        hasWalletWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-red-600",
                            children: "You will need Metamask or equivalent to use this app."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.js",
                            lineNumber: 289,
                            columnNumber: 25
                        }, this),
                        !currentAccount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainButton, {
                                onClick: connectWallet,
                                label: 'Connect Wallet'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 295,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.js",
                            lineNumber: 294,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/index.js",
                    lineNumber: 282,
                    columnNumber: 17
                }, this),
                currentAccount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-3 mb-6",
                    children: addressInputs
                }, void 0, false, {
                    fileName: "[project]/src/pages/index.js",
                    lineNumber: 301,
                    columnNumber: 21
                }, this),
                currentAccount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col justify-center items-center p-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainButton, {
                            onClick: handleStartPartnership,
                            disabled: hasErrors || hasEmptyValues || isDeploying,
                            label: isDeploying ? 'Deploying' : 'Partner Up!'
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.js",
                            lineNumber: 307,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 306,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/index.js",
                    lineNumber: 305,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/index.js",
            lineNumber: 278,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 277,
        columnNumber: 9
    }, this);
}
_s(Home, "y4GhxKUcTiEdgxCPbPberkRN1RY=");
_c4 = Home;
var _c, _c1, _c2, _c3, _c4;
__turbopack_refresh__.register(_c, "MainButton");
__turbopack_refresh__.register(_c1, "AddressInput");
__turbopack_refresh__.register(_c2, "SplitInput");
__turbopack_refresh__.register(_c3, "PartnerInput");
__turbopack_refresh__.register(_c4, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__7a9641._.js.map