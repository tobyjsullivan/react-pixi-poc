import * as PIXI from "pixi.js";
import ReactReconciler from "react-reconciler";

import { TYPE_RECTANGLE } from "./types";

const logFunctionCall =
  (cb) =>
  (...args) => {
    const result = cb(...args);

    console.log(`[fn] ${cb.name}`, args, `=>`, result);
    return result;
  };

/**
 * This method should return a newly created node. For example, the DOM renderer would call `document.createElement(type)` here and then set the properties from `props`.
 *
 * You can use `rootContainer` to access the root container associated with that tree. For example, in the DOM renderer, this is useful to get the correct `document` reference that the root belongs to.
 *
 * The `hostContext` parameter lets you keep track of some information about your current place in the tree. To learn more about it, see `getChildHostContext` below.
 *
 * The `internalHandle` data structure is meant to be opaque. If you bend the rules and rely on its internal fields, be aware that it may change significantly between versions. You're taking on additional maintenance risk by reading from it, and giving up all guarantees if you write something to it.
 *
 * This method happens **in the render phase**. It can (and usually should) mutate the node it has just created before returning it, but it must not modify any other nodes. It must not register any event handlers on the parent tree. This is because an instance being created doesn't guarantee it would be placed in the tree — it could be left unused and later collected by GC. If you need to do something when an instance is definitely in the tree, look at `commitMount` instead.
 */
function createInstance(
  type,
  props,
  pixiContainer,
  hostContext,
  internalHandle
) {
  switch (type) {
    case TYPE_RECTANGLE: {
      const { x = 0, y = 0, width = 100, height = 100 } = props;

      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xffffff);
      graphics.drawRect(x, y, width, height);
      graphics.endFill();

      return graphics;
    }
    default:
      throw new Error(`Unknown element type: ${type}`);
  }
}

/**
 * Same as `createInstance`, but for text nodes. If your renderer doesn't support text nodes, you can throw here.
 */
function createTextInstance(text, rootContainer, hostContext, internalHandle) {
  // TODO
}

/**
 * This method should mutate the `parentInstance` and add the child to its list of children. For example, in the DOM this would translate to a `parentInstance.appendChild(child)` call.
 *
 * This method happens **in the render phase**. It can mutate `parentInstance` and `child`, but it must not modify any other nodes. It's called while the tree is still being built up and not connected to the actual tree on the screen.
 */

function appendInitialChild(parentInstance, child) {}

/**
 * In this method, you can perform some final mutations on the `instance`. Unlike with `createInstance`, by the time `finalizeInitialChildren` is called, all the initial children have already been added to the `instance`, but the instance itself has not yet been connected to the tree on the screen.
 *
 * This method happens **in the render phase**. It can mutate `instance`, but it must not modify any other nodes. It's called while the tree is still being built up and not connected to the actual tree on the screen.
 *
 * There is a second purpose to this method. It lets you specify whether there is some work that needs to happen when the node is connected to the tree on the screen. If you return `true`, the instance will receive a `commitMount` call later. See its documentation below.
 *
 * If you don't want to do anything here, you should return `false`.
 */

function finalizeInitialChildren(
  instance,
  type,
  props,
  rootContainer,
  hostContext
) {
  return false;
}

/**
 * React calls this method so that you can compare the previous and the next props, and decide whether you need to update the underlying instance or not. If you don't need to update it, return `null`. If you need to update it, you can return an arbitrary object representing the changes that need to happen. Then in `commitUpdate` you would need to apply those changes to the instance.
 *
 * This method happens **in the render phase**. It should only *calculate* the update — but not apply it! For example, the DOM renderer returns an array that looks like `[prop1, value1, prop2, value2, ...]` for all props that have actually changed. And only in `commitUpdate` it applies those changes. You should calculate as much as you can in `prepareUpdate` so that `commitUpdate` can be very fast and straightforward.
 *
 * See the meaning of `rootContainer` and `hostContext` in the `createInstance` documentation.
 */

function prepareUpdate(
  instance,
  type,
  oldProps,
  newProps,
  rootContainer,
  hostContext
) {}

