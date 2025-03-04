"use client";
import React from "react";
import styles from "../menu/menu-item.module.css";
import Link from "next/link";

interface MenuItemProps {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: MenuItemProps[];
}

export default function ItemMenu({
  label,
  iconLeft,
  iconRight,
  children,
}: MenuItemProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.label}>
          {iconLeft}
          <Link href={'/encoders'}>{label}</Link>
        </div>
        <div
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {iconRight}
        </div>
      </div>

      {children && isVisible && (
        <ul className={styles.ul}>
          {children.map((item) => (
            <li key={item.label} className={styles.menu_item}>
              <div style={{ paddingLeft: 30 }}>
                <ItemMenu {...item} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
