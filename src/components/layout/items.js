import React from "react";
import { Link } from "react-router-dom";
import styles from "./layout.module.css";

export const items = [
  {
    key: "",
    icon: <span />,
    label: (
      <Link to="/" className={styles.link}>
        Introduce
      </Link>
    ),
  },
  {
    key: "tutorial",
    icon: <span />,
    defaultSelectedChildKey: "firstStep",
    label: (
      <Link to="/tutorial" className={styles.link}>
        Tutorial
      </Link>
    ),
  },
  {
    key: "api-reference",
    icon: <span />,
    defaultSelectedChildKey: "listItem",
    label: (
      <Link to="/api-reference" className={styles.link}>
        Api Reference
      </Link>
    ),
    children: [
      {
        key: "listItem",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#listItem"
            reloadDocument
          >
            List Item
          </Link>
        ),
      },
      {
        key: "layer",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#layer"
            reloadDocument
          >
            Layer
          </Link>
        ),
      },
      {
        key: "layerComponent",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#layerComponent"
            reloadDocument
          >
            LayerComponent
          </Link>
        ),
      },
      {
        key: "virtualTree",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#virtualTree"
            reloadDocument
          >
            VirtualTree
          </Link>
        ),
      },
      {
        key: "virtualTreeProvider",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#virtualTreeProvider"
            reloadDocument
          >
            VirtualTreeProvider
          </Link>
        ),
      },
      {
        key: "virtualTreeContext",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#virtualTreeContext"
            reloadDocument
          >
            VirtualTreeContext
          </Link>
        ),
      },
      {
        key: "wrapper",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/api-reference#wrapper"
            reloadDocument
          >
            Wrapper
          </Link>
        ),
      },
    ],
  },
  {
    key: "tools",
    icon: <span />,
    defaultSelectedChildKey: "mergeVirtualTree",
    label: (
      <Link className={styles.link} to="/tools">
        Tools
      </Link>
    ),
    children: [
      {
        key: "mergeVirtualTree",
        icon: <span />,
        label: (
          <Link
            className={styles.link}
            to="/tools#mergeVirtualTree"
            reloadDocument
          >
            mergeVirtualTree
          </Link>
        ),
      },
      {
        key: "queueObj",
        icon: <span />,
        label: (
          <Link className={styles.link} to="/tools#queueObj" reloadDocument>
            queueObj
          </Link>
        ),
      },
    ],
  },
];

export const openUrls = ["/api-reference", "/tools"];
