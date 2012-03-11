
const St = imports.gi.St;
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

function init() {
    menu = Main.panel._statusArea.userMenu.menu;
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Blank Screen"));
    item.connect('activate', Lang.bind(item, _onBlankScreen));
    let nItems = menu.numMenuItems;
    menu.addMenuItem(item, nItems - 1);
}

function disable() {
    if (item) {
        item.destroy();
    }
}
