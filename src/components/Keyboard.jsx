import React, { useEffect, useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "../keyboard.css";
import * as Tone from "tone";

const Keyboard = () => {
  const firstNote = MidiNumbers.fromNote("c0");
  const lastNote = MidiNumbers.fromNote("b7");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const [samples, setSamples] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSamples = async () => {
      const noteFilenames = {
        C0: "C0.wav",
        "C#0": "C0.wav",
        D0: "D0.wav",
        "D#0": "D#0",
        E0: "E0",
        F0: "F0.wav",
        "F#0": "F#0.wav",
        G0: "G0.wav",
        "G#0": "G#0.wav",
        A0: "A0.wav",
        "A#0": "A#0.wav",
        B0: "B0.wav",
        C1: "C1.wav",
        "C#1": "C#1.wav",
        D1: "D1.wav",
        "D#1": "D#1",
        E1: "E1",
        F1: "F1.wav",
        "F#1": "F#1.wav",
        G1: "G1.wav",
        "G#1": "G#1.wav",
        A1: "A1.wav",
        "A#1": "A#1.wav",
        B1: "B1.wav",
        C2: "C2.wav",
        "C#2": "C#2.wav",
        D2: "D2.wav",
        "D#2": "D#2",
        E2: "E2",
        F2: "F2.wav",
        "F#2": "F#2.wav",
        G2: "G2.wav",
        "G#2": "G#2.wav",
        A2: "A2.wav",
        "A#2": "A#2.wav",
        B2: "B2.wav",
        C3: "C3.wav",
        "C#3": "C#3.wav",
        D3: "D3.wav",
        "D#3": "D#3",
        E3: "E3",
        F3: "F3.wav",
        "F#3": "F#3.wav",
        G3: "G3.wav",
        "G#3": "G#3.wav",
        A3: "A3.wav",
        "A#3": "A#3.wav",
        B3: "B3.wav",
        C4: "C4.wav",
        "C#4": "C#4.wav",
        D4: "D4.wav",
        "D#4": "D#4",
        E4: "E4",
        F4: "F4.wav",
        "F#4": "F#4.wav",
        G4: "G4.wav",
        "G#4": "G#4.wav",
        A4: "A4.wav",
        "A#4": "A#4.wav",
        B4: "B4.wav",
        C5: "C5.wav",
        "C#5": "C#5.wav",
        D5: "D5.wav",
        "D#5": "D#5",
        E5: "E5",
        F5: "F5.wav",
        "F#5": "F#5.wav",
        G5: "G5.wav",
        "G#5": "G#5.wav",
        A5: "A5.wav",
        "A#5": "A#5.wav",
        B5: "B5.wav",
        C6: "C6.wav",
        "C#6": "C#6.wav",
        D6: "D6.wav",
        "D#6": "D#6",
        E6: "E6",
        F6: "F6.wav",
        "F#6": "F#6.wav",
        G6: "G6.wav",
        "G#6": "G#6.wav",
        A6: "A6.wav",
        "A#6": "A#6.wav",
        B6: "B6.wav",
        C7: "C7.wav",
        "C#7": "C#7.wav",
        D7: "D7.wav",
        "D#7": "D#7",
        E7: "E7",
        F7: "F7.wav",
        "F#7": "F#7.wav",
        G7: "G7.wav",
        "G#7": "G#7.wav",
        A7: "A7.wav",
        "A#7": "A#7.wav",
        B7: "B7.wav",
      };

      const loadedSamples = {};
      for (let note in noteFilenames) {
        const url = `/notes/${noteFilenames[note]}`;
        console.log("Chargement du fichier audio:", url);
        const player = new Tone.Player(url).toDestination();
        await player.load();
        loadedSamples[note] = player;
      }
      setSamples(loadedSamples);
      setLoading(false);
    };
    loadSamples();
  }, []);

  const playNote = (midiNumber) => {
    const noteName = MidiNumbers.getAttributes(midiNumber).note;
    if (!loading) {
      // Trouver le sample le plus proche disponible
      const closestNote = Object.keys(samples).reduce((prev, curr) => {
        return Math.abs(MidiNumbers.fromNote(curr) - midiNumber) <
          Math.abs(MidiNumbers.fromNote(prev) - midiNumber)
          ? curr
          : prev;
      });
      if (samples[closestNote]) {
        const transposition = midiNumber - MidiNumbers.fromNote(closestNote);
        samples[closestNote].playbackRate = Math.pow(2, transposition / 12);
        samples[closestNote].start();
      }
    }
  };

  const stopNote = (midiNumber) => {
    const noteName = MidiNumbers.getAttributes(midiNumber).note;
    if (samples[noteName]) {
      samples[noteName].stop();
    }
  };

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={playNote}
      stopNote={stopNote}
      width={"100%"}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default Keyboard;
