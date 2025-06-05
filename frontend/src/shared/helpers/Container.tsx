export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="w-[95%] max-w-[1240px] sm:w-[90%] md:w-[90%] lg:w-[99%] xl:w-[100%] mx-auto ">
        {children}
      </div>
    )
  }
  