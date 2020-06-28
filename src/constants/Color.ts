import { createVariablesInStyleSheets } from "utils/create-variables-in-style-sheets";
import { BaseColor } from "./BaseColor";

export const Color = createVariablesInStyleSheets({
  INPUT_BORDER_COLOR: "#d1d5da",
  MODAL_BORDER_COLOR: BaseColor.GRAY_4
});
