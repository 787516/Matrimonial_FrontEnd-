import React, { useState } from "react";
import "./GalleryUpload.css";
import { BsEye, BsTrash, BsArrowRepeat, BsUpload } from "react-icons/bs";
import Fancybox from "../../utils/Fancybox.jsx";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useGetGallery, useUploadPhotos, useDeletePhoto } from "../../hooks/GalleryHook/useGalleryHook";
import { useAuthContext } from "../../context/AuthContext";

function GalleryUpload() {
  const { authUser } = useAuthContext();
  const userProfileId = authUser?.user?._id;

  const { data: photos, isLoading } = useGetGallery(userProfileId);
  const uploadMutation = useUploadPhotos();
  const deleteMutation = useDeletePhoto();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUpload = () => {
    if (!selectedFiles.length) {
      alert("Please select images first");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append("images", file));
    formData.append("isProfilePhoto", "false");

    uploadMutation.mutate(formData);
  };

  const handleReplace = (photoId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("images", file);
      formData.append("isProfilePhoto", "false");

      uploadMutation.mutate(formData);
      deleteMutation.mutate(photoId);
    };

    input.click();
  };

  const handleDelete = (photoId) => {
    if (window.confirm("Delete this photo?")) {
      deleteMutation.mutate(photoId);
    }
  };

  if (isLoading) return <p>Loading gallery...</p>;

  return (
    <section className="gallery pt-5 pb-5">
      <div className="container-xl">

        <div className="upload-box classy-upload text-center mb-4 p-4">

          <div className="upload-inner">
            <div className="upload-icon">
              <BsUpload size={40} />
            </div>

            <h5 className="upload-title">Upload Your Photos</h5>
            <p className="upload-subtitle">JPG, PNG — You can upload multiple images at once</p>

            <label className="upload-btn">
              Choose Files
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles([...e.target.files])}
              />
            </label>

            {selectedFiles?.length > 0 && (
              <button className="btn btn-danger mt-3 px-4 py-2" onClick={handleUpload}>
                {uploadMutation.isPending ? "Uploading..." : "Upload Now"} <BsUpload />
              </button>
            )}
          </div>

        </div>


        <div className="row">
          {photos?.map((img) => (
            <div className="col-md-4 mb-3" key={img._id}>
              <div className="gallery-card">
                <Fancybox>
                  <a data-fancybox="gallery" href={img.imageUrl} className="image-wrapper" id={`open-${img._id}`}  >
                    <img src={img.imageUrl} className="img-fluid" />
                  </a>
                </Fancybox>

                <div className="gallery-overlay">
                  <button
                    className="gallery-btn"
                    onClick={() => document.getElementById(`open-${img._id}`).click()}
                  >
                    <BsEye /><span>View</span>
                  </button>


                  <button className="gallery-btn" onClick={() => handleReplace(img._id)}>
                    <BsArrowRepeat /><span>Replace</span>
                  </button>

                  <button className="gallery-btn delete" onClick={() => handleDelete(img._id)}>
                    <BsTrash /><span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {photos?.length === 0 && (
            <p className="text-center mt-4">No photos uploaded yet.</p>
          )}
        </div>

      </div>
    </section>
  );
}

export default GalleryUpload;
