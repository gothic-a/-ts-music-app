import { Routes } from "../components/AppLayout/routes"
import type { MenuProps } from "antd";

export interface MenuItemData {
    label: string,
    key: Routes,
    icon: React.ReactNode
}

export type MenuItem = Required<MenuProps>['items'][number] & MenuItemData; 