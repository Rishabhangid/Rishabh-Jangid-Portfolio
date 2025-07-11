export const SubHeading = ({ name }) => {
    return (
        // <div className="text-primary font-medium text-[25px] md:text-[30px]">{name}</div>
        // <div className="text-primary font-medium text-[25px] md:text-[30px]">{name}</div>
        <div className="flex justify-center items-center gap-2 md:gap-5 text-center p-3 md:p-0 ">
            <div className="w-[60px] hidden md:block md:w-[200px] h-[2px] bg-[#9A0056]  "></div>
            {/* <p className="text-[#D4AF37] font-medium text-[16px] md:text-[30px] dark:text-[#D4AF37]">{name}</p> */}
            <p className="text-[#9A0056] font-['Mooli']  text-[14px] md:text-[20px] dark:text-[#9A0056]">{name}</p>
            <div className="w-[60px] hidden md:block md:w-[200px] h-[2px] bg-[#9A0056] "></div> 

        </div>
    )
}
