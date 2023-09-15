import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Layout as AntdLayout,
  Menu,
  theme as antdTheme,
  Drawer,
  Button,
  Dropdown,
  Row,
  Col,
} from "antd";
import cn from "classnames";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import GithubOutlined from "@ant-design/icons/GithubOutlined";
import { useDispatch, useSelector } from "react-redux";
import { openUrls, items } from "./items";
import { themeSelector } from "../../store";
import { setTheme } from "../../store/themeStore";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Moon } from "../../assets/moon.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import styles from "./layout.module.css";

const { Header, Content, Footer, Sider } = AntdLayout;

const getOpenedKeys = (pathname) => {
  return openUrls.includes(pathname) ? [pathname.replace("/", "")] : [];
};

const getSelectKeys = (pathname, hash) => {
  if (openUrls.includes(pathname)) {
    const parentItem = items.find(
      (item) => item.key === pathname.replace("/", "")
    );
    if (!parentItem) {
      return [];
    }

    const [key] = hash.replace("#", "").split("-");
    return [key || parentItem.defaultSelectedChildKey];
  }

  return [pathname.replace("/", "")];
};

const dark = {
  label: (
    <Row
      justify="space-between"
      align="middle"
      className={styles.menuThemeItem}
    >
      <Moon className={styles.themeItemIcon} />
      <Col>Dark</Col>
    </Row>
  ),
  key: "dark",
};
const light = {
  label: (
    <Row
      justify="space-between"
      align="middle"
      className={styles.menuThemeItem}
    >
      <Sun className={styles.themeItemIcon} />
      <Col>Light</Col>
    </Row>
  ),
  key: "light",
};

export const Layout = () => {
  const { theme } = useSelector(themeSelector);
  const {
    token: { colorBgContainer, colorBgElevated },
  } = antdTheme.useToken();
  const dispatch = useDispatch();
  const location = useLocation();
  const ref = useRef(null);
  const [openKeys, setOpenKeys] = useState(getOpenedKeys(location.pathname));
  const [selectedKeys, setSelectedKeys] = useState(
    getSelectKeys(location.pathname, location.hash)
  );

  useEffect(() => {
    setOpenKeys(getOpenedKeys(location.pathname));
    setSelectedKeys(getSelectKeys(location.pathname, location.hash));

    if (location.hash === "" || ref.current) {
      ref.current.scrollTo({ top: 0 });
    }
  }, [location]);

  const changeTheme = (theme) => {
    return () => {
      dispatch(setTheme(theme));
    };
  };

  return (
    <div className={styles.mainContainer} ref={ref}>
      <Header
        className={styles.header}
        style={{ background: colorBgContainer }}
      >
        <div className={styles.headerStartContent}>
          <MobileMenuDrawer openKeys={openKeys} selectedKeys={selectedKeys} />
          <Logo className={styles.logo} />
          <h3 className={styles.title}>React Dynamic Virtual Tree</h3>
          <Dropdown
            className={styles.themeDropdown}
            menu={{
              items: [
                {
                  ...dark,
                  label: <div onClick={changeTheme("dark")}>{dark.label}</div>,
                },
                {
                  ...light,
                  label: (
                    <div onClick={changeTheme("light")}>{light.label}</div>
                  ),
                },
              ],
            }}
            trigger={["click"]}
          >
            {theme === "dark" ? dark.label : light.label}
          </Dropdown>
        </div>
        <div className={styles.headerEndContent}>
          <a
            href="https://github.com/ytserilo/react-dynamic-virtual-tree"
            target="_blank"
            className={styles.headerLink}
          >
            <GithubOutlined className={styles.githubIcon} />
          </a>
        </div>
      </Header>
      <div className={styles.contentContainer}>
        <Sider
          theme={theme}
          className={styles.sider}
          style={{ background: colorBgElevated }}
        >
          <Menu
            className={cn(styles.desktopMenu, styles.menu)}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            mode="inline"
            items={items}
          />
        </Sider>

        <AntdLayout className={cn("site-layout", styles.content)}>
          <div className="markdown-body">
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <Outlet />
            </Content>
          </div>
          <Footer style={{ textAlign: "center" }}>
            <strong>react-dynamic-virtual-tree</strong> created by Yatsemirkyi.
          </Footer>
        </AntdLayout>
      </div>
    </div>
  );
};

const MobileMenuDrawer = ({ openKeys, selectedKeys }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname, location.hash]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.drawer}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className={styles.drawerButton}
        >
          <MenuUnfoldOutlined />
        </Button>
      </div>
      <Drawer
        title=""
        placement="left"
        width="100%"
        onClose={onClose}
        open={open}
      >
        <Menu
          className={styles.menu}
          mode="inline"
          items={items}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        />
      </Drawer>
    </>
  );
};
