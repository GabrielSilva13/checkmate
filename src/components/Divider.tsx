type DividerProps = {
  width: number
}

export const Divider = ({ width }: DividerProps) => {
  return (
    <div
      className="mx-auto hidden h-[2px] bg-white lg:block"
      style={{
        width,
      }}
    />
  )
}
