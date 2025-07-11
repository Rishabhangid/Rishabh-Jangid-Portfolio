export const InputFeilds = ({ label, placeholder, type, value, onChange }) => {
    return (
        // <div className="flex flex-col gap-2">
        //     <label className="font-medium">{label}</label>
        //     <input
        //         type={type}
        //         placeholder={placeholder}
        //         value={value}
        //         onChange={onChange}
        //         className="text-mainheading bg-white border-2 rounded-lg p-2 sm: md:w-[500px] lg:w-[700px] focus:outline-none focus:ring-2 focus:ring-primary"
        //     />
        // </div>
        <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>

    );
}

