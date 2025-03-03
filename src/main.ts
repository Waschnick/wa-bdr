/// <reference types="@workadventure/iframe-api-typings" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's ASDF " + time, []);
    })

    WA.room.area.onEnter('entry_note').subscribe(() => {
        const message: Array<string> = [
            "Willkommen beim Townhall!",
            "Dies ist ein EXIT-Game.",
            "Euer Ziel ist es, mit eurem Team die Party im Obergeschoss zu erreichen. Dafür müsst ihr 7 Rätsel lösen - und damit 7 Kennwörter herausfinden.",
            "Achtung: Türen schließen nicht automatisch und alle Boards/Webseiten sind mit allen Teams geteilt. Ihr könnt dadurch (mit Absicht oder ausversehen) anderen Teams helfen.",
            "Viel Spaß!"
        ]; //\n\nDies ist ein EXIT-Game.\n\nEuer Ziel ist es, dass ihr";
        currentPopup = WA.ui.openPopup("entry_note_popup", message.join("\n\n"), []);
    })


    WA.room.area.onLeave('clock').subscribe(closePopup);
    WA.room.area.onLeave('entry_note').subscribe(closePopup);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
