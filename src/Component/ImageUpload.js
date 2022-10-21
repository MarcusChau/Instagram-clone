import React, { useState } from 'react';
import { storage, db } from '../firebase';
import firebase from "firebase/compat/app";

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        // logging the image name
        console.log(image.name);

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        // visual to have the progress bar
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // setting progress ...
                setProgress(progress);
            },
            (error) => {
                // Error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {

                        // console.log the values
                        console.log(caption);
                        console.log(url);
                        console.log(username);

                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setImage(null);
                        setProgress(0);
                        setCaption("");
                    });
            }
        );
    };

    return (
        <div>
            {/* I want to have... */}
            {/* Caption input */}
            {/* File picker */}
            {/* Post button */}
            <progress value={progress} max="100" />
            <input type="text" placeholder='Enter Caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}

export default ImageUpload