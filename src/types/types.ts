import React from "react"

export interface Card {
    key?: string,
    image?: React.ReactNode,
    title?: string,
    content?: string,
}

export interface SideBar {
    key?: string,
    label?: string,
    iconLeft?: React.ReactNode,
    link?: string,
    children?: [{
        key?: string,
        label?: string,
        iconLeft?: React.ReactNode,
        link?: string,
    }]
}