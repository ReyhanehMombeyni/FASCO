import { Button } from "@/components/ui"
import Link from "next/link"

export const ButtonLink = ({href}: {href: string}) => {
  return (
   <Button className="text-sm font-light shadow-lg md:text-md md:px-8 md:py-4 xl:text-lg xl:py-5">
        <Link href={href}>Buy Now</Link>
    </Button>
  )
}
