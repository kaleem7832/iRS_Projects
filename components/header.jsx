export default function Header(){
    return(
        <div className="bg-slate-800 p-3">
        <div className="container mx-auto  flex justify-between items-center content-center">
            <img src="https://www.iresearchservices.com/wp-content/themes/iResearch/img/iresearchLogoLight.svg" width='120px'/>
            <nav>
            <button className="text-white px-3 rounded mr-1">Create Project</button>
            <button className="text-white px-3 rounded mr-1" >Logout</button>
            </nav>
        </div>
        </div>
    )

}