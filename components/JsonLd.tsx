type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
  id?: string;
};

/**
 * Renders JSON-LD structured data. Serialised with a `<` escape so the
 * payload can never break out of the script tag.
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data.filter(Boolean) : [data];
  if (!payload.length) return null;

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={id ? `${id}-${index}` : index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
