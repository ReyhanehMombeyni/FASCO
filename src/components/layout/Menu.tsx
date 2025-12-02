import Link from "next/link"

const menu = [{
  text: "Home",
  href:"/"
}, {
text: "Shop",
  href:"/shop"
}, {
text: "About Us",
  href:"/about-us"
}];
export const Menu = () => {
  return (
    <ul className="flex gap-5 items-center font-medium text-gray-600">
          {
            menu.map(({text, href}) => (<li key={text}>
                <Link href={href}>{text}</Link>
            </li>))
          }
        </ul>
  )
}