/**
 * Some target platforms support setting an instance's text content without manually creating a text node. For example, in the DOM, you can set `node.textContent` instead of creating a text node and appending it.
 *
 * If you return `true` from this method, React will assume that this node's children are text, and will not create nodes for them. It will instead rely on you to have filled that text during `createInstance`. This is a performance optimization. For example, the DOM renderer returns `true` only if `type` is a known text-only parent (like `'textarea'`) or if `props.children` has a `'string'` type. If you return `true`, you will need to implement `resetTextContent` too.
 *
 * If you don't want to do anything here, you should return `false`.
 *
 * This method happens **in the render phase**. Do not mutate the tree from it.
 */

function shouldSetTextContent(type, props) {
  return false;
}

/**
 * This method lets you return the initial host context from the root of the tree. See `getChildHostContext` for the explanation of host context.
 *
 * If you don't intend to use host context, you can return `null`.
 *
 * This method happens **in the render phase**. Do not mutate the tree from it.
 */

function getRootHostContext(rootContainer) {
  return null;
}

/**
 * Host context lets you track some information about where you are in the tree so that it's available inside `createInstance` as the `hostContext` parameter. For example, the DOM renderer uses it to track whether it's inside an HTML or an SVG tree, because `createInstance` implementation needs to be different for them.
 *
 * If the node of this `type` does not influence the context you want to pass down, you can return `parentHostContext`. Alternatively, you can return any custom object representing the information you want to pass down.
 *
 * If you don't want to do anything here, return `parentHostContext`.
 *
 * This method happens **in the render phase**. Do not mutate the tree from it.
 */

function getChildHostContext(parentHostContext, type, rootContainer) {
  return parentHostContext;
}
/**
 * Determines what object gets exposed as a ref. You'll likely want to return the `instance` itself. But in some cases it might make sense to only expose some part of it.
 *
 * If you don't want to do anything here, return `instance`.
 */
function getPublicInstance(instance) {}
/**
 * This method lets you store some information before React starts making changes to the tree on the screen. For example, the DOM renderer stores the current text selection so that it can later restore it. This method is mirrored by `resetAfterCommit`.
 *
 * Even if you don't want to do anything here, you need to return `null` from it.
 */
function prepareForCommit(containerInfo) {}
/**
 * This method is called right after React has performed the tree mutations. You can use it to restore something you've stored in `prepareForCommit` — for example, text selection.
 *
 * You can leave it empty.
 */
function resetAfterCommit(containerInfo) {}

/**
 * This method is called for a container that's used as a portal target. Usually you can leave it empty.
 */
function preparePortalMount(containerInfo) {}

/**
 * You can proxy this to `setTimeout` or its equivalent in your environment.
 */
function scheduleTimeout(fn, delay) {}

/**
 * You can proxy this to `clearTimeout` or its equivalent in your environment.
 */
function cancelTimeout(id) {}

/**
 * This is a property (not a function) that should be set to something that can never be a valid timeout ID. For example, you can set it to `-1`.
 */
const noTimeout = undefined;
/**
 * Set this to `true` to indicate that your renderer supports `scheduleMicrotask`. We use microtasks as part of our discrete event implementation in React DOM. If you're not sure if your renderer should support this, you probably should. The option to not implement `scheduleMicrotask` exists so that platforms with more control over user events, like React Native, can choose to use a different mechanism.
 */
const supportsMicrotask = undefined;

/**
 * Optional. You can proxy this to `queueMicrotask` or its equivalent in your environment.
 */
function scheduleMicrotask(fn) {}
/**
 * This is a property (not a function) that should be set to `true` if your renderer is the main one on the page. For example, if you're writing a renderer for the Terminal, it makes sense to set it to `true`, but if your renderer is used *on top of* React DOM or some other existing renderer, set it to `false`.
 */
const isPrimaryRenderer = undefined;

/**
 * Whether the renderer shouldn't trigger missing `act()` warnings
 */
