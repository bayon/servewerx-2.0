import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

export default function UploadCard() {
  //const [loading,setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [thumb, setThumb] = useState(undefined);
  const [fileName, setFileName] = useState("");

  return (
    <div className="container">
                  <p className="appDevNote" >UploadCard</p>

      <Formik
        initialValues={{ file: null }}
        onSubmit={(values) => {
          alert(
            JSON.stringify(
              {
                fileName: values.file.name,
                type: values.file.type,
                size: `${values.file.size} bytes`,
              },
              null,
              2
            )
          );
          setFileName(values.file.name)
          let reader = new FileReader();
          reader.onloadend = () => {
            setLoaded(true);
            setThumb(reader.result);
          };
          reader.readAsDataURL(values.file);

          setFileName(values.file.name);
          // setLoading(true);
        }}
        validationSchema={yup.object().shape({
          file: yup.mixed().required(),
        })}
        render={({ values, handleSubmit, setFieldValue }) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="file">File upload</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="form-control"
                  />
                 </div>
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </form>
              {loaded && <img src={thumb} alt={fileName} height={200} width={200} />}
            </>
          );
        }}
      />
    </div>
  );
}
