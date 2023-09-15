import React from "react";
import { Link } from "react-router-dom";
import { FirstStep } from "./components/firstStep";
import { MakingLayers } from "./components/makingLayers";
import { UpdateTreeStructure } from "./components/updateTreeStructure";
import { ChangeItemSize } from "./components/changeItemSize";
import { ChangeChildrenSize } from "./components/changeChildrenSize";
import { MemorizeState } from "./components/memorizeState";
import styles from "./tutorial.module.css";

export const Tutorial = () => {
  return (
    <div className="content">
      <div className={styles.tutorialContent}>
        <FirstStep />
        <MakingLayers />
        <UpdateTreeStructure />
        <ChangeItemSize />
        <ChangeChildrenSize />
        <MemorizeState />
      </div>
      <div className="navigateStructure">
        <strong>On this page</strong>
        <Link className="navigateStructureLink" reloadDocument to="#firstStep">
          First Step
        </Link>
        <Link
          className="navigateStructureLink"
          reloadDocument
          to="#makingLayers"
        >
          Making Layers
        </Link>
        <Link
          className="navigateStructureLink"
          reloadDocument
          to="#updateTreeStructure"
        >
          Update Tree Structure
        </Link>
        <Link
          className="navigateStructureLink"
          reloadDocument
          to="#changeItemSize"
        >
          Change Item Size
        </Link>
        <Link
          className="navigateStructureLink"
          reloadDocument
          to="#changeChildrenSize"
        >
          Change Children Size
        </Link>
        <Link
          className="navigateStructureLink"
          reloadDocument
          to="#memorizeState"
        >
          Memorize State
        </Link>
      </div>
    </div>
  );
};
