import ItemMenu from "./menu-item"
import styles from "./menu.module.css"

interface MenuProps {
  data: any[],
  statusSideBar?: boolean
}

export default function Menu({ data, statusSideBar }: MenuProps) {
  return (
      <div className={styles.ul}>
        {data.map((item: any) => (
          <ItemMenu {...item} statusSideBar={statusSideBar} />
        ))}
      </div>
  )
}