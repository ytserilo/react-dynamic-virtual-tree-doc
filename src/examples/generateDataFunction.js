import { Layer, ListItem, ROOT_ID } from "react-dynamic-virtual-tree";

export const genTreeData = (random = false) => {
  const root = {
    id: "root",
    children: [],
    data: { id: Math.random(), data: "root" },
  };

  const iMax = random ? Math.random() * 10 : 10;
  for (let i = 0; i < iMax; i++) {
    const item = {
      id: `${i}`,
      children: [],
      data: { id: Math.random(), data: `Item ${i}` },
    };

    const jMax = random ? Math.random() * 10 : 10;
    for (let j = 0; j < jMax; j++) {
      const itemChild = {
        id: `${i}-${j}`,
        children: [],
        data: { id: Math.random(), data: `Item ${i}.${j}` },
      };

      const kMax = random ? Math.random() * 10 : 10;
      for (let k = 0; k < kMax; k++) {
        const itemChildChild = {
          id: `${i}-${j}-${k}`,
          children: [],
          data: { id: Math.random(), data: `Item ${i}.${j}.${k}` },
        };
        itemChild.children.push(itemChildChild);
      }

      item.children.push(itemChild);
    }

    root.children.push(item);
  }

  return root;
};

const getFirstLayer = (items) => {
  return items.map((item) => {
    const listItem = new ListItem(item.id);
    const layer = new Layer(listItem);
    let clearFunctions = [];

    const secondLayer = getSecondLayer(item.children);
    clearFunctions.push(
      listItem.addChildren(secondLayer.map(({ listItem }) => listItem))
    );
    clearFunctions.push(
      layer.addChildren(secondLayer.map(({ layer }) => layer))
    );
    secondLayer.forEach(({ clearFunction }) => {
      clearFunctions.push(clearFunction);
    });

    return {
      listItem,
      layer,
      clearFunctions,
    };
  });
};

const getSecondLayer = (items) => {
  return items.map((item) => {
    const listItem = new ListItem(item.id);
    const layer = new Layer(listItem);
    let clearFunctions = [];

    const thirdLayer = getThirdLayer(item.children);

    clearFunctions.push(
      listItem.addChildren(thirdLayer.map(({ listItem }) => listItem))
    );
    clearFunctions.push(
      layer.addChildren(thirdLayer.map(({ layer }) => layer))
    );

    return {
      clearFunction: () => {
        clearFunctions.forEach((func) => func());
      },
      layer,
      listItem,
    };
  });
};

const getThirdLayer = (items) => {
  return items.map((item) => {
    const listItem = new ListItem(item.id);
    const layer = new Layer(listItem);

    return { layer, listItem };
  });
};

export const genVirtualTree = (listItem, layer, ready, data) => {
  const clearFunctions = [];

  const newListItem = ready ? new ListItem(ROOT_ID) : listItem;
  const newLayer = ready ? new Layer(newListItem) : layer;

  const firstLayer = getFirstLayer(data.children);
  clearFunctions.push(
    newListItem.addChildren(firstLayer.map(({ listItem }) => listItem))
  );
  clearFunctions.push(
    newLayer.addChildren(firstLayer.map(({ layer }) => layer))
  );

  return [
    {
      listItem: newListItem,
      layer: newLayer,
    },
    () => {
      clearFunctions.forEach((callback) => callback());
    },
  ];
};
