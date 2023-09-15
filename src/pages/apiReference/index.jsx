import React from "react";
import { Layer } from "./components/layer";
import { LayerComponent } from "./components/layerComponent";
import { ListItem } from "./components/listItem";
import { VirtualTreeProvider } from "./components/virtualTreeProvider";
import { Wrapper } from "./components/wrapper";
import { VirtualTree } from "./components/virtualTree";
import { VirtualTreeContext } from "./components/virtualTreeContext";

export const ApiReference = () => {
  return (
    <div>
      <ListItem />
      <Layer />
      <LayerComponent />
      <VirtualTree />
      <VirtualTreeProvider />
      <VirtualTreeContext />
      <Wrapper />
    </div>
  );
};
