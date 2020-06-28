import { createVariablesInStyleSheets } from "utils/create-variables-in-style-sheets";

export const pixelize = (size: number) => `${size}px`;

export const UNIT = 16;
export const UNIT_PX = pixelize(UNIT);

const BORDER_RADIUS = 4;
const HEADER_HEIGHT = 4 * UNIT;
const PADDING = UNIT;
const SIDEBAR_WIDTH = 4.5 * UNIT;

export const Size = createVariablesInStyleSheets({
  BORDER_RADIUS,
  BORDER_RADIUS_PX: pixelize(BORDER_RADIUS),

  HEADER_HEIGHT,
  HEADER_HEIGHT_PX: pixelize(HEADER_HEIGHT),

  PADDING,
  PADDING_PX: pixelize(PADDING),

  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_PX: pixelize(SIDEBAR_WIDTH)
});
