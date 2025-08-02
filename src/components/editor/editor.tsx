import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

interface Props {
    editorData: string;
    setEditorData: (string) => void;
    disabled?: boolean;
}

const Editor: React.FC<Props> = ({ editorData, setEditorData, disabled = false }) => {
    return (
        <CKEditor
            config={{
                licenseKey:
                    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTUzMDIzOTksImp0aSI6ImZmZDk0ZmQ1LTg3NTktNDA4OC04OTIyLTFlMTRhODNiYjg3NiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjYwNTRlNjNmIn0.V4XISxCgHS7wYH32jfb2DXymC02xCGwnSCyowZvo_C4zwbyOpL6SAISWDBSNgQC2dyH4C10aY47YsV_QFQMMWA', // Or 'GPL'.
                toolbar: disabled
                    ? []
                    : ['undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter'],
            }}
            data={editorData}
            onChange={(_, editor) => {
                if (!disabled) {
                    const data = editor.getData();
                    setEditorData(data);
                }
            }}
            editor={ClassicEditor}
        />
    );
};

export default Editor;
