import { useState } from "react"
import logo from "../assets/logo.png"
import { NAVIGATION_LINKS } from "../constants";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
    const [isMobileMenuOpen , setIsMobileMenuOpen] =
    useState (false);

    
    const toggleMobileMenu = () =>{
        setIsMobileMenuOpen( !isMobileMenuOpen);
    }

    const handleLinkClick =( e, href) =>{
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if( targetElement){
            const offset = -85;
            const elementPosition =targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY +offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
        }
        setIsMobileMenuOpen(false);

    }

    const handleLogoClick = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  return (
    <div>
      <nav className="fixed left-0 right-0 top-4 z-50">
          {/* desktop menu*/}
          <div className="mx-auto hidden max-w-2xl items-center justify-center rounded-xl py-3 backdrop-blur-xl lg:flex"
style={{
  boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.15), inset -1px 0 0 rgba(255,255,255,0.08)",
  border: "1px solid transparent",
  backgroundClip: "padding-box",
}}>
              <div className="flex items-center justify-center gap-6">
                <div>
                <a href="#hero" onClick={handleLogoClick}>
                    <img src={logo} width={185}  alt="logo" />
                  </a>
                </div>
                <div>
                  <ul className="flex items-center gap-4">
                      {NAVIGATION_LINKS.map
                      ((item, index ) => (
                        <li key={index}>
                          <a className="text-sm hover:text-yellow-400" href={item.href} onClick={(e)=> handleLinkClick(e ,item.href)} >
                            {item.label}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
          </div>



          {/*mobile menu */}

          <div className="rounded-lg backdrop-blur-md lg:hidden">
                    <div className="flex items-center justify-between">
                          {/*image in mobile nav*/ }
                          <div>
                          <a href="#hero" onClick={handleLogoClick}>
                              <img src={logo} width={90} className="m-2" />
                            </a>
                          </div>

                          {/*links for moble div*/}
                          <div className="flex items-center">
                            <button className="focus:outline-none lg:hidden" onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? (
                                  <FaTimes className="m-2 h-6 w-5" />
                            ) : (
                                  <FaBars className="m-2 h-6 w-5" />
                            )}
                            </button>
                          </div>
                    </div>
                    {/*after menu open in moble view*/}
                    {isMobileMenuOpen && (
                      <ul className="ml-4 mt-4 flex flex-col gap-4 backdrop-blur-md">
                        {NAVIGATION_LINKS.map((item , index) => (
                          <li key={index}>
                            <a href={item.href} className="block w-full text-lg hover:text-yellow-400" onClick={(e)=> handleLinkClick(e, item.href)}>
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
          </div>      
      </nav>
    </div>
  )
}

export default Navbar