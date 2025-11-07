import { Link } from "react-router-dom";

export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="container mx-auto py-16">
      <div className="card">
        <h1 className="text-3xl">{title}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {description || "This section will be implemented next. If you want me to build this page now, please ask and specify details you want."}
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/" className="btn bg-primary text-primary-foreground">Go Home</Link>
          <a href="https://pminternship.mca.gov.in/login/" target="_blank" rel="noreferrer" className="btn btn-accent">Reference Site</a>
        </div>
      </div>
    </div>
  );
}
