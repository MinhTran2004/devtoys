"use client";
import styles from "../side-bar/item-side-bar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function ItemSideBar({
  label,
  iconLeft,
  iconRight,
  children,
  link,
  statusSideBar,
  nameSideBar,
  setNameSideBar,
}: MenuItemProps) {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const handlePath = (path: string) => {
    router.push(path);
  }

  return (
    <div>
      <div
        onClick={() => { setNameSideBar(label || "/") }}
        className={styles.main}
        style={{ backgroundColor: nameSideBar === label ? "#323232" : "transparent" }}
      >
        {
          statusSideBar ? (
            <div className={styles.container}>
              <div className={styles.label} onClick={() => handlePath(link || "")}>
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
          {children.map((item, index) => (
            <div style={{ paddingLeft: 30 }}>
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
