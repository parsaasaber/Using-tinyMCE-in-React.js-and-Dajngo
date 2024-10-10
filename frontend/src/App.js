import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import "./App.css";

function App() {
  const editorRef = useRef(null);
  const txtName = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/app/view/")
      .then((res) => setData(res.data.data));
  }, 0);

  const log = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log("Editor content:", content);
    } else {
      console.error("Editor is not initialized");
    }
  };

  const [editing, setEditing] = useState(0);
  return (
    <>
      <div>
        <input type="text" ref={txtName} />
        <Editor
          apiKey="ifl7e58pg6c0h5jm74oeoqu1ntumrj6h26bszxhsa0vk2sbe"
          init={{
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
          }}
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue=""
        />

        <div className="buttons">
          <input
            value="save"
            type="submit"
            onClick={() => {
              log();
              if (editing == 0) {
                let output = {
                  name: txtName.current.value,
                  description: editorRef.current.getContent(),
                };

                axios.post("http://127.0.0.1:8000/app/create/", output);
              } else {
                let output = {
                  name: txtName.current.value,
                  description: editorRef.current.getContent(),
                };

                axios.post(
                  "http://127.0.0.1:8000/app/edit/" + editing + "/",
                  output
                );
                setEditing(0);
                txtName.current.value = "";
                editorRef.current.setContent("");
              }

              axios.get("http://127.0.0.1:8000/app/view/").then((res) => {
                alert(res.data.message);
                setData(res.data.data);
              });
            }}
          />
          <input
            type="button"
            value="cancel"
            style={{ display: editing != 0 ? "block" : "none" }}
            onClick={() => {
              setEditing(0);
              txtName.current.value = "";
              editorRef.current.setContent("");
            }}
          />
        </div>
      </div>

      <div>
        <table border={1} style={{ marginTop: 120 }}>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td dangerouslySetInnerHTML={{ __html: item.description }} />
                <td>
                  <a
                    href="#"
                    onClick={() => {
                      txtName.current.value = item.name;
                      editorRef.current.setContent(item.description);
                      setEditing(item.id);
                    }}
                  >
                    edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
