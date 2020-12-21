import MarkDownEditor from "@uiw/react-md-editor";
import { useState } from "react";

const Compose = () => {
    const [markdown, setMarkdown] = useState("");

    const handleUpdate = (editor, data, value) => {
        console.log(data);
        console.log(value);
        setMarkdown(value);
    };

    return (
        <div>
            <MarkDownEditor
                value={markdown}
                onChange={setMarkdown}
                height={500}
            ></MarkDownEditor>
        </div>
    );
};

export default Compose;
