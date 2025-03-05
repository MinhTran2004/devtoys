import ItemMenu from "./menu-item"
import styles from "./menu.module.css"

interface MenuProps {
  data: any[],
  statusSideBar?: boolean
}

export default function Menu({ data, statusSideBar }: MenuProps) {
  return (
    <div className={styles.ul}>
      {data.map((item: any, index: number) => (
        <ItemMenu key={index}
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