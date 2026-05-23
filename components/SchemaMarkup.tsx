// components/SchemaMarkup.tsx
"use client"

export default function SchemaMarkup({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(schema) ? schema : [schema])
      }}
    />
  )
}