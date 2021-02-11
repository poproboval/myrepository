import React, { Component } from "react";
import { render } from "react-dom";
import "./App.sass";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
 

 
export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("run" | "stop" | "wait");
 
  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec(val => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);
 
  const start = React.useCallback(() => {
    setStatus("run");
  }, []);
 
  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);
 
  const reset = React.useCallback(() => {
    setSec(0);
  }, []);
 
  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);
 
  return (
    <div>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className={"btn"} onClick={start}>
        Start
      </button>
      <button className={"btn"} onClick={stop}>
        Stop
      </button>
      <button className={"btn"} onClick={reset}>Reset</button>
      <button className={"btn"} onClick={wait}>Wait</button>
    </div>
  );
}
