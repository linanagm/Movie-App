/// <reference types="../@types/jquery" />
"use strict";

import { Form } from "./form.module.js";
import { Home } from "./home.module.js";
import {sideNavAnimation } from "./sidenav.module.js";

/* ***** App Classes ***** */
const home = new Home();
const form = new Form();
const sideNav = new sideNavAnimation();

/* ***** Run App ***** */
home.runHome();
form.runFormValidation();
sideNav.runSideNav();

