import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "../keyboard.css";

const Keyboard = () => {
  const firstNote = MidiNumbers.fromNote("c1");
  const lastNote = MidiNumbers.fromNote("b8");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {
        // Play a given note - see notes below
      }}
      stopNote={(midiNumber) => {
        // Stop playing a given note - see notes below
      }}
      width={"100%"}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default Keyboard;
