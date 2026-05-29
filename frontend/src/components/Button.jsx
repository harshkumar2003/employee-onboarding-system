const Button = ({name , className ="",onClick})=>{
    return(
        <>
            <button onClick={onClick} className={`cursor-pointer mt-2 flex justify-center rounded-xl bg-slate-900 px-8 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}>
                {name}
            </button>
        </>
    );
};
export default Button;