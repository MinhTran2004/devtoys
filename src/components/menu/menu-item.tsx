"use client";
import React from "react";
import styles from "../menu/menu-item.module.css";
import Link from "next/link";

interface MenuItemProps {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: MenuItemProps[];
  link: string
  statusSideBar: boolean,
}

export default function ItemMenu({
  label,
  iconLeft,
  iconRight,
  children,
  link,
  statusSideBar,
}: MenuItemProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {
          statusSideBar ? (
            <div className={styles.container}>
              <div className={styles.label}>
                {iconLeft}
                <Link href={link != undefined ? link : "/"}>{label}</Link>
              </div>
              <div
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                {iconRight}
              </div>
            </div>
          )
            :
            (
              <div className={styles.container} style={{padding: statusSideBar ? undefined : '5px 0'}}>
                  <Link href={link != undefined ? link : "/"}>{iconLeft}</Link>
              </div>
            )
        }
      </div>

      {children && statusSideBar && isVisible && (
        <ul className={styles.ul}>
          {children.map((item) => (
            <li key={item.label} className={styles.menu_item}>
              <div style={{ paddingLeft: 30 }}>
                <ItemMenu {...item} statusSideBar={true}/>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
