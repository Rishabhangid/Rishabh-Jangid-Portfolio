export const PrimaryButton = ({ label, onClick, className }) => {
  return (
    // <button className="font-subheading bg-mainbutton rounded-lg p-2 md:p-3 text-charcoldark text-[12px] md:text-[16px] transition-all duration-300 hover:bg-[#B58E2F] hover:tracking-wider" onClick={onClick}   >
    <button className="font-subheading bg-[#9A0056] text-white rounded-lg p-2 md:p-3  text-[12px] md:text-[16px] transition-all duration-300 hover:bg-[#5f2445]" onClick={onClick}   >
      {label}
    </button>

  );
}

