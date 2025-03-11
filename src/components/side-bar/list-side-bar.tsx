import ItemSideBar from "./item-side-bar"
import styles from "./list-side-bar.module.css"

interface MenuProps {
  statusSideBar?: boolean,
  data: {
    key: string,
    label?: string,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    link?: string,
    children?: {
      key: string,
      label?: string,
      iconLeft?: React.ReactNode,
      iconRight?: React.ReactNode,
      link?: string,
    }[]
  }[],
}

export default function ListSideBar({ data, statusSideBar }: MenuProps) {

  return (
    <div className={styles.ul}>
      {data.map((item: any, index: number) => (
        <ItemSideBar key={index}
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