import React, {useEffect, useState} from 'react';
import "./navbar.css"

const Navbar = () => {

    const [show, SetShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", ()=>{
            if (window.scrollY > 100) {
                SetShow(true);
            }else{
                SetShow(false);
            }
        });

        return ()=>{
            window.removeEventListener("scroll")
        }

    }, [])
    return (
        <div className={`nav ${show && "navBlack"}`}>
            <img className="navLogo" src="https://farm6.staticflickr.com/5821/20639706793_8c038faa4a_o.png" alt="Netflix Logo" />
            <img className="navIcon" src="https://pbs.twimg.com/media/DpE-MRkU8AAP5BP.png" alt="Account Logo" />
        </div>
    )
}

export default Navbar
