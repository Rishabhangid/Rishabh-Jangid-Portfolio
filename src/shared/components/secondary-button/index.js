export const SecondaryButton = ({ label, onClick, disable }) => {

  return (
    <button 
    className="mt-6 bg-pinkmain text-white text-sm h-12 w-full rounded-md font-semibold shadow-md hover:bg-[#5f2445] transition duration-300 " onClick={onClick} disabled={disable}   >
      {label}
    </button>
  );
}
