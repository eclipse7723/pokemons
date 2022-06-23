import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="border" style={{ width: "100px", height: "100px" }} />
    </div>
  );
}