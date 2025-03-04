import ItemMenu from "./menu-item"
import styles from "./menu.module.css"

interface MenuProps {
  data: any[],
}

export default function Menu({ data }: MenuProps) {
  return (
    <div className={styles.ul}>
      {data.map((item: any) => (
        <ItemMenu key={item.key} {...item} />
      ))}
    </div>
  )
}