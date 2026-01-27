import React from "react";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";

import Root from "./page/root";

export function render(
  _url: string,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions,
) {
  return renderToPipeableStream(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    options,
  );
}
