import { Separator } from "@/components/ui"

export const OrSeparator = () => {
  return (
    <div className="flex justify-center items-center gap-5 text-xl font-bold text-gray-500 py-2 w-10">
        <Separator />
        <span>OR</span>
        <Separator />
    </div>
  )
}
