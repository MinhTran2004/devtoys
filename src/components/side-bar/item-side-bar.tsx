"use client";
import styles from "../side-bar/item-side-bar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

interface MenuItemProps {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: any[];
  link?: string
  statusSideBar?: boolean,
  nameSideBar: string,
  setNameSideBar: (name: string) => void,
}

const ItemSideBar = ({
  label,
  iconLeft,
  iconRight,
  children,
  link,
  statusSideBar,
  nameSideBar,
  setNameSideBar,
}: MenuItemProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  return (
    <div>
      <div
        onClick={() => { setNameSideBar(label || "/") }}
        className={styles.main}
        style={{ backgroundColor: pathname === link ? "#323232" : "transparent" }}
      >
        {
          statusSideBar ? (
            <Link href={link || ""} className={styles.container}>
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
            </Link>
          )
            :
            (
              <div className={styles.container} style={{ padding: statusSideBar ? undefined : '8px 10px' }}>
                <Link href={link != undefined ? link : "/"}>{iconLeft}</Link>
              </div>
            )
        }
      </div>


      {children && statusSideBar && isVisible && (
        <div>
          {children.map((item, index: number) => (
            <div style={{ paddingLeft: 30 }} key={index}>
              <ItemSideBar key={index}
                nameSideBar={nameSideBar || ""}
                setNameSideBar={setNameSideBar}
                label={item.label}
                iconLeft={item.iconLeft}
                iconRight={item.iconRight}
                children={item.children}
                link={item.link}
                statusSideBar={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemSideBar;
