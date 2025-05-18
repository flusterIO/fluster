import { ShowCommandPaletteEventProps } from "./show_command_palette";

declare global {
  interface WindowEventMap {
    show_command_palette: CustomEvent<ShowCommandPaletteEventProps>;
  }
}
