import { useState } from "react";
import MenuItem from "./item-side-bar"
import styles from "./list-side-bar.module.css"

interface MenuProps {
  data: any[],
  statusSideBar?: boolean,
}

export default function Menu({ data, statusSideBar }: MenuProps) {
  const [nameSideBar, setNameSideBar] = useState<string | null>("");

  return (
    <div className={styles.ul}>
      {data.map((item: any, index: number) => (
        <MenuItem key={index}
          nameSideBar={nameSideBar || ""}
          setNameSideBar={setNameSideBar}
          label={item.label}
          iconLeft={item.iconLeft}
          iconRight={item.iconRight}
          children={item.children}
          link={item.link}
          statusSideBar={statusSideBar} />
      ))}

    </div>
  )
}