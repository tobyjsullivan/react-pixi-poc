import reconciler from "./reconciler";
const ReactPixi = {
  render: (reactElement, pixiContainer, callback) => {
    if (!pixiContainer._rootContainer) {
      console.info(`[ReactPixi] creating container...`);
      pixiContainer._rootContainer = reconciler.createContainer(pixiContainer);
      console.info(
        `[ReactPixi] created container:`,
        pixiContainer._rootContainer
      );
    }

    console.info(`[ReactPixi] updating container...`);
    const result = reconciler.updateContainer(
      reactElement,
      pixiContainer._rootContainer,
      null,
      callback
    );
    console.info(`[ReactPixi] updated container.`);
    return result;
  },
};

export default ReactPixi;
