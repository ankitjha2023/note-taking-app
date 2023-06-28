import "./App.css";
import { useEffect, useState } from "react";
export default function App() {
  const lsNotes = JSON.parse(localStorage.getItem("notes")) || [];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState(lsNotes);
  const [btnText, setBtnText] = useState("Add");
  const [index, setIndex] = useState(null);

  const addNote = () => {
    if (title === "") {
      alert("Title is empty");
    } else if (desc === "") {
      alert("Description is empty");
    } else if (btnText === "Add") {
      const note = {
        title: title,
        desc: desc
      };

      setNotes([...notes, note]);

      setTitle("");
      setDesc("");
    } else {
      // console.log(notes.length);
      if (notes.length === 0) {
        setIndex(0);
        const note = {
          title: title,
          desc: desc
        };

        setNotes([...notes, note]);
      } else {
        const updatedNotes = notes.filter((note, i) => {
          if (i === index) {
            note.title = title;
            note.desc = desc;
          }
          return note;
        });
        setNotes(updatedNotes);
      }

      setBtnText("Add");
      setTitle("");
      setDesc("");
      setIndex(null);
    }
  };
  const editNote = (idx) => {
    setIndex(idx);
    setTitle(notes[idx].title);
    setDesc(notes[idx].desc);
    setBtnText("Save");
  };
  const removeNote = (idx) => {
    const updatedNotes = notes.filter((note, i) => i !== idx);
    setNotes(updatedNotes);
  };

  const clearNote = () => {
    if (notes.length === 0) {
      alert("Already Cleared");
    } else {
      setNotes([]);
    }
  };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container my-5">
      <div className="mb-3">
        <h2>Add Note</h2>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-3"
        />
        <textarea
          rows={6}
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="form-control mb-3"
        ></textarea>
        <button onClick={addNote} className="btn btn-success">
          {btnText}
        </button>
        <button onClick={clearNote} className="btn btn-danger mx-2">
          Clear
        </button>
      </div>
      <h2>Your Notes</h2>
      <hr />
      <div className="my-3">
        {notes.length === 0 ? (
          <p>Nothing to display !!</p>
        ) : (
          notes.map((note, index) => {
            return (
              <div key={index} className="border p-3 my-2 rounded bg-light">
                <p className="fs-5 text-primary">{note.title}</p>
                <p>{note.desc}</p>
                <button
                  onClick={() => editNote(index)}
                  className="btn btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeNote(index)}
                  className="btn btn-danger mx-2"
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
