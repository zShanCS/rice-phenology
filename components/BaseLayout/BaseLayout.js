import Head from "next/head";
import React, { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import LowerTopBar from "../lowerTopBar";

export default function BaseLayout({ children, title, footer, allowFullScreen = false, showTopBar = true }) {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className="flex flex-col h-full font-jost  overflow-hidden">
      <Head>
        <title>{title}</title>
        
        <meta name="viewport" content="width=800, initial-scale=0" />
        <link rel="shortcut icon" href="xndvi.png" />
        {/* google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="flex w-full bg-lightWhite dark:bg-fields">
        {/* <div className="w-full h-[60px] fixed top-0 z-50 ">
          <Header  />
        </div> */}
        {showTopBar && <div className="fixed z-50">
          <LowerTopBar
          />
        </div>}
        <div
          className={`w-full ${allowFullScreen ? "" : "m-10 mt-32 pr-2"} flex flex-col ${footer ? "justify-between" : ""
            }  ease-in-out bg-lightWhite dark:bg-fields relative duration-300 ${sideBar ? " md:translate-x-[200px] md:!w-[calc(100%-200px)] " : ""
            }`}
        >
          {children}
          {footer && <Footer />}
        </div>
      </div>
    </div>
  );
}
