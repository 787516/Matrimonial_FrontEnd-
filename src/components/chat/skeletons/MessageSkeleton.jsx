import React from "react";

const MessageSkeleton = () => {
  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <div
          className="rounded-circle bg-light me-2"
          style={{ width: 40, height: 40 }}
        />
        <div className="grow">
          <div
            className="bg-light mb-1"
            style={{ height: 10, width: "40%", borderRadius: 4 }}
          />
          <div
            className="bg-light"
            style={{ height: 10, width: "55%", borderRadius: 4 }}
          />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-end mb-3">
        <div className="grow-0 me-2">
          <div
            className="bg-light"
            style={{ height: 10, width: "80px", borderRadius: 4 }}
          />
        </div>
        <div
          className="rounded-circle bg-light"
          style={{ width: 40, height: 40 }}
        />
      </div>
    </>
  );
};

export default MessageSkeleton;
