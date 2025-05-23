
export function Input({ id, label, placeholder, icon, type = 'text', value, onChange, required = false, autoComplete }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="mb-1">{label}</label>
            <div className="flex items-center group bg-zinc-100 rounded-lg px-3 transition-all duration-300 hover:shadow-xl">
                <div className="text-black group-hover:text-blue-500 transition-all duration-300">
                    {icon}
                </div>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="bg-zinc-100 rounded-sm py-4 px-4 w-full outline-none"
                />
            </div>
        </div>
    );
}

export function InputProduto({ id, label, placeholder, type = 'text', value, onChange, required = false, autoComplete }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="mb-1">{label}</label>
            <div className="flex items-center group bg-zinc-100 rounded-lg px-3 transition-all duration-300 hover:shadow-xl">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="bg-zinc-100 rounded-sm py-4 w-full outline-none"
                />
            </div>
        </div>
    );
}

