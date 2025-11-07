import { useNavigate } from "react-router-dom";

export default function ResumeUploadButton({ asLink }: { asLink?: boolean }) {
  const navigate = useNavigate();

  return (
    <button
      className={`btn ${asLink ? "btn-accent" : "btn btn-accent"}`}
      onClick={(e) => {
        e.preventDefault();
        navigate("/streamlit"); // redirects straight to Streamlit
      }}
    >
      Upload CV/Resume
    </button>
  );
}
