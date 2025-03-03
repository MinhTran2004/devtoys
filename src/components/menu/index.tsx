"use client";
import React from "react";
import styles from "../menu/itemMemu.module.css";

interface ItemMenuProps {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: ItemMenuProps[];
}

export default function ItemMenu({
  label,
  iconLeft,
  iconRight,
  children,
}: ItemMenuProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.label}>
          {iconLeft}
          <p>{label}</p>
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
