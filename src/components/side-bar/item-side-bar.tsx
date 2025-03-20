"use client";
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
}

const ItemSideBar = ({
  label,
  iconLeft,
  iconRight,
  children,
  link,
  statusSideBar,
}: MenuItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const arrPathName = pathname.split("/");
    setIsVisible(arrPathName.length > 2 && arrPathName[1] === label?.toLowerCase());
  }, [pathname]);

  return (
    <div>
      <div className={`cursor-pointer rounded-md ${pathname === link ? 'bg-[#323232]' : 'bg-transparent'}`}>
        {statusSideBar ?
          (<div className={`cursor-pointer w-full flex items-center justify-between pr-2 rounded-md hover:bg-[#323232] ${link ? 'text-white' : 'text-[#7f7f7f]'}`}>
            <Link href={link || ""} className="flex items-center text-sm gap-2 w-full p-2.5">
              {iconLeft}
              <p>{label}</p>
            </Link>
            <div onClick={() => setIsVisible(!isVisible)}>
              {iconRight}
            </div>
          </div>)
          :
          (<div className={`cursor-pointer w-full flex justify-between py-2.5 px-2.5 rounded-md hover:bg-[#323232] ${statusSideBar ? undefined : 'p-2'} ${link && 'text-[#7f7f7f]'}`}>
            <Link href={link != undefined ? link : ""}>{iconLeft}</Link>
          </div>)}
      </div>

      {children && statusSideBar && isVisible && (
        <div>
          {children.map((item, index: number) => (
            <div
              className="ml-7 mt-1"
              key={index}
            >
              <ItemSideBar
                key={index}
                label={item.label}
                iconLeft={item.iconLeft}
                iconRight={item.iconRight}
                children={item.children}
                link={item.link}
                statusSideBar={true}
              />
            </div>))}
        </div>)}
    </div>
  );
}

export default ItemSideBar;