const warnsIfNotActing = undefined;
/**
 * To implement this method, you'll need some constants available on the special `react-reconciler/constants` entry point:
 *
 * ```
 * import {
 *   DiscreteEventPriority,
 *   ContinuousEventPriority,
 *   DefaultEventPriority,
 * } from 'react-reconciler/constants';
 *
 * const HostConfig = {
 *   // ...
 *   getCurrentEventPriority() {
 *     return DefaultEventPriority;
 *   },
 *   // ...
 * }
 *
 * const MyRenderer = Reconciler(HostConfig);
 * ```
 *
 * The constant you return depends on which event, if any, is being handled right now. (In the browser, you can check this using `window.event && window.event.type`).
 *
 * - **Discrete events**: If the active event is directly caused by the user (such as mouse and keyboard events) and each event in a sequence is intentional (e.g. click), return DiscreteEventPriority. This tells React that they should interrupt any background work and cannot be batched across time.
 *
 * - **Continuous events**: If the active event is directly caused by the user but the user can't distinguish between individual events in a sequence (e.g. mouseover), return ContinuousEventPriority. This tells React they should interrupt any background work but can be batched across time.
 *
 * - **Other events / No active event**: In all other cases, return DefaultEventPriority. This tells React that this event is considered background work, and interactive events will be prioritized over it.
 *
 * You can consult the `getCurrentEventPriority()` implementation in `ReactDOMHostConfig.js` for a reference implementation.
 */
function getCurrentEventPriority() {}

function getInstanceFromNode(node) {}

function beforeActiveInstanceBlur() {}

function afterActiveInstanceBlur() {}

function prepareScopeUpdate(scopeInstance, instance) {}

function getInstanceFromScope(scopeInstance) {}

function detachDeletedInstance(node) {}

// -------------------
//  Mutation Methods
//    (optional)
//  If you're using React in mutation mode (you probably do), you'll need to implement a few more methods.
// -------------------
/**
 * This method should mutate the `parentInstance` and add the child to its list of children. For example, in the DOM this would translate to a `parentInstance.appendChild(child)` call.
 *
 * Although this method currently runs in the commit phase, you still should not mutate any other nodes in it. If you need to do some additional work when a node is definitely connected to the visible tree, look at `commitMount`.
 */
function appendChild(parentInstance, child) {
  parentInstance.addChild(child);
}
/**
 * Same as `appendChild`, but for when a node is attached to the root container. This is useful if attaching to the root has a slightly different implementation, or if the root container nodes are of a different type than the rest of the tree.
 */
function appendChildToContainer(container, child) {
  appendChild(container, child);
}
/**
 * This method should mutate the `parentInstance` and place the `child` before `beforeChild` in the list of its children. For example, in the DOM this would translate to a `parentInstance.insertBefore(child, beforeChild)` call.
 *
 * Note that React uses this method both for insertions and for reordering nodes. Similar to DOM, it is expected that you can call `insertBefore` to reposition an existing child. Do not mutate any other parts of the tree from it.
 */
function insertBefore(parentInstance, child, beforeChild) {}
/**
 * Same as `insertBefore`, but for when a node is attached to the root container. This is useful if attaching to the root has a slightly different implementation, or if the root container nodes are of a different type than the rest of the tree.
 */
function insertInContainerBefore(container, child, beforeChild) {}
/**
 * This method should mutate the `parentInstance` to remove the `child` from the list of its children.
 *
 * React will only call it for the top-level node that is being removed. It is expected that garbage collection would take care of the whole subtree. You are not expected to traverse the child tree in it.
 */
function removeChild(parentInstance, child) {}
/**
 * Same as `removeChild`, but for when a node is detached from the root container. This is useful if attaching to the root has a slightly different implementation, or if the root container nodes are of a different type than the rest of the tree.
 */
function removeChildFromContainer(container, child) {}
/**
 * If you returned `true` from `shouldSetTextContent` for the previous props, but returned `false` from `shouldSetTextContent` for the next props, React will call this method so that you can clear the text content you were managing manually. For example, in the DOM you could set `node.textContent = ''`.
 *
 * If you never return `true` from `shouldSetTextContent`, you can leave it empty.
 */
function resetTextContent(instance) {}

