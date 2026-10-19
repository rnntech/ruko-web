/** Teal header band for text pages (keeps the site's big-field rhythm). */
export function PageHead({ title, lead, tag }: { title: string; lead?: string; tag?: string }) {
  return (
    <section className="field-teal page-head">
      <div className="container">
        {tag && <p className="tag">{tag}</p>}
        <h1 style={{ maxWidth: "20ch" }}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
