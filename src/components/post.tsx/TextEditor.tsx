// import ReactDOM from "react-dom";
import { EditorState } from "draft-js";
import { useState } from "react";
import { HandlePost } from "src/components/post.tsx/HandlePost";
import { AiOutlinePlus } from "react-icons/ai";

// import { MegadraftEditor, editorStateFromRaw } from "megadraft";
// import "megadraft/dist/css/megadraft.css";
// import { useState } from "react";

export const TextEditor = () => {
  const [postText, setPostText] = useState<string>("");
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="bg-gray-100">
      {isShow ? (
        <div>
          <div className="flex flex-col">
            <textarea
              className="p-5 m-auto w-11/12 rounded-lg"
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            ></textarea>
            <HandlePost postText={postText} setIsShow={setIsShow} setPostText={setPostText} />
          </div>
        </div>
      ) : (
        <button
          className="bg-gray-600 rounded-full backdrop-opacity-30"
          onClick={() => {
            setIsShow((isShow) => {
              return !isShow;
            });
          }}
        >
          <AiOutlinePlus size={50} color={"#fff"} className="sticky bottom-0" />
        </button>
      )}
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
