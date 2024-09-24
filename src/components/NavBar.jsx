import React, { useCallback, useState } from "react";
import CustomButton from "./CustomButton";
import { usePrivy } from "@privy-io/react-auth";
import { menu, search } from "../assets";
import { IconHeartHandshake } from "@tabler/icons-react";
import { navLinks } from "../constants";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { authenticated, login, user, logout } = usePrivy();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
    } else {
      login().then(() => {
        if (user) {
          console.log(user);
        }
      });
    }
  }, [authenticated, login, logout, user]);

  return (
    <div className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
      {/* Centered and Wider Search Bar */}
      <div className="flex justify-center flex-1">
        <div className="flex h-[52px] w-full max-w-[600px] flex-row rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2">
          <input
            type="text"
            placeholder="Search For Records"
            className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
          />
          <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d]">
            <img
              src={search}
              alt="search"
              className="h-[15px] w-[15px] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="hidden flex-row justify-end gap-2 sm:flex">
        <CustomButton
          btnType="button"
          title={authenticated ? "Log Out" : "Log In"}
          styles={authenticated ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={handleLoginLogout}
        />
      </div>

      <div className="relative flex items-center justify-between sm:hidden">
        <div className="flex h-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
          <IconHeartHandshake size={40} color="#1ec070" className="p-2" />
        </div>
        <img
          src={menu}
          alt="menu"
          className="h-[34px] w-[34px] cursor-pointer object-contain"
          onClick={() => {
            setToggleDrawer((prev) => !prev);
          }}
        />
        <div
          className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary ${!toggleDrawer ? "-translate-y-[100vh]" : "-translate-y-0"} transition-all duration-700`}
        >
          <ul className="mb-4">
            {authenticated && navLinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 hover:bg-neutral-800 cursor-pointer ${isActive === link.name && "bg-[#3a3a43]"}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imageUrl}
                  alt={link.name}
                  className={`h-[24px] w-[24px] object-contain ${isActive === link.name ? "grayscale-0" : "grayscale"}`}
                />
                <p className={`ml-[20px] font-epilogue text-[14px] font-semibold ${isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"}`}>
                  {link.name}
                </p>
              </li>
            ))}
            <li className="flex p-4 cursor-pointer" onClick={handleLoginLogout}>
              <CustomButton
                btnType="button"
                title={authenticated ? "Log Out" : "Log In"}
                styles={authenticated ? "bg-[#1dc071] w-full p-3" : "bg-[#8c6dfd] w-full p-3"}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
