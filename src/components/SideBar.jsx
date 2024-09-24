import React, { useState } from "react";
import { navLinks } from "../constants";
import { sun } from "../assets";
import { IconHeartHandshake } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const Icon = ({ styles, name, imageUrl, isActive, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={`h-[48px] w-[48px] rounded-[10px] ${isActive && isActive === name && "bg-[#2c2f32]"} flex items-center justify-center ${styles}`}
    >
      <img
        src={imageUrl}
        alt="Icon"
        className={`h-6 w-6 ${isActive !== name && "grayscale"}`}
      />
    </div>
  );
};

const SideBar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Dashboard");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="sticky top-5 flex h-full flex-col items-center justify-between">
      <Link to="/">
        <div className="rounded-[10px] cursor-pointer bg-[#2c2f32] p-2">
          <IconHeartHandshake size={40} color="#1ec070" />
        </div>
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center cursor-pointer gap-3">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                setIsActive(link.name);
                navigate(link.link);
              }}
              styles="hover:bg-neutral-800"
            />
          ))}
        </div>

        {/* Sun icon for toggling theme */}
        <Icon
          styles="bg-[#1c1c24] cursor-pointer hover:bg-neutral-800 shadow-secondary"
          imageUrl={sun}
          handleClick={toggleTheme}
        />
      </div>
    </div>
  );
};

export default SideBar;