/**
 * This method should mutate the `textInstance` and update its text content to `nextText`.
 *
 * Here, `textInstance` is a node created by `createTextInstance`.
 */
function commitTextUpdate(textInstance, oldText, newText) {}
/**
 * This method is only called if you returned `true` from `finalizeInitialChildren` for this instance.
 *
 * It lets you do some additional work after the node is actually attached to the tree on the screen for the first time. For example, the DOM renderer uses it to trigger focus on nodes with the `autoFocus` attribute.
 *
 * Note that `commitMount` does not mirror `removeChild` one to one because `removeChild` is only called for the top-level removed node. This is why ideally `commitMount` should not mutate any nodes other than the `instance` itself. For example, if it registers some events on some node above, it will be your responsibility to traverse the tree in `removeChild` and clean them up, which is not ideal.
 *
 * The `internalHandle` data structure is meant to be opaque. If you bend the rules and rely on its internal fields, be aware that it may change significantly between versions. You're taking on additional maintenance risk by reading from it, and giving up all guarantees if you write something to it.
 *
 * If you never return `true` from `finalizeInitialChildren`, you can leave it empty.
 */
function commitMount(instance, type, props, internalInstanceHandle) {}
/**
 * This method should mutate the `instance` according to the set of changes in `updatePayload`. Here, `updatePayload` is the object that you've returned from `prepareUpdate` and has an arbitrary structure that makes sense for your renderer. For example, the DOM renderer returns an update payload like `[prop1, value1, prop2, value2, ...]` from `prepareUpdate`, and that structure gets passed into `commitUpdate`. Ideally, all the diffing and calculation should happen inside `prepareUpdate` so that `commitUpdate` can be fast and straightforward.
 *
 * The `internalHandle` data structure is meant to be opaque. If you bend the rules and rely on its internal fields, be aware that it may change significantly between versions. You're taking on additional maintenance risk by reading from it, and giving up all guarantees if you write something to it.
 */
function commitUpdate(
  instance,
  updatePayload,
  type,
  prevProps,
  nextProps,
  internalHandle
) {}
/**
 * This method should make the `instance` invisible without removing it from the tree. For example, it can apply visual styling to hide it. It is used by Suspense to hide the tree while the fallback is visible.
 */
function hideInstance(instance) {}

/**
 * Same as `hideInstance`, but for nodes created by `createTextInstance`.
 */
function hideTextInstance(textInstance) {}

/**
 * This method should make the `instance` visible, undoing what `hideInstance` did.
 */
function unhideInstance(instance, props) {}

/**
 * Same as `unhideInstance`, but for nodes created by `createTextInstance`.
 */
function unhideTextInstance(textInstance, text) {}

/**
 * This method should mutate the `container` root node and remove all children from it.
 */
function clearContainer(container) {}
// -------------------
// Persistence Methods
//    (optional)
//  If you use the persistent mode instead of the mutation mode, you would still need the "Core Methods". However, instead of the Mutation Methods above you will implement a different set of methods that performs cloning nodes and replacing them at the root level. You can find a list of them in the "Persistence" section [listed in this file](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/forks/ReactFiberHostConfig.custom.js). File an issue if you need help.
// -------------------
function cloneInstance(
  instance,
  updatePayload,
  type,
  oldProps,
  newProps,
  internalInstanceHandle,
  keepChildren,
  recyclableInstance
) {}
function createContainerChildSet(container) {}
function appendChildToContainerChildSet(childSet, child) {}
function finalizeContainerChildren(container, newChildren) {}
function replaceContainerChildren(container, newChildren) {}
function cloneHiddenInstance(instance, type, props, internalInstanceHandle) {}
function cloneHiddenTextInstance(instance, text, internalInstanceHandle) {}
// -------------------
// Hydration Methods
//    (optional)
// You can optionally implement hydration to "attach" to the existing tree during the initial render instead of creating it from scratch. For example, the DOM renderer uses this to attach to an HTML markup.
// To support hydration, you need to declare `supportsHydration: true` and then implement the methods in the "Hydration" section [listed in this file](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/forks/ReactFiberHostConfig.custom.js). File an issue if you need help.
// -------------------
const supportsHydration = undefined;

