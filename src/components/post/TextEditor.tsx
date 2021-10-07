// import ReactDOM from "react-dom";
import { EditorState } from "draft-js";
import { useState } from "react";
import { HandlePost } from "src/components/post/HandlePost";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

// import { MegadraftEditor, editorStateFromRaw } from "megadraft";
// import "megadraft/dist/css/megadraft.css";
// import { useState } from "react";

export const TextEditor = () => {
  const [postText, setPostText] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" flex justify-between mx-4">
        <Link href="/">
          <a>
            <IoMdArrowBack size={35} color={"#5A5A5A"} className="mt-5" />
          </a>
        </Link>
        <HandlePost postText={postText} setPostText={setPostText} />
      </div>
      <textarea
        className="p-5 m-auto w-11/12 min-h-screen rounded-lg"
        value={postText}
        onChange={(e) => {
          setPostText(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

// editorStateFromRaw
// export const App = () => {
//   const [editorState, setEditorState] = useState(editorStateFromRaw(null));

//   const handlechange = (editorState: any) => {
//     setEditorState({ editorState });
//   };
//   return (
//     <div style={{ marginLeft: 80 }}>
//       <MegadraftEditor editorState={editorState} onChange={handlechange} placeholder="Add some text" />
//     </div>
//   );
// };
// render(<App />, document.getElementById("container"));

EditorState;
//クラスコンポーネント
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { editorState: editorStateFromRaw(null) };
//   }

//   onChange = (editorState) => {
//     this.setState({ editorState });
//   };

//   render() {
//     return (
//       //Add some margin left to show plugins sidebar
//       <div style={{ marginLeft: 80 }}>
//         <MegadraftEditor editorState={this.state.editorState} onChange={this.onChange} placeholder="Add some text" />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("container"));
