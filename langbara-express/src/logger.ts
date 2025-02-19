import express from "express";
import log4js, { PatternLayout } from "log4js";

log4js.configure({
  appenders: {
    stdout: { type: "stdout" },
    out: { type: "stdout", layout: {
      type: 'pattern',
      pattern: '%[[%r] [%p] %f{1} - %m %]'
    }},
    access: { type: "dateFile", filename: "logs/access.log" },
    app: { type: "dateFile", filename: "logs/app.log", layout: {
      type: 'pattern',
      pattern: '[%d] [%p] %f{1} - %m'
    } as PatternLayout},
  },
  categories: {
    default: {
      appenders: ["out", "app"],
      level: "all"
    },
    main: {
      appenders: ["out", "app"],
      level: "all",
      enableCallStack: true
    },
    access: {
      appenders: ["stdout", "access"],
      level: "all",
    },
  },
});

export const logger = log4js.getLogger("main");
export const accessLogger = log4js.getLogger("access");
