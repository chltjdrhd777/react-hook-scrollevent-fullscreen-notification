/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useConfirm } from "./factory/useConfirm";
import { preventEventer } from "./factory/usePreventLeave";
import { useBeforeLeave } from "./factory/useBeforeLeave";
import { useAnimation } from "./factory/useAnimation";
import { useScrollEvent } from "./factory/useScroll";
import { useFullScreen } from "./factory/fullScreen";

const notificationAPI = (title: any, options: any) => {
  //Checking whether or not there is a Notification in window(in other words, supporting)
  if (!("Notification" in window)) {
    return;
  }
  //Notification.permission has three options = 1. granted 2. denied 3. defualt
  //Notification(title, options) = title(the title of notificaiton), options(custom settings)
  const noteIf = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return noteIf;
};

const App = () => {
  ////////////confirm/////////////////////////
  const getRidOf = () => console.log("it is successfully removed");
  const remain = () => console.log("good idea");
  const deleteMessage = useConfirm("Are you sure?", getRidOf, remain);
  ////////////////////////////////////////////

  ///////////usePreventLeave//////////////////
  const { enablePrevent, disablePrevent } = preventEventer();
  ///////////////////////////////////////////

  ////////////mouseLeave////////////////////
  useBeforeLeave();
  //////////////////////////////////////////

  ///////////useAnimation//////////////////
  const el = useAnimation(1, 1);
  const el2 = useAnimation(2, 2);
  /////////////////////////////////////////

  ////////////scrollEvent/////////////////
  const { x, y } = useScrollEvent();
  //////////////////////////////////////

  /////////fullScreen///////////////////
  const { makeFull, triggerFull } = useFullScreen();
  //////////////////////////////////////

  /////////notification////////////////////
  const runNotification = notificationAPI("this is a title", {
    body: "the body option shows a content",
  });
  /////////////////////////////////////////
  return (
    <div style={{ height: "1000vh", width: "1000vh" }}>
      <h1 {...el}>Hello</h1>
      <h2 {...el2}>To make our world better...</h2>
      <h1
        style={{
          position: "fixed",
          right: 50,
          color: y > 100 ? "red" : "blue" && x > 100 ? "red" : "blue",
        }}
      >
        Scroll
      </h1>
      <button onClick={deleteMessage}>Delete the world</button>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
      <button onClick={runNotification}>Notification</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          ref={makeFull}
          src={"https://i.imgur.com/0s3gyND.jpg"}
          style={{ width: "3%", marginBottom: "10px" }}
          alt=""
        />
        <button
          onClick={triggerFull}
          style={{ width: "100px", marginLeft: "80px" }}
        >
          Full screen
        </button>
      </div>
    </div>
  );
};

export default App;
