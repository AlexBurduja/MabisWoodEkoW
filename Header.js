/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useContext } from 'react';
// import { CgProfile } from 'react-icons/cg'
import { NavLink } from 'react-router-dom';
// import logo from '../../publicResources/logoMabis.svg';
// import './CssHeader.css'
// import "../cartPage/ShoppingCart"
// import { ShoppingCart } from '../cartPage/ShoppingCart';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthProvider, FirebaseAuthContext } from './FirebaseAuthContext';
import { useRouter } from 'next/router';
// import { ShoppingCartMobile } from '../cartPage/ShoppingCartMobile';
// import ReactFlagsSelect from 'react-flags-select';

export const Header = () => {

  const [language, setLanguage] = useState('GB');

  const onSelect = (code) => { 
    setLanguage(code)
    window.location.reload();
  }

  const logOut = async () => {
    await signOut(auth)

    window.location.reload()
  }

  console.log(language)
 
  function LogInOrOut() {
    if (user?.uid){
      return (
        <div className='headerLogin'>
      <div className='headerLoginIcons'>
        <NavLink to="/profile"></NavLink>
        </div>

        <div className='headerLoginText'>
        <p>
         Salut, {conditional.firstName}</p> 
        <button className='logoutButtonHeader' onClick={logOut}>
          Delogheaza-te </button>
      </div>

        </div>
      )
    } else {
      return (
        <button className='loginButtonHeader'><NavLink to="/login">Conecteaza-te</NavLink></button>
      )
    }
  }

  function LogInOrOutMobile(){
    if(user?.uid){
      return(
        <button className='logoutButtonHamburger' onClick={logOut}>
        Delogheaza-te
      </button>
      ) 
    } else {
      return(
        <button className='logoutButtonHamburger'><NavLink to="/login"> Conectează-te
         </NavLink></button>
      )
      }
    }


  const activeClass = ({isActive}) => isActive ? "activeClassNav" : {};

  const activeClassHamburger = ({isActiveHamburger}) => isActiveHamburger ? "activeClassHamburger" : "link";

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const checkbox = document.querySelector('#navi-toggle');
  //     const body = document.querySelector('body');

  //     const handleCheckboxClick = () => {
  //       if (checkbox.checked) {
  //         body.classList.add('no-scroll');
  //       } else {
  //         body.classList.remove('no-scroll');
  //       }
  //     };

  //     const handleNavLinkClick = () => {
  //       body.classList.remove('no-scroll');
  //     };

  //     checkbox.addEventListener('click', handleCheckboxClick);
  //     document.querySelectorAll('.item a').forEach(link => {
  //       link.addEventListener('click', handleNavLinkClick);
  //     });

  //     return () => {
  //       checkbox.removeEventListener('click', handleCheckboxClick);
  //       document.querySelectorAll('.item a').forEach(link => {
  //         link.removeEventListener('click', handleNavLinkClick);
  //       });
  //     };
  //   }
  // }, []);
  

  return (
    <>
    <section id="home" className='flex'>
      <div className='logo'>
        {/* <img src={logo} alt="logo"/> */}
      </div>


    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <NavLink className={activeClass} to='/'>Acasa
        </NavLink>
        
        <NavLink className={activeClass} to='/about'>Despre
        </NavLink>

        <NavLink className={activeClass} to='/reviews'>
          Recenzii
        </NavLink>

        <NavLink className={activeClass} to='/contact'>
          Contact
        </NavLink>

        {conditional.admin === true && (
          <NavLink className={activeClass} to='/panel'>
            Panou
          </NavLink>
        )}        
        </div>
    </div>

    <div className='desktopCart'> 
      {/* <ShoppingCart/> */}
    </div>
      
      <LogInOrOut />

    <div className='mobileCart'>
        {/* <ShoppingCartMobile/>   */}
      </div>
{/* 
      <ReactFlagsSelect
                  selected={language}
                  onSelect={onSelect}
                  countries={["RO", "GB", "IT", "DE", "FR"]}
                  fullWidth={true}
                  showOptionLabel={false}
                  showSelectedLabel={false}
                  showSecondaryOptionLabel={false}
                  placeholder = "S"
                  className='custom-flags-select'
                  customLabels={{ RO: "Romanian", GB: 'English'}}
      />           */}

    <div className='hamburger'>
        <input type="checkbox" id="navi-toggle" className="checkbox" />
        <label htmlFor="navi-toggle" className="button">
          <span className="icon">&nbsp;</span>
        </label>
      <div className="background">&nbsp;</div>

      <nav className="nav">
        <ul className="list">

          <li className="item"> <NavLink className={activeClassHamburger} to='/'>
          Acasa</NavLink> </li>

          <li className="item"> <NavLink className={activeClassHamburger} to='/about'>Despre</NavLink> </li>

          <li className="item"> <NavLink className={activeClassHamburger} to='/reviews'>Recenzii</NavLink> </li>

          <li className="item"> <NavLink className={activeClassHamburger} to='/contact'>Contact</NavLink> </li>
          
          {conditional.admin === true && (
            <li className='item'><NavLink className={activeClassHamburger} to='/panel'>Panou</NavLink> </li>
            )}

          {user?.uid && (
            <li className='item'> <NavLink className={activeClassHamburger} to='/profile'>
              Profilul lui ${conditional.firstName}
              </NavLink> </li>
          )}
     
          <LogInOrOutMobile/>
        </ul>
      </nav>
</div>  
      
  </section>
  </>
  );
}
