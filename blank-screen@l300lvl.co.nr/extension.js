
const St = imports.gi.St;
const Config = imports.misc.config;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;

let item, menu;

function _onBlankScreen() {
    let app = Util.spawn(['xset','dpms','force','off']);
    app.activate();
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Blank Screen"));
    item.connect('activate', Lang.bind(item, _onBlankScreen));
    let nItems = menu.numMenuItems;
    menu.addMenuItem(item, nItems - 2);
}

function disable() {
    if (item) {
        item.destroy();
    }
}

let age;

function init() {
    let current_version = Config.PACKAGE_VERSION.split('.')
    if (current_version.length != 3 || current_version[0] != 3) throw new Error("Strange version number (extension.js:35).")
    
    switch (current_version[1]) {
        case"2": global.log("Warning of extension [" + metadata.uuid + "]:\n              Old development release detected (" + Config.PACKAGE_VERSION + "). You should upgrade!\n")   //eak
        case"3":
        case"4": age = "old"
            break
        case"5": global.log("Warning of extension [" + metadata.uuid + "]:\n              Development release detected (" + Config.PACKAGE_VERSION + "). Loading as a 3.6 release.\n") //eak
        case"6": age = "new"
            break
        default: throw new Error("Strange version number (extension.js:45).")
    }

    if (age=="old") menu = Main.panel._statusArea.userMenu.menu
    else            menu = Main.panel.statusArea.userMenu.menu

}