function canHydrateInstance(instance, type, props) {}

function canHydrateTextInstance(instance, text) {}

function canHydrateSuspenseInstance(instance) {}

function isSuspenseInstancePending(instance) {}

function isSuspenseInstanceFallback(instance) {}

function registerSuspenseInstanceRetry(instance, callback) {}

function getNextHydratableSibling(instance) {}

function getFirstHydratableChild(parentInstance) {}

function hydrateInstance(
  instance,
  type,
  props,
  rootContainerInstance,
  hostContext,
  internalInstanceHandle
) {}

function hydrateTextInstance(textInstance, text, internalInstanceHandle) {}

function hydrateSuspenseInstance(suspenseInstance, internalInstanceHandle) {}

function getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance) {}

// Returns the SuspenseInstance if this node is a direct child of a
// SuspenseInstance. I.e. if its previous sibling is a Comment with
// SUSPENSE_x_START_DATA. Otherwise, null.
function getParentSuspenseInstance(targetInstance) {}

function commitHydratedContainer(container) {}

function commitHydratedSuspenseInstance(suspenseInstance) {}

function didNotMatchHydratedContainerTextInstance(
  parentContainer,
  textInstance,
  text
) {}

function didNotMatchHydratedTextInstance(
  parentType,
  parentProps,
  parentInstance,
  textInstance,
  text
) {}

function didNotHydrateContainerInstance(parentContainer, instance) {}

function didNotHydrateInstance(
  parentType,
  parentProps,
  parentInstance,
  instance
) {}

function didNotFindHydratableContainerInstance(parentContainer, type, props) {}

function didNotFindHydratableContainerTextInstance(parentContainer, text) {}

function didNotFindHydratableContainerSuspenseInstance(parentContainer) {}

function didNotFindHydratableInstance(
  parentType,
  parentProps,
  parentInstance,
  type,
  props
) {}

function didNotFindHydratableTextInstance(
  parentType,
  parentProps,
  parentInstance,
  text
) {}

function didNotFindHydratableSuspenseInstance(
  parentType,
  parentProps,
  parentInstance
) {}

function errorHydratingContainer(parentContainer) {}

/**
 * Reference: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-reconciler/index.d.ts
 *
 * @type {ReactReconciler.HostConfig}
 */
const hostConfig = {
  supportsMutation: true,
  createInstance: logFunctionCall(createInstance),
  createTextInstance: logFunctionCall(createTextInstance),
  appendInitialChild: logFunctionCall(appendInitialChild),
  finalizeInitialChildren: logFunctionCall(finalizeInitialChildren),
  prepareUpdate: logFunctionCall(prepareUpdate),
  shouldSetTextContent: logFunctionCall(shouldSetTextContent),
  getRootHostContext: logFunctionCall(getRootHostContext),
  getChildHostContext: logFunctionCall(getChildHostContext),
  getPublicInstance: logFunctionCall(getPublicInstance),
  prepareForCommit: logFunctionCall(prepareForCommit),
  resetAfterCommit: logFunctionCall(resetAfterCommit),
  preparePortalMount: logFunctionCall(preparePortalMount),
  scheduleTimeout: logFunctionCall(scheduleTimeout),
  cancelTimeout: logFunctionCall(cancelTimeout),
  noTimeout,
  supportsMicrotask,
  scheduleMicrotask: logFunctionCall(scheduleMicrotask),
  isPrimaryRenderer,
  warnsIfNotActing,
  getCurrentEventPriority: logFunctionCall(getCurrentEventPriority),
  getInstanceFromNode: logFunctionCall(getInstanceFromNode),
  beforeActiveInstanceBlur: logFunctionCall(beforeActiveInstanceBlur),
  afterActiveInstanceBlur: logFunctionCall(afterActiveInstanceBlur),
  prepareScopeUpdate: logFunctionCall(prepareScopeUpdate),
  getInstanceFromScope: logFunctionCall(getInstanceFromScope),
  detachDeletedInstance: logFunctionCall(detachDeletedInstance),
  appendChild: logFunctionCall(appendChild),
  appendChildToContainer: logFunctionCall(appendChildToContainer),
  insertBefore: logFunctionCall(insertBefore),
  insertInContainerBefore: logFunctionCall(insertInContainerBefore),
  removeChild: logFunctionCall(removeChild),
  removeChildFromContainer: logFunctionCall(removeChildFromContainer),
  resetTextContent: logFunctionCall(resetTextContent),
  commitTextUpdate: logFunctionCall(commitTextUpdate),
  commitMount: logFunctionCall(commitMount),
  commitUpdate: logFunctionCall(commitUpdate),
  hideInstance: logFunctionCall(hideInstance),
  hideTextInstance: logFunctionCall(hideTextInstance),
  unhideInstance: logFunctionCall(unhideInstance),
  unhideTextInstance: logFunctionCall(unhideTextInstance),
  clearContainer: logFunctionCall(clearContainer),
  cloneInstance: logFunctionCall(cloneInstance),
  createContainerChildSet: logFunctionCall(createContainerChildSet),
  appendChildToContainerChildSet: logFunctionCall(
    appendChildToContainerChildSet
  ),
  finalizeContainerChildren: logFunctionCall(finalizeContainerChildren),
  replaceContainerChildren: logFunctionCall(replaceContainerChildren),
  cloneHiddenInstance: logFunctionCall(cloneHiddenInstance),
  cloneHiddenTextInstance: logFunctionCall(cloneHiddenTextInstance),
  supportsHydration,
  canHydrateInstance: logFunctionCall(canHydrateInstance),
  canHydrateTextInstance: logFunctionCall(canHydrateTextInstance),
  canHydrateSuspenseInstance: logFunctionCall(canHydrateSuspenseInstance),
  isSuspenseInstancePending: logFunctionCall(isSuspenseInstancePending),
  isSuspenseInstanceFallback: logFunctionCall(isSuspenseInstanceFallback),
  registerSuspenseInstanceRetry: logFunctionCall(registerSuspenseInstanceRetry),
  getNextHydratableSibling: logFunctionCall(getNextHydratableSibling),
  getFirstHydratableChild: logFunctionCall(getFirstHydratableChild),
  hydrateInstance: logFunctionCall(hydrateInstance),
  hydrateTextInstance: logFunctionCall(hydrateTextInstance),
  hydrateSuspenseInstance: logFunctionCall(hydrateSuspenseInstance),
  getNextHydratableInstanceAfterSuspenseInstance: logFunctionCall(
    getNextHydratableInstanceAfterSuspenseInstance
  ),
  getParentSuspenseInstance: logFunctionCall(getParentSuspenseInstance),
  commitHydratedContainer: logFunctionCall(commitHydratedContainer),
  commitHydratedSuspenseInstance: logFunctionCall(
    commitHydratedSuspenseInstance
  ),
  didNotMatchHydratedContainerTextInstance: logFunctionCall(
    didNotMatchHydratedContainerTextInstance
  ),
  didNotMatchHydratedTextInstance: logFunctionCall(
    didNotMatchHydratedTextInstance
  ),
  didNotHydrateContainerInstance: logFunctionCall(
    didNotHydrateContainerInstance
  ),
  didNotHydrateInstance: logFunctionCall(didNotHydrateInstance),
  didNotFindHydratableContainerInstance: logFunctionCall(
    didNotFindHydratableContainerInstance
  ),
  didNotFindHydratableContainerTextInstance: logFunctionCall(
    didNotFindHydratableContainerTextInstance
  ),
  didNotFindHydratableContainerSuspenseInstance: logFunctionCall(
    didNotFindHydratableContainerSuspenseInstance
  ),
  didNotFindHydratableInstance: logFunctionCall(didNotFindHydratableInstance),
  didNotFindHydratableTextInstance: logFunctionCall(
    didNotFindHydratableTextInstance
  ),
  didNotFindHydratableSuspenseInstance: logFunctionCall(
    didNotFindHydratableSuspenseInstance
  ),
  errorHydratingContainer: logFunctionCall(errorHydratingContainer),
};
const reconciler = ReactReconciler(hostConfig);

export default reconciler;
